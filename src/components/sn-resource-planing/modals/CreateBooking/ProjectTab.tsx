import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Collapse, Stack, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextFieldSelect, {
  IOptionStructure,
} from "components/shared/TextFieldSelect";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomDateRangePicker from "components/sn-resource-planing/components/CustomDateRangePicker";
import TextFieldInput from "components/shared/TextFieldInput";
import ArrowDownIcon from "icons/ArrowDownIcon";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import { Button, Tooltip } from "components/shared";
import useGetOptions from "components/sn-resource-planing/hooks/useGetOptions";
import { useBookingAll } from "store/resourcePlanning/selector";
import dayjs from "dayjs";
import { BookingData } from "store/resourcePlanning/action";
import { RESOURCE_ALLOCATION_TYPE, RESOURCE_EVENT_TYPE } from "constant/enums";
import { useGetSchemas } from "../Schemas";
import { useCalculateDetail } from "components/sn-resource-planing/hooks/useCalculateDetail";
import { StatusCell } from "components/Table";
import TextStatus from "components/TextStatus";

interface IProps {
  open: boolean;
  onClose(): void;
  resourceId: string;
}

const ProjectTab = ({ open, onClose, resourceId }: IProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFocusAllocation, setIsFocusAllocation] = useState(false);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const { palette } = useTheme();
  const { positionOptions, projectOptions, timeOptions, salesOptions } =
    useGetOptions();
  const { createBooking } = useBookingAll();
  const { schemaProject } = useGetSchemas();
  const commonT = useTranslations(NS_COMMON);
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
  const {
    control: controlProject,
    handleSubmit: handleSubmitProject,
    // setValue: setValueProject,
    // clearErrors: clearErrorsProject,
    watch: watchProject,
    reset: resetProject,
    formState: { errors: errorsProject },
  } = useForm({
    resolver: yupResolver(schemaProject),
    defaultValues: {
      project_id: "",
      sale_id: "",
      dateRange: {},
      allocation: 0,
      allocation_type: RESOURCE_ALLOCATION_TYPE.HOUR,
      note: "",
    },
  });
  const { workedTime, estimate, leftToSchedule, scheduledTime } =
    useCalculateDetail(
      watchProject("sale_id"),
      watchProject("project_id"),
      resourceId,
    );

  const onSubmitProject = (data) => {
    const cleanData: BookingData = {
      ...data,
      start_date: dayjs(data.dateRange.startDate).format("YYYY-MM-DD"),
      end_date: dayjs(data.dateRange.endDate).format("YYYY-MM-DD"),
      booking_type: RESOURCE_EVENT_TYPE.PROJECT_BOOKING,
    };
    createBooking(cleanData);
    onClose();
  };

  useEffect(() => {
    if (!open) {
      resetProject();
    }
  }, [open]);

  useEffect(() => {
    if (!watchProject("sale_id")) {
      setIsShowDetail(false);
    }
  }, [watchProject("sale_id"), isShowDetail]);

  return (
    <Grid2 container spacing={2} sx={{ mt: 1 }}>
      <Grid2 xs={12}>
        <Controller
          name="project_id"
          control={controlProject}
          render={({ field }) => (
            <TextFieldSelect
              helperText={errorsProject.project_id?.message}
              error={!!errorsProject.project_id?.message}
              required
              options={projectOptions}
              label={resourceT("form.project")}
              {...field}
            />
          )}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Controller
          name="sale_id"
          control={controlProject}
          render={({ field }) => (
            <TextFieldSelect
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              helperText={errorsProject.sale_id?.message}
              error={!!errorsProject.sale_id?.message}
              required
              options={salesOptions as IOptionStructure[]}
              label={resourceT("form.services")}
            />
          )}
        />
      </Grid2>
      <Grid2 xs={12} md={6}>
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
              errorMessage={
                errorsProject.dateRange?.startDate?.message ||
                errorsProject.dateRange?.endDate?.message
              }
            />
          )}
        />
      </Grid2>
      <Grid2 xs={12} md={6}>
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
                options={timeOptions}
                onFocus={() => setIsFocusAllocation(true)}
                onBlur={() => setIsFocusAllocation(false)}
              />
            )}
          />
        </Stack>
      </Grid2>
      <Grid2 xs={12}>
        <Controller
          name="note"
          control={controlProject}
          render={({ field }) => {
            return <Textarea {...field} label={resourceT("form.note")} />;
          }}
        />
      </Grid2>

      <Grid2 xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setIsShowDetail(!isShowDetail)}
        >
          <TextStatus
            sx={{
              p: "4px 10px",
              fontSize: 12,
              fontWeight: 600,
              lineHeight: "18px",
              width: "max-content",
            }}
            text=""
            color={leftToSchedule > 0 ? "success" : "error"}
          >
            {leftToSchedule || 0}h{" "}
            {resourceT("form.leftToSchedule").toLowerCase()}
          </TextStatus>
          <Tooltip
            title="Service is not selected"
            placement="top"
            arrow
            open={isShowTooltip}
            onClose={() => setIsShowTooltip(false)}
            onOpen={() => {
              if (!watchProject("sale_id")) {
                setIsShowTooltip(true);
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Typography
                sx={{
                  color: "#666666",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "18px",
                  width: "max-content",
                }}
              >
                {resourceT("form.detail")}
              </Typography>
              <ArrowDownIcon
                width={16}
                height={16}
                sx={{
                  transform: isShowDetail ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </Box>
          </Tooltip>
        </Box>
        <Collapse in={isShowDetail}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "22px",
                fontWeight: 400,
                color: "#666666",
                display: "block",
              }}
            >
              {resourceT("form.estimate")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "18px",
                fontWeight: 600,
                color: "#212121",
                display: "block",
              }}
            >
              {estimate}h
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "22px",
                fontWeight: 400,
                color: "#666666",
                display: "block",
              }}
            >
              {resourceT("form.work")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "18px",
                fontWeight: 600,
                color: "#212121",
                display: "block",
              }}
            >
              {workedTime}h
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "22px",
                fontWeight: 400,
                color: "#666666",
                display: "block",
              }}
            >
              {resourceT("form.schedule")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "18px",
                fontWeight: 600,
                color: "#212121",
                display: "block",
              }}
            >
              {scheduledTime}h
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "22px",
                fontWeight: 400,
                color: "#666666",
              }}
            >
              {resourceT("form.leftToSchedule")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "18px",
                fontWeight: 600,
                color: leftToSchedule > 0 ? "green" : "#F64E60",
              }}
            >
              {leftToSchedule}h
            </Typography>
          </Box>
        </Collapse>
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" justifyContent="center" gap={3}>
          <Button
            variant="primaryOutlined"
            size="medium"
            onClick={onClose}
            sx={{
              width: 150,
              height: 40,
            }}
          >
            {commonT("form.cancel")}
          </Button>
          <Button
            sx={{
              width: 160,
              height: 40,
            }}
            variant="contained"
            onClick={handleSubmitProject(onSubmitProject)}
          >
            {resourceT("form.createBooking")}
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default ProjectTab;
