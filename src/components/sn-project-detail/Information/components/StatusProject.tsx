import { memo, useEffect, useState } from "react";
import { Button, Text } from "components/shared";
import { useProject, useProjects } from "store/project/selectors";
import FormLayout from "components/FormLayout";
import useToggle from "hooks/useToggle";
import { STATUS_OPTIONS } from "components/sn-projects/components/helpers";
import { Radio, Stack } from "@mui/material";
import CircleTickIcon from "icons/CircleTickIcon";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { ProjectStatus } from "store/project/actions";

const StatusProject = () => {
  const { onUpdateProject } = useProjects();
  const { onAddSnackbar } = useSnackbar();
  const { item } = useProject();

  const [isShow, onShow, onHide] = useToggle();
  const [status, setStatus] = useState<ProjectStatus | undefined>();

  const onChange = (newStatus: ProjectStatus) => {
    return () => {
      setStatus(newStatus);
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!status || !item?.id) return;
    try {
      const newData = await onUpdateProject(item.id, { status });
      if (newData) {
        onAddSnackbar("Update status successfully!", "success");
        onHide();
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  useEffect(() => {
    setStatus(item?.status);
  }, [isShow, item?.status]);

  if (!item) return null;

  return (
    <>
      <Button onClick={onShow} variant="secondary" size="small">
        Change status
      </Button>

      <FormLayout
        open={isShow}
        onClose={onHide}
        label="Change project status"
        onSubmit={onSubmit}
        disabled={!status}
        sx={{
          maxWidth: 320,
          minWidth: { xs: 320, sm: 400 },
          minHeight: "fit-content",
        }}
        contentProps={{
          sx: {
            "&>div": {
              alignItems: "center",
            },
          },
        }}
      >
        <Stack>
          {STATUS_OPTIONS.map((item) => (
            <Stack key={item.value} direction="row" alignItems="center">
              <Radio
                checked={item.value === status}
                onClick={onChange(item.value)}
                checkedIcon={<CircleTickIcon color="success" />}
                sx={{ color: "grey.300" }}
              />
              <Text variant="body2">{item.label}</Text>
            </Stack>
          ))}
        </Stack>
      </FormLayout>
    </>
  );
};

export default memo(StatusProject);
