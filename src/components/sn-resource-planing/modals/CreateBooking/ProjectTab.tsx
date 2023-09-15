import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Collapse, Stack, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextFieldSelect, {
  IOptionStructure,
} from "components/sn-time-tracking/Component/Select";
import Textarea from "components/sn-time-tracking/Component/Textarea";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { schemaProject } from "./Schemas";
import CustomDateRangePicker from "components/sn-resource-planing/components/CustomDateRangePicker";
import TextFieldInput from "components/shared/TextFieldInput";
import ArrowDownIcon from "icons/ArrowDownIcon";
import { usePositionOptions } from "store/global/selectors";
import { Options } from "linkifyjs";
import { useProject, useProjects } from "store/project/selectors";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_RESOURCE_PLANNING } from "constant/index";
import { Button } from "components/shared";

interface IProps {
  open: boolean;
  onClose(): void;
}

const ProjectTab = ({ open, onClose }: IProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFocusAllocation, setIsFocusAllocation] = useState(false);
  const [projectOptions, setProjectOptions] = React.useState<
    IOptionStructure[]
  >([]);
  const { palette } = useTheme();
  const { items: projects } = useProjects();
  const { options: positionOptions } = usePositionOptions();
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
      position: "",
      dateRange: {},
      workingTime: undefined,
      allocation: "",
      allocation_type: "hour",
      note: "",
    },
  });

  const onSubmitProject = (data) => {
    console.log("data", data, watchProject);
  };

  useEffect(() => {
    if (!open) {
      resetProject();
    }
  }, [open]);

  useEffect(() => {
    if (!_.isEmpty(projects)) {
      const resolveOption = _.map(projects, (project) => {
        return {
          label: project.name,
          value: project.id,
        };
      });
      setProjectOptions(resolveOption);
    }
  }, [projects]);

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
          name="position"
          control={controlProject}
          render={({ field }) => (
            <TextFieldSelect
              value={field.value}
              onChange={(event) => field.onChange(event.target.value)}
              helperText={errorsProject.position?.message}
              error={!!errorsProject.position?.message}
              required
              options={positionOptions as IOptionStructure[]}
              label={resourceT("form.role")}
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
              error={!!errorsProject.dateRange?.message}
              helperText={errorsProject.dateRange?.message}
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
          <Typography
            sx={{
              p: "4px 10px",
              background: "#FFECEC",
              color: "#F64E60",
              fontSize: 12,
              fontWeight: 600,
              lineHeight: "18px",
              width: "max-content",
            }}
          >
            -98h {resourceT("form.leftToSchedule").toLowerCase()}
          </Typography>
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
              130h
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
              70h
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
              112h
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
                color: "#F64E60",
              }}
            >
              -52h
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
