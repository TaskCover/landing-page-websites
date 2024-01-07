import { Add } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid, InputLabel, MenuList, Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { DatePicker, Input, Select } from "components/shared";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import { NS_BUDGETING, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { useProjects } from "store/project/selectors";
import { uuid } from "utils/index";
import InputLabelWrapper from "./InputLabelWrapper";
import { TBudgetExpense, useBudgetExpenseAdd } from "queries/budgeting/expense";
import { TExpense } from "./Expenses";
import moment from "moment";

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  data?: TBudgetExpense;
};

const defaultValues: TExpense = {
  id: "",
  owner: "",
  service: "",
  description: "",
  date: "",
  att: "",
  paymentStatus: "",
  totalCost: "",
  billable: "",
};

export const ModalExpense = ({ open, onClose, projectId, data }: Props) => {
  const budgetT = useTranslations(NS_BUDGETING);
  const commonT = useTranslations(NS_COMMON);

  const { items: projects, onGetProjects } = useProjects();
  const { projectOptions } = useGetOptions();
  const budgetExpenseAdd = useBudgetExpenseAdd();
  const { onAddSnackbar } = useSnackbar();

  const { register, control, handleSubmit, setValue, getValues, watch } =
    useForm<TExpense>({
      defaultValues: data || defaultValues,
    });

  const onSubmit = async (formValue: TExpense) => {
    // const data = {
    //   budget: "",
    //   services: "",
    //   note: formValue.note,
    //   timeRanges: formValue.timeRanges,
    //   billableTime: formValue.billableTime,
    // };
    // budgetTimeAdd.mutate(data, {
    //   onSuccess() {
    //     onAddSnackbar("Success", "success");
    //   },
    //   onError(error) {
    //     onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    //   },
    // });
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
          <Grid container spacing={0}>
            <Grid item xs={12} md={6} sx={{ p: "0px !important" }}>
              <InputLabel htmlFor="date" sx={{ color: '#999999', fontSize: '12px', fontWeight: 700 }}>
                {budgetT("dialogExpense.date")}
              </InputLabel>

              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    rootSx={sxInput}
                    name="date"
                    value={value}
                    fullWidth
                    onChange={(_: string, newDate: Date | undefined) => {
                      onChange(newDate ? moment(newDate).format() : "");
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: "0px !important" }}>
              <Select
                options={[]}
                title={budgetT("dialogExpense.person")}
                name="owner"
                rootSx={sxInput}
                fullWidth
                value={watch("owner")}
              />
            </Grid>

            {/* <InputLabelWrapper
              label={budgetT("dialogExpense.date")}
              sx={{ width: "50%" }}
            >
              <Input rootSx={sxInput} onlyContent name="date" />
            </InputLabelWrapper> */}
            {/* <InputLabelWrapper
              label={budgetT("dialogExpense.person")}
              sx={{ width: "50%" }}
            >
              <Input rootSx={sxInput} onlyContent name="name" />
            </InputLabelWrapper> */}
          </Grid>
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
          <InputLabelWrapper label={budgetT("dialogExpense.description")}>
            <Textarea {...register("description")} minRows={6} />
          </InputLabelWrapper>
        </MenuList>
      </Stack>
    </FormLayout>
  );
};
