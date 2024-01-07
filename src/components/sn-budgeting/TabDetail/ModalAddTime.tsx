import { MenuList, Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { DatePicker, Input, Select } from "components/shared";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import { NS_BUDGETING, NS_COMMON } from "constant/index";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useBudgetTimeAdd } from "queries/budgeting/time-range";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { useProjects } from "store/project/selectors";
import { getMessageErrorByAPI, uuid } from "utils/index";
import { TTimeRanges } from "./Time";
import { useParams } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  data?: TTimeRanges;
};

const defaultValues: TTimeRanges = {
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
  startTime: "",
  endTime: ""
};

export const ModalAddTime = ({ open, onClose, projectId, data }: Props) => {
  const budgetT = useTranslations(NS_BUDGETING);
  const commonT = useTranslations(NS_COMMON);
  const { id } = useParams();

  const { items: projects, onGetProjects } = useProjects();
  const { projectOptions } = useGetOptions();
  const budgetTimeAdd = useBudgetTimeAdd();
  const { onAddSnackbar } = useSnackbar();

  const { register, control, handleSubmit, setValue, getValues, reset } =
    useForm<TTimeRanges>({
      defaultValues: data || defaultValues,
    });

  const onSubmit = async (formValue: TTimeRanges) => {
    const data = {
      budget: id,
      services: "",
      note: formValue.note,
      timeRanges: formValue.timeRanges,
      billableTime: formValue.billableTime,
      startTime: formValue.startTime,
      endTime: formValue.endTime
    };
    budgetTimeAdd.mutate(data, {
      onSuccess() {
        onAddSnackbar("Success", "success");
        reset(defaultValues);
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
    height: 58,
    "& input": {
      color: ({ palette }) => `${palette.grey[900]}!important`,
    },
  };

  return (
    <FormLayout
      label={budgetT("dialog.titleModalAdd")}
      pending={false}
      submitWhenEnter={false}
      open={open}
      onClose={onClose}
      cancelText={budgetT("dialog.cancelBtnText")}
      submitText={budgetT("dialog.addBtnText")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack overflow="auto">
        <MenuList component={Stack} spacing={2}>
          <Controller
            control={control}
            name="createdAt"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                title={budgetT("dialog.date")}
                rootSx={sxInput}
                fullWidth
                name="createdAt"
                value={value}
                onChange={(_: string, newDate: Date | undefined) => {
                  onChange(newDate ? moment(newDate).format() : "");
                }}
              />
            )}
          />

          <Select
            options={projectOptions}
            title={budgetT("dialog.project")}
            name="project_id"
            rootSx={sxInput}
            fullWidth
            value={projectId}
          />
          <Controller
            control={control}
            name="timeRanges"
            render={({ field: { onChange, value } }) => (
              <Input
                rootSx={sxInput}
                title={budgetT("dialog.timeRanger")}
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Stack gap={2} direction="row">
            <Controller
              control={control}
              name="startTime"
              render={({ field: { onChange, value } }) => (
                <Input
                  rootSx={sxInput}
                  title={budgetT("dialog.startTime")}
                  sx={{ width: "50%" }}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="endTime"
              render={({ field: { onChange, value } }) => (
                <Input
                  rootSx={sxInput}
                  title={budgetT("dialog.endTime")}
                  sx={{ width: "50%" }}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Stack>
          <Textarea label={budgetT("dialog.note")} {...register("note")} />
        </MenuList>
      </Stack>
    </FormLayout>
  );
};
