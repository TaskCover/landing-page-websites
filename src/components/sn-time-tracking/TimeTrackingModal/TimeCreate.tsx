/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { DialogContent, Stack, Box, Button } from "@mui/material";
import DefaultPopupLayout from "./DefaultPopupLayout";
import dayjs from "dayjs";
import TimePicker from "../Component/TimePicker";
import Textarea from "../Component/Textarea";
import NumberInput from "../Component/NumberInput";
import MobileDatePickerComponent from "../Component/MobileDatePicker";
import { useGetMyTimeSheet } from "store/timeTracking/selectors";
import { useProjects } from "store/project/selectors";
import { usePositions } from "store/company/selectors";
import { DataStatus } from "constant/enums";
import { useAuth, useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import {
  AN_ERROR_TRY_AGAIN,
  NS_COMMON,
  NS_TIME_TRACKING,
} from "constant/index";
import { useTranslations } from "next-intl";
import { DEFAULT_RANGE_ACTIVITIES } from "store/timeTracking/reducer";
import useTheme from "hooks/useTheme";
import TextFieldSelect from "components/shared/TextFieldSelect";

interface IProps {
  type?: string;
  open: boolean;
  isEdit?: boolean;
  selectedEvent?: any;
  onClose(): void;
  filters?: any;
  currentScreen: "myTime" | "companyTime";
  dateClick?: string;
}

interface IOptionStructure {
  label: string;
  value: string;
}

const TimeCreate: React.FC<IProps> = ({
  open,
  onClose,
  filters,
  currentScreen,
  isEdit,
  selectedEvent,
  dateClick,
}) => {
  const { items: projects, onGetProjects } = useProjects();
  const { items: positions, onGetPositions } = usePositions();
  const {
    params,
    onCreateTimeSheet,
    onUpdateTimeSheet,
    onDeleteTimeSheet,
    onGetMyTimeSheet,
    onGetCompanyTimeSheet,
  } = useGetMyTimeSheet();
  const { onAddSnackbar } = useSnackbar();
  const { user: userData } = useAuth();

  const [projectOptions, setProjectOptions] = useState<IOptionStructure[]>([]);
  const [positionOptions, setPositionOptions] = useState<IOptionStructure[]>(
    [],
  );
  const { isDarkMode } = useTheme();

  const schema = yup
    .object({
      project_id: yup.string().trim().notRequired(),
      position: yup.string().trim().required("Position is a required field"),
      start_time: yup
        .string()
        .trim()
        .required("Start time is a required field"),
      type: yup.string().trim().required("Type code is a required field"),
      day: yup.string().trim().required("Date is a required field"),
      duration: yup
        .number()
        .required("Duration is a required field")
        .positive("Duration must be greater than zero")
        .integer("Duration must be an integer")
        .moreThan(0, "Duration must be greater than zero"),
      note: yup.string().trim().notRequired(),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      project_id: "",
      position: "",
      start_time: "",
      type: "",
      day: "",
      duration: undefined,
      note: "",
    },
  });

  useEffect(() => {
    onGetProjects({ pageSize: -1, pageIndex: 0 });
    onGetPositions({ pageSize: -1, pageIndex: 0 });
  }, []);

  // useEffect(() => {
  //   if (dateClick) {

  //     console.log(date, time)
  //    setValue('day', date);
  //    setValue('start_time', time);
  //   }
  // }, [dateClick]);

  useEffect(() => {
    if (isEdit) {
      const validResetData = {
        project_id: selectedEvent?.extendedProps?.project?.id,
        type: selectedEvent?.extendedProps?.typeDefault,
        position: selectedEvent?.extendedProps?.position?.id,
        day: dayjs(selectedEvent?.start).format("YYYY-MM-DD"),
        start_time: selectedEvent?.start,
        duration: selectedEvent?.extendedProps?.hour,
        note: selectedEvent?.extendedProps?.note,
      };
      reset(validResetData);
    } else {
      if (dateClick) {
        const date = dayjs(dateClick).format("YYYY/MM/DD") || "";
        const time = dateClick;

        reset({
          day: date,
          start_time: time,
          position: userData?.position?.id,
        });
      } else {
        reset({
          position: userData?.position?.id,
        });
      }
    }
  }, [isEdit, open, dateClick]);

  useEffect(() => {
    if (!_.isEmpty(projects)) {
      const resolveProjects = _.map(projects, (project) => {
        return {
          label: project?.name,
          value: project?.id,
        };
      });
      setProjectOptions(resolveProjects);
    }
  }, [projects]);

  useEffect(() => {
    if (!_.isEmpty(positions)) {
      const resolvePositions = _.map(positions, (position) => {
        return {
          label: position?.name,
          value: position?.id,
        };
      });
      setPositionOptions(resolvePositions);
    }
  }, [positions]);

  const commonT = useTranslations(NS_COMMON);
  const timeT = useTranslations(NS_TIME_TRACKING);

  const onSubmit = (data: FormData) => {
    const resolveData = {
      ...data,
      day: dayjs(data?.day).format("YYYY-MM-DD"),
      start_time: dayjs(data?.start_time)
        .set("date", dayjs(data?.day).date())
        .format("YYYY-MM-DD HH:mm"),
    };
    if (isEdit) {
      onUpdateTimeSheet({
        ...resolveData,
        id: selectedEvent?.extendedProps?.id,
        project_id: resolveData.project_id as string,
      })
        .then((res) => {
          if (currentScreen === "myTime") {
            onGetMyTimeSheet({ ...params });
          } else {
            onGetCompanyTimeSheet({ ...params });
          }
          onAddSnackbar("Update timesheet success", "success");
          onClose();
        })
        .catch((err) => {
          onAddSnackbar("Update timesheet failure", "error");
          onClose();
        });
    } else {
      onCreateTimeSheet({
        ...resolveData,
        project_id: resolveData.project_id || "",
      })
        .then(() => {
          onAddSnackbar("Create timesheet success", "success");
          onClose();

          if (currentScreen === "myTime") {
            onGetMyTimeSheet({ ...params });
          } else {
            onGetCompanyTimeSheet({ ...params });
          }
        })
        .catch((err) => {
          onAddSnackbar(getMessageErrorByAPI(err, commonT), "error");
        });
    }
  };

  const _renderMain = () => {
    return (
      <DialogContent sx={{ padding: "17px 24px" }}>
        <Stack
          direction="column"
          component="form"
          sx={{
            marginBottom: "24px",
            backgroundColor: isDarkMode ? "inherit" : "common.white",
          }}
          spacing="20px"
        >
          
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextFieldSelect
                options={[
                  { label: timeT("header.tab.workTime"), value: "Work time" },
                  { label: timeT("header.tab.breakTime"), value: "Break time" },
                ]}
                label={timeT("modal.Type")}
                sx={{ flex: 1 }}
                required
                error={Boolean(errors?.type?.message)}
                helperText={errors?.type?.message}
                renderValue={(selected) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          background:
                            selected === "Work time" ? "#3699FF" : "#F64E60",
                        }}
                      />
                      {selected as string}
                    </Box>
                  );
                }}
                {...(field as any)}
              />
            )}
          />
          {watch("type") === "Work time" && (
            <Controller
              name="project_id"
              control={control}
              render={({ field }) => (
              <TextFieldSelect
                options={projectOptions}
                label={timeT("modal.Project")}
                sx={{ flex: 1 }}
                // required
                error={Boolean(errors?.project_id?.message)}
                helperText={errors?.project_id?.message}
                {...(field as any)}
              />
            )}
          />
          )}
          {/* <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextFieldSelect
                disabled
                options={positionOptions}
                label={timeT("modal.Position")}
                sx={{ flex: 1 }}
                required
                error={Boolean(errors?.position?.message)}
                helperText={errors?.position?.message}
                {...(field as any)}
              />
            )}
          /> */}

          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <MobileDatePickerComponent
                label={timeT("modal.Date")}
                sx={{ flex: 1 }}
                required
                error={Boolean(errors?.day?.message)}
                helperText={errors?.day?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <TimePicker
                label={timeT("modal.start_time")}
                sx={{ flex: 1 }}
                required
                error={Boolean(errors?.start_time?.message)}
                helperText={errors?.start_time?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field: { onChange, value } }) => (
              <NumberInput
                label={timeT("modal.timeDuration")}
                required
                sx={{ flex: 1 }}
                error={Boolean(errors?.duration?.message)}
                helperText={errors?.duration?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <Textarea
                label={timeT("modal.Note")}
                sx={{ flex: 1 }}
                {...field}
              />
            )}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="outlined"
            sx={{ width: "150px", marginRight: "24px" }}
            onClick={onClose}
          >
            {timeT("modal.Cancel")}
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "36px",
              width: "150px",
              padding: 0,
              backgroundColor: "primary.main",
              color: "common.white",
              textTransform: "none",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            {timeT("modal.Confirm")}
          </Button>
        </Stack>
        {isEdit && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              sx={{
                width: "150px",
                marginRight: "24px",
                borderColor: "error.light",
                color: "error.main",
                "&:hover": {
                  borderColor: "error.main",
                  color: "error.main",
                },
              }}
              onClick={() => {
                onDeleteTimeSheet({ id: selectedEvent?.extendedProps?.id })
                  .then(() => {
                    onAddSnackbar("Delete timesheet success", "success");
                    onClose();
                    onGetMyTimeSheet({ ...params });
                  })
                  .catch((err) => {
                    onAddSnackbar("Delete timesheet failed", "error");
                    onClose();
                  });
              }}
            >
              {timeT("modal.Delete")}
            </Button>
          </Stack>
        )}
      </DialogContent>
    );
  };
  return (
    <DefaultPopupLayout
      title={isEdit ? timeT("modal.edit_time") : timeT("modal.add_time")}
      content={_renderMain()}
      open={open}
      onClose={onClose}
      sx={{
        width: "500px",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    />
  );
};

export default TimeCreate;
