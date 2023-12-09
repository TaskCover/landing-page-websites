import { Box, Stack, Typography } from "@mui/material";
import { Button } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { getMessageErrorByAPI, uuid } from "utils/index";
import { ServiceSectionRow } from "./ServiceSectionRow";
import { TErrors, TSection, TSectionData } from "./ServiceUtil";
import { useState } from "react";
import {
  TBudgetServiceForm,
  useBudgetServiceAdd,
} from "queries/budgeting/service-add";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { DATE_FORMAT_FORM, NS_COMMON } from "constant/index";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";

type Props = {
  onCloseEdit?: () => void;
};

type TForm = {
  sections: (TSection & { data: TSectionData[] })[];
};

export const ServiceSection = ({ onCloseEdit }: Props) => {
  const { control, setValue, handleSubmit, getValues } = useForm<TForm>();
  const [errors, setErrors] = useState<TErrors>({});
  const { id: budgetId } = useParams();
  const budgetServiceAdd = useBudgetServiceAdd();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);

  const { fields, append } = useFieldArray({
    name: "sections",
    control,
  });

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
    if (!handleValidateServices()) return;

    const form: TBudgetServiceForm = {
      budget_id: String(budgetId),
      start_date: dayjs().format(DATE_FORMAT_FORM),
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
            <ServiceSectionRow
              fieldIndex={index}
              updateValue={handleChangeValue}
              errors={errors}
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
    </Box>
  );
};
