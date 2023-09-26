import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { DialogContent, Grid, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TextFieldInput from "components/shared/TextFieldInput";
import TextFieldSelect from "components/sn-time-tracking/Component/Select";
import { Button, DatePicker } from "components/shared";
import { MobileDatePicker } from "@mui/x-date-pickers";
import CustomDateRangePicker from "components/sn-resource-planing/components/CustomDateRangePicker";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import DefaultPopupLayout from "components/sn-time-tracking/TimeTrackingModal/DefaultPopupLayout";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import useTheme from "hooks/useTheme";

interface IProps {
  open: boolean;
  onClose(): void;
}

const EditBooking: React.FC<IProps> = ({ open, onClose }) => {
  const [activeTabs, setActiveTabs] = useState("1");
  const [isFocusAllocation, setIsFocusAllocation] = useState(false);
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const commonT = useTranslations(NS_COMMON);
  const { palette } = useTheme();

  const schemaProject = yup
    .object({
      projectName: yup
        .string()
        .trim()
        .required("Tên dự án không được bỏ trống"),
      role: yup.string().trim().required("Vị trí không được bỏ trống"),
      date: yup
        .date()
        .nullable()
        .required("Ngày bắt đầu không được bỏ trống")
        .typeError("Ngày không đúng định dạng"),
      dateRange: yup.object().shape({
        startDate: yup.date(),
        endDate: yup.date(),
      }),
      allocation: yup.number(),
      allocation_type: yup.string(),
      workingTime: yup
        .string()
        .required("Thời gian làm việc không được bỏ trống"),
      note: yup.string().trim().notRequired(),
    })
    .required();

  const schemaTimeOff = yup
    .object({
      categoryTimeOff: yup
        .string()
        .trim()
        .required("Lý do nghỉ không được bỏ trống"),
      date: yup
        .date()
        .nullable()
        .required("Ngày không được bỏ trống")
        .typeError("Ngày không đúng định dạng"),
      dateRange: yup.object().shape({
        startDate: yup.date(),
        endDate: yup.date(),
      }),
      workingTime: yup
        .string()
        .required("Thời gian làm việc không được bỏ trống"),
      note: yup.string().trim().notRequired(),
    })
    .required();

  const {
    control: controlProject,
    handleSubmit: handleSubmitProject,
    setValue: setValueProject,
    clearErrors: clearErrorsProject,
    watch: watchProject,
    reset: resetProject,
    formState: { errors: errorsProject },
  } = useForm({
    resolver: yupResolver(schemaProject),
    defaultValues: {
      projectName: "",
      role: "",
      date: undefined,
      dateRange: {},
      workingTime: undefined,
      note: "",
    },
  });

  const {
    control: controlTimeOff,
    handleSubmit: handleSubmitTimeOff,
    setValue: setValueTimeOff,
    clearErrors: clearErrorsTimeOff,
    watch: watchTimeOff,
    reset: resetTimeOff,
    formState: { errors: errorsTimeOff },
  } = useForm({
    resolver: yupResolver(schemaTimeOff),
    defaultValues: {
      categoryTimeOff: "",
      date: undefined,
      workingTime: undefined,
      note: "",
    },
  });

  useEffect(() => {
    if (!open) {
      resetTimeOff();
      resetProject();
    }
  }, [open]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTabs(newValue);
  };

  const onSubmitProject = (data: any) => {
    console.log("data", data, watchProject);
  };

  const onSubmitTimeOff = (data: any) => {
    console.log("data", data, watchTimeOff);
  };

  const _renderProject = () => {
    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            sx={{
              ".text-field-input-container, .text-field-select-container": {
                border: `1px solid transparent`,
                transition: "border-color 0.3s ease",
              },
              border: `1px solid ${
                isFocusAllocation ? palette.primary.main : "transparent"
              }`,
              "&:focus-within": {
                borderColor: palette.primary.main,
              },
            }}
          >
            <Controller
              name="allocation"
              control={controlProject}
              render={({ field }) => (
                <TextFieldInput
                  label={resourceT("form.allocation")}
                  placeholder="8h"
                  sx={{
                    borderRight: "1px solid #BABCC6",
                  }}
                  helperText={errorsProject.allocation?.message}
                  error={!!errorsProject.allocation?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="allocation_type"
              control={controlProject}
              render={({ field }) => (
                <TextFieldSelect
                  value={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  placeholder=""
                  options={[
                    {
                      label: `h/${commonT("day")}`,
                      value: `h/day`,
                    },
                    {
                      label: "%",
                      value: "%",
                    },
                    {
                      label: commonT("hour"),
                      value: "hour",
                    },
                  ]}
                  onFocus={() => setIsFocusAllocation(true)}
                  onBlur={() => setIsFocusAllocation(false)}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="dateRange"
            control={controlProject}
            render={({ field }) => (
              <CustomDateRangePicker
                required
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                label={resourceT("form.dateRange")}
                placeholder=""
                error={!!errorsProject.dateRange?.message}
                helperText={errorsProject.dateRange?.message}
              />
            )}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Controller
            name="projectName"
            control={controlProject}
            render={({ field }) => (
              <TextFieldInput
                value={field.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value)
                }
                required
                label="Project Name"
                fullWidth
                helperText={errorsProject.projectName?.message}
                error={!!errorsProject.projectName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="role"
            control={controlProject}
            render={({ field }) => (
              <TextFieldSelect
                value={field.value}
                helperText={errorsProject.role?.message}
                error={!!errorsProject.role?.message}
                required
                options={[]}
                label="Role"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="dateRange"
            control={controlProject}
            render={({ field }) => {
              const { onChange, ...rest } = field;
              const onPickDate = (value) => {
                setValueProject("date", value);
                clearErrorsProject("date");
              };
              return (
                <CustomDateRangePicker
                  {...rest}
                  required
                  onChange={onPickDate}
                  label="Date"
                  error={!!errorsProject.date?.message}
                  helperText={errorsProject.date?.message}
                />
              );
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="workingTime"
            control={controlProject}
            render={({ field }) => (
              <TextFieldInput
                value={field.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value)
                }
                required
                label="Working time (hours)"
                fullWidth
                helperText={errorsProject.workingTime?.message}
                error={!!errorsProject.workingTime?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Textarea
            value=""
            onChange={() => {
              console.log("a");
            }}
            label="Note"
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Button
              variant="outlined"
              sx={{ width: "150px", marginRight: "24px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: "150px" }}
              variant="contained"
              onClick={handleSubmitProject(onSubmitProject)}
            >
              Save change
            </Button>
          </Stack>
        </Grid> */}
      </Grid>
    );
  };

  const _renderTimeOff = () => {
    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Controller
            name="categoryTimeOff"
            control={controlTimeOff}
            render={({ field }) => (
              <TextFieldSelect
                value={field.value}
                helperText={errorsTimeOff.categoryTimeOff?.message}
                error={!!errorsTimeOff.categoryTimeOff?.message}
                required
                options={[]}
                label="Select time off category"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomDateRangePicker
            required
            value={{}}
            onChange={(value) => {
              setValueTimeOff("dateRange", value);
              clearErrorsTimeOff("date");
            }}
            label="Date"
            error={!!errorsTimeOff.date?.message}
            helperText={errorsTimeOff.date?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="workingTime"
            control={controlTimeOff}
            render={({ field }) => (
              <TextFieldInput
                value={field.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value)
                }
                required
                label="Working time (hours)"
                fullWidth
                helperText={errorsTimeOff.workingTime?.message}
                error={!!errorsTimeOff.workingTime?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Textarea
            value=""
            onChange={() => {
              console.log("a");
            }}
            label="Ghi chú"
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Button
              variant="outlined"
              sx={{ width: "150px", marginRight: "24px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: "150px" }}
              variant="contained"
              onClick={handleSubmitTimeOff(onSubmitTimeOff)}
            >
              Save change
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const _renderMain = () => {
    return (
      <DialogContent>
        <TabContext value={activeTabs}>
          <TabList
            onChange={handleTabChange}
            sx={{
              " & .MuiTab-root": {
                textTransform: "capitalize",
              },
            }}
          >
            <Tab
              label="All People"
              value="1"
              sx={{
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 600,
                px: "32px",
                py: "14px",
              }}
            />
            <Tab
              label="My Schedule"
              value="2"
              sx={{
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 600,
              }}
            />
          </TabList>
          <TabPanel value="1" sx={{ p: 0 }}>
            {_renderProject()}
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            {_renderTimeOff()}
          </TabPanel>
        </TabContext>
      </DialogContent>
    );
  };
  return (
    <DefaultPopupLayout
      isCenterTitle
      title={"Edit booking"}
      content={_renderMain()}
      open={open}
      onClose={onClose}
      sx={{ maxWidth: "576px" }}
    />
  );
};

export default EditBooking;
