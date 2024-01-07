import { MenuList, Stack } from "@mui/material";
import FormLayout from "components/FormLayout";
import { DatePicker, Input, Select } from "components/shared";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import { NS_BUDGETING, NS_COMMON } from "constant/index";
import moment from "moment";
import { useTranslations } from "next-intl";
import { TBudgetTimeAdd, TBudgetTimeUpdate, useBudgetTimeAdd, useBudgetTimeUpdate } from "queries/budgeting/time-range";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "store/app/selectors";
import { useProjects } from "store/project/selectors";
import { getMessageErrorByAPI, uuid } from "utils/index";
import { TTimeRanges } from "./Time";
import { useParams } from "next/navigation";
import { TSection } from "../BudgetDetail";
import { ReactDatePickerProps } from "react-datepicker";
import { DateTimePicker } from "components/shared/DatePicker";

type Props = {
  sections: TSection[];
  open: boolean;
  onClose: () => void;
  projectId: string;
  data?: TTimeRanges | null;
  serviceId: string | null;
};

const defaultValues: TTimeRanges = {
  _id: uuid(),
  id: "",
  service: "",
  createdAt: "",
  name: "",
  person: {
    fullname: "",
    avatar: "",
  },
  note: "",
  timeRanges: 0,
  billableTime: 0,
  startTime: null,
  endTime: null,
};

export const ModalAddTime = ({
  open,
  onClose,
  projectId,
  data,
  sections = [],
  serviceId,
}: Props) => {
  const budgetT = useTranslations(NS_BUDGETING);
  const commonT = useTranslations(NS_COMMON);
  const { id } = useParams();

  const { items: projects, onGetProjects } = useProjects();
  const { projectOptions } = useGetOptions();
  const budgetTimeAdd = useBudgetTimeAdd();
  const budgetTimeUpdate = useBudgetTimeUpdate();
  const { onAddSnackbar } = useSnackbar();

  const sxInput = {
    height: 58,
    "& input": {
      color: ({ palette }) => `${palette.grey[900]}!important`,
    },
  };

  const { register, control, handleSubmit, setValue, getValues, reset, watch } =
    useForm<TTimeRanges>({
      defaultValues: data || defaultValues,
    });
  
  useEffect(() => {
    if (!open) {
      reset(defaultValues);
      return;
    };

    if (!projects || projects.length === 0) {
      onGetProjects({});
    }

    if (data) {
      reset(data);
    }
  }, [open, JSON.stringify(data)]);

  useEffect(() => {
    setValue("service", serviceId || "");
  }, [serviceId]);

  useEffect(() => {
    if (watch('startTime') && watch('endTime')) {
      const gap = moment(watch('endTime')).diff(moment(watch('startTime')), 'hours');
      if (gap > 0) {
        setValue('timeRanges', gap);
      }
    }
  }, [watch('startTime'), watch('endTime')]);

  const onSubmit = async (formValue: TTimeRanges) => {
    const data = {
      budget: id || "",
      services: formValue.service,
      note: formValue.note,
      timeRanges: formValue.timeRanges,
      billableTime: formValue.billableTime,
      startTime: formValue.startTime ? moment(formValue.startTime).format("HH:mm") : "",
      endTime: formValue.endTime ? moment(formValue.endTime).format("HH:mm") : "",
    };

    if (!!data) {
      data['id'] = formValue.id || "";
      budgetTimeUpdate.mutate(data as TBudgetTimeUpdate, {
        onSuccess() {
          onAddSnackbar("Success", "success");
          reset(defaultValues);
        },
        onError(error) {
          onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
        },
      });
    } else {
      budgetTimeAdd.mutate(data, {
        onSuccess() {
          onAddSnackbar("Success", "success");
          reset(defaultValues);
        },
        onError(error) {
          onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
        },
      });
    }
  };

  return (
    <FormLayout
      label={!!data ? budgetT("dialog.titleModalUpdate") : budgetT("dialog.titleModalAdd")}
      pending={false}
      submitWhenEnter={false}
      open={open}
      onClose={onClose}
      cancelText={budgetT("dialog.cancelBtnText")}
      submitText={!!data ? budgetT("dialog.updateBtnText") : budgetT("dialog.addBtnText")}
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

          <Select
            options={sections.map((section: TSection) => ({
              value: section.id,
              label: section.name,
            }))}
            title={budgetT("dialog.service")}
            name="section"
            rootSx={sxInput}
            fullWidth
            onChange={(e) => {
              setValue("service", e.target.value);
            }}
            disabled={!!serviceId}
            value={watch("service")}
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
                <DateTimePicker
                  title={budgetT("dialog.startTime")}
                  name="startTime"
                  value={value}
                  fullWidth
                  onChange={(_: string, newDate: Date | undefined) => {
                    onChange(newDate ? moment(newDate).format() : "");
                  }}
                  pickerProps={
                    {
                      dateFormat: "h:mm aa",
                      timeIntervals: 1,
                      showTimeSelect: true,
                      showTimeSelectOnly: true,
                    } as ReactDatePickerProps
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="endTime"
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  title={budgetT("dialog.endTime")}
                  name="endTime"
                  value={value}
                  fullWidth
                  onChange={(_: string, newDate: Date | undefined) => {
                    onChange(newDate ? moment(newDate).format() : "");
                  }}
                  pickerProps={
                    {
                      dateFormat: "h:mm aa",
                      timeIntervals: 1,
                      showTimeSelect: true,
                      showTimeSelectOnly: true,
                    } as ReactDatePickerProps
                  }
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
