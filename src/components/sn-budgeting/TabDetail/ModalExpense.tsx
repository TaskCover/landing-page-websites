import { Add } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MenuList, Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { Input, Select } from "components/shared";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import { NS_BUDGETING, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { useBudgetTimeAdd } from "queries/budgeting/time-range";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { useProjects } from "store/project/selectors";
import { getMessageErrorByAPI, uuid } from "utils/index";
import InputLabelWrapper from "./InputLabelWrapper";
import { TTimeRanges } from "./Time";

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  data?: TTimeRanges;
};

export const ModalExpense = ({ open, onClose, projectId, data }: Props) => {
  const budgetT = useTranslations(NS_BUDGETING);
  const commonT = useTranslations(NS_COMMON);

  const { items: projects, onGetProjects } = useProjects();
  const { projectOptions } = useGetOptions();
  const budgetTimeAdd = useBudgetTimeAdd();
  const { onAddSnackbar } = useSnackbar();

  const { register, control, handleSubmit, setValue, getValues } =
    useForm<TTimeRanges>({
      defaultValues: data || {
        _id: uuid(),
        createdAt: "",
        name: "",
        person: {
          fullname: "",
          avatar: "",
        },
        note: "",
        timeRanges: 0,
        billableTime: 0,
      },
    });

  const onSubmit = async (formValue: TTimeRanges) => {
    const data = {
      budget: "",
      services: "",
      note: formValue.note,
      timeRanges: formValue.timeRanges,
      billableTime: formValue.billableTime,
    };
    budgetTimeAdd.mutate(data, {
      onSuccess() {
        onAddSnackbar("Success", "success");
      },
      onError(error) {
        onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      },
    });
  };
  useEffect(() => {
    if (!open) return;
    if (!projects || projects.length === 0) {
      onGetProjects({});
    }
  }, [open]);

  const sxInput = {
    height: 45,
    "& input": {
      color: ({ palette }) => `${palette.grey[900]}!important`,
    },
    border: "1px solid",
    borderColor: "grey.200",
  };

  return (
    <FormLayout
      label={budgetT("dialogExpense.titleModalAdd")}
      pending={false}
      submitWhenEnter={false}
      bottomProps={{
        sx: {
          justifyContent: "flex-end",
        },
      }}
      open={open}
      onClose={onClose}
      cancelText={budgetT("dialogExpense.cancelBtnText")}
      submitText={budgetT("dialogExpense.createBtnText")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack overflow="auto">
        <MenuList component={Stack} spacing={2}>
          <Stack gap={2} direction="row">
            <InputLabelWrapper
              label={budgetT("dialogExpense.date")}
              sx={{ width: "50%" }}
            >
              <Input rootSx={sxInput} onlyContent name="name" />
            </InputLabelWrapper>
            <InputLabelWrapper
              label={budgetT("dialogExpense.person")}
              sx={{ width: "50%" }}
            >
              <Input rootSx={sxInput} onlyContent name="name" />
            </InputLabelWrapper>
          </Stack>
          <InputLabelWrapper label={budgetT("dialogExpense.service")}>
            <Select
              options={projectOptions}
              name="project_id"
              rootSx={sxInput}
              fullWidth
              value={projectId}
            />
          </InputLabelWrapper>

          <Stack gap={2} direction="row">
            <Stack gap={2} direction="row" width={"50%"}>
              <InputLabelWrapper
                label={budgetT("dialogExpense.qty")}
                sx={{ width: "40%" }}
              >
                <Input rootSx={sxInput} onlyContent name="name" />
              </InputLabelWrapper>
              <InputLabelWrapper
                label={budgetT("dialogExpense.cost")}
                sx={{ width: "60%" }}
              >
                <Input rootSx={sxInput} onlyContent name="name" />
              </InputLabelWrapper>
            </Stack>
            <Stack direction="row" width={"50%"}>
              <InputLabelWrapper
                label={budgetT("dialogExpense.currency")}
                sx={{ width: "60%" }}
              >
                <Input rootSx={sxInput} onlyContent name="name" />
              </InputLabelWrapper>
            </Stack>
          </Stack>
          <Stack gap={2} direction="row">
            <Stack gap={2} direction="row" width={"50%"} alignItems="center">
              <InputLabelWrapper
                label={budgetT("dialogExpense.totalCost")}
                sx={{ width: "50%" }}
              >
                <Input rootSx={sxInput} onlyContent name="name" />
              </InputLabelWrapper>

              <Add sx={{ width: "10%" }} color="disabled" />
              <InputLabelWrapper
                label={budgetT("dialogExpense.markup")}
                sx={{ width: "40%" }}
              >
                <Input rootSx={sxInput} onlyContent name="name" />
              </InputLabelWrapper>
            </Stack>
            <Stack direction="row" width={"50%"} alignItems="center">
              <ArrowForwardIcon sx={{ width: "10%" }} color="disabled" />
              <InputLabelWrapper
                label={budgetT("dialogExpense.totalBillable")}
                sx={{ width: "90%" }}
              >
                <Input rootSx={sxInput} onlyContent name="name" />
              </InputLabelWrapper>
            </Stack>
          </Stack>
          {/* <InputLabelWrapper label={budgetT("dialogExpense.description")}>
            <Textarea {...register("note")} minRows={4} size={false} />
          </InputLabelWrapper> */}
        </MenuList>
      </Stack>
    </FormLayout>
  );
};
