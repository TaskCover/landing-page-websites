/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { DialogContent, Stack, Box, Button } from "@mui/material";
import DefaultPopupLayout from "./DefaultPopupLayout";
import dayjs from "dayjs";
import TextFieldSelect from "../Component/Select";
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
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { DEFAULT_RANGE_ACTIVITIES } from "store/timeTracking/reducer";

interface IProps {
  type?: string;
  open: boolean;
  isEdit?: boolean;
  selectedEvent?: any;
  onClose(): void;
  filters?: any;
  currentScreen: "myTime" | "companyTime";
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
}) => {
  const { items: projects, onGetProjects } = useProjects();
  const { items: positions, onGetPositions } = usePositions();
  const {
    itemStatus,
    statusUpdate,
    statusDelete,
    onCreateTimeSheet,
    onUpdateTimeSheet,
    onDeleteTimeSheet,
    onGetMyTimeSheet,
  } = useGetMyTimeSheet();
  const { onAddSnackbar } = useSnackbar();
  const { user: userData } = useAuth();

  const [projectOptions, setProjectOptions] = useState<IOptionStructure[]>([]);
  const [positionOptions, setPositionOptions] = useState<IOptionStructure[]>(
    [],
  );

  const schema = yup
    .object({
      project_id: yup.string().trim().required("Project is a required field"),
      position: yup.string().trim().required("Position is a required field"),
      start_time: yup
        .string()
        .trim()
        .required("Start time is a required field"),
      type: yup.string().trim().required("Type code is a required field"),
      day: yup.string().trim().required("Date is a required field"),
      duration: yup.number().required("Duration is a required field"),
      note: yup.string().trim().notRequired(),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      project_id: "",
      position: "",
      start_time: "",
      type: "",
      day: "",
      duration: 0,
      note: "",
    },
  });

  useEffect(() => {
    onGetProjects({ pageSize: -1, pageIndex: 0 });
    onGetPositions({ pageSize: -1, pageIndex: 0 });
  }, []);

  useEffect(() => {
    if (userData) {
      userData.position?.id && setValue("position", userData.position?.id);
    }
  }, [userData]);

  useEffect(() => {
    if (isEdit) {
      const validResetData = {
        project_id: selectedEvent?.extendedProps?.project?.id,
        type: selectedEvent?.extendedProps?.typeDefault,
        position: selectedEvent?.extendedProps?.position?.id,
        day: dayjs(selectedEvent?.extendedProps?.day).format("YYYY-MM-DD"),
        start_time: selectedEvent?.start,
        duration: selectedEvent?.extendedProps?.hour || 0,
        note: selectedEvent?.extendedProps?.note,
      };
      reset(validResetData);
    } else {
      reset();
    }
  }, [isEdit, open]);

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

  // useEffect(() => {
  //   if (
  //     itemStatus === DataStatus.SUCCEEDED ||
  //     statusUpdate === DataStatus.SUCCEEDED ||
  //     statusDelete === DataStatus.SUCCEEDED
  //   ) {
  //     reset();
  //     onClose();
  //   }
  // }, [itemStatus, statusUpdate, statusDelete]);
  const commonT = useTranslations(NS_COMMON);

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
      })
        .then((res) => {
          onAddSnackbar("Update timesheet success", "success");
          onClose();
          onGetMyTimeSheet(DEFAULT_RANGE_ACTIVITIES);
        })
        .catch((err) => {
          onAddSnackbar("Update timesheet success", "success");
          onClose();
          onGetMyTimeSheet(DEFAULT_RANGE_ACTIVITIES);
        });
    } else {
      onCreateTimeSheet(resolveData)
        .then(() => {
          onAddSnackbar("Create timesheet success", "success");
          onClose();
          onGetMyTimeSheet(DEFAULT_RANGE_ACTIVITIES);
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
          sx={{ marginBottom: "24px", backgroundColor: "common.white" }}
          spacing="20px"
        >
          <Controller
            name="project_id"
            control={control}
            render={({ field }) => (
              <TextFieldSelect
                options={projectOptions}
                label="Project"
                sx={{ flex: 1 }}
                required
                error={Boolean(errors?.project_id?.message)}
                helperText={errors?.project_id?.message}
                {...(field as any)}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextFieldSelect
                options={[
                  { label: "Work time", value: "Work time" },
                  { label: "Break time", value: "Break time" },
                ]}
                label="Type"
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
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextFieldSelect
                //disabled
                options={positionOptions}
                label="Position"
                sx={{ flex: 1 }}
                required
                error={Boolean(errors?.position?.message)}
                helperText={errors?.position?.message}
                {...(field as any)}
              />
            )}
          />

          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <MobileDatePickerComponent
                label="Date"
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
                label="Start time"
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
            render={({ field }) => (
              <NumberInput
                label="Time Duration (hour)"
                sx={{ flex: 1 }}
                error={Boolean(errors?.duration?.message)}
                {...field}
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <Textarea label="Note" sx={{ flex: 1 }} {...field} />
            )}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            variant="outlined"
            sx={{ width: "150px", marginRight: "24px" }}
            onClick={onClose}
          >
            Cancel
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
            Confirm
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
                    onGetMyTimeSheet(DEFAULT_RANGE_ACTIVITIES);
                  })
                  .catch((err) => {
                    onAddSnackbar("Delete timesheet success", "success");
                    onClose();
                    onGetMyTimeSheet(DEFAULT_RANGE_ACTIVITIES);
                  });
              }}
            >
              Delete
            </Button>
          </Stack>
        )}
      </DialogContent>
    );
  };
  return (
    <DefaultPopupLayout
      title={isEdit ? "Edit time" : "Add time"}
      content={_renderMain()}
      open={open}
      onClose={onClose}
      sx={{ width: "500px" }}
    />
  );
};

export default TimeCreate;
