import { Box, Stack, Typography } from "@mui/material";
import { Button, IconButton } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { getMessageErrorByAPI, uuid } from "utils/index";
import { ServiceSectionRow } from "./ServiceSectionRow";
import { TErrors, TSection, TSectionData } from "./ServiceUtil";
import { useEffect, useState } from "react";
import {
  TBudgetServiceForm,
  useBudgetServiceAdd,
} from "queries/budgeting/service-add";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { NS_BUDGETING, NS_COMMON } from "constant/index";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { useBudgetGetServiceQuery } from "queries/budgeting/service-list";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";
import TrashIcon from "icons/TrashIcon";

type Props = {
  onCloseEdit?: () => void;
};

type TForm = {
  sections: (TSection & { data: TSectionData[] })[];
};

export const ServiceSection = ({ onCloseEdit }: Props) => {
  const { control, setValue, handleSubmit, getValues } = useForm<TForm>();
  const [errors, setErrors] = useState<TErrors>({});
  const [isOpenConfirm, openConfirm, closeConfirm] = useToggle();
  const [indexWaitDelete, setIndexWaitDelete] = useState<number | null>(null);
  const [sections, setSections] = useState<any>(null);
  const { id: budgetId } = useParams();
  const budgetServiceAdd = useBudgetServiceAdd();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const budgetT = useTranslations(NS_BUDGETING);
  const serviceQuery = useBudgetGetServiceQuery(String(budgetId));

  const { fields, append, remove } = useFieldArray({
    name: "sections",
    control,
  });

  useEffect(() => {
    if (!serviceQuery || !serviceQuery.data?.sections) return;
    const serviceData: any[] = [];
    const sectionData = serviceQuery.data.sections;
    sectionData.map((section, index: number) => {
      append({
        id: uuid(),
        title: section.name,
        data: [],
      });
      serviceData[index] = section.services;
    });
    setSections(serviceData);
  }, [serviceQuery]);

  const handleChangeValue = (index: number, data: TSectionData[]) => {
    setValue(`sections.${index}.data`, data);
    clearTimeout(window["timeoutSubmitService"]);
    window["timeoutSubmitService"] = setTimeout(handleValidateServices, 500);
  };

  const handleSaveAllService = () => {
    handleSubmit(onSubmit)();
  };

  const handleValidateServices = () => {
    const sections = getValues("sections");

    const errValidate: TErrors = {};
    let hasError = false;

    sections.map((section, sectionIndex) => {
      if (!errValidate[sectionIndex]) {
        errValidate[sectionIndex] = [];
      }

      section.data.map((item, itemIndex) => {
        // validate item name
        const nameTrimed = item.name.trim();
        if (nameTrimed === "") {
          errValidate[sectionIndex].push({
            errorMgs: "Service name is required!",
            fieldName: "name",
            itemIndex,
          });
          hasError = true;
        }

        // validate item type
        if (item.type === "") {
          errValidate[sectionIndex].push({
            errorMgs: "Service type is required!",
            fieldName: "type",
            itemIndex,
          });
          hasError = true;
        }

        //validate item estimate
        if (item.estimate === "") {
          errValidate[sectionIndex].push({
            errorMgs: "Estimate is required!",
            fieldName: "estimate",
            itemIndex,
          });
          hasError = true;
        }
      });
    });
    setErrors(errValidate);

    return !hasError;
  };

  const onSubmit: SubmitHandler<TForm> = ({ sections }) => {
    if (!handleValidateServices()) {
      onAddSnackbar("Please insert required field", "error");
      return;
    }

    const form: TBudgetServiceForm = {
      budget_id: String(budgetId),
      start_date: dayjs().format("YYYY-MM-DD"),
      sections: [],
    };

    sections.map(({ title, data }) => {
      const service: any = [];

      data.map((item) => {
        let estimate: string[] | number = item.estimate.split(":");
        estimate = parseInt(estimate[0]) * 60 + parseInt(estimate[1]);

        service.push({
          name: item.name,
          desc: "",
          serviceType: item.type,
          billType: item.billingType,
          unit: item.unit,
          estimate: estimate,
          qty: 0,
          price: 0,
          discount: 0,
          markUp: 0,
          tolBudget: 0,
        });
      });

      form.sections.push({ name: title, services: service });
    });

    budgetServiceAdd.mutate(form, {
      onSuccess() {
        onAddSnackbar("Success", "success");
      },
      onError(error) {
        onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      },
    });
  };

  const openConfirmDelete = (index: number) => {
    setIndexWaitDelete(index);
    openConfirm();
  };

  const cancelConfirmDelete = () => {
    setIndexWaitDelete(null);
    closeConfirm();
  };

  const acceptDelete = () => {
    if (indexWaitDelete) remove(indexWaitDelete);
    cancelConfirmDelete();
  };

  return (
    <Box>
      <Stack direction="row" gap={2} justifyContent="end" p="15px">
        <Button
          sx={{ bgcolor: "primary.light", color: "grey.400" }}
          onClick={onCloseEdit}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveAllService}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.light", color: "primary.main" },
          }}
        >
          Save changes
        </Button>
      </Stack>
      <Box>
        {fields.map((field, index) => (
          <Box key={field.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                component="h3"
                fontSize={24}
                fontWeight="bold"
                px={2}
                py={1}
                sx={{ color: "grey.300" }}
              >
                {field.title}
              </Typography>
              <IconButton onClick={() => openConfirmDelete(index)}>
                <TrashIcon
                  fontSize="medium"
                  sx={{ color: "error.main", cursor: "pointer" }}
                />
              </IconButton>
            </Stack>
            <ServiceSectionRow
              fieldIndex={index}
              updateValue={handleChangeValue}
              errors={errors}
              serviceData={sections[index]}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <Button
          startIcon={<PlusIcon />}
          size="small"
          sx={{ color: "secondary.main" }}
          onClick={() =>
            append({
              id: uuid(),
              title: "Section " + (fields.length + 1),
              data: [],
            })
          }
        >
          Add section
        </Button>
      </Box>
      <ConfirmDialog
        open={isOpenConfirm}
        onClose={cancelConfirmDelete}
        onSubmit={acceptDelete}
        title={budgetT("delete.titleConfirmDelete")}
        content={budgetT("delete.contentConfirmDelete")}
      />
    </Box>
  );
};
