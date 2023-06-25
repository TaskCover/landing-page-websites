import { memo, useEffect, useState } from "react";
import { Button, Text } from "components/shared";
import {
  useProject,
  useTaskDetail,
  useTasksOfProject,
} from "store/project/selectors";
import FormLayout from "components/FormLayout";
import useToggle from "hooks/useToggle";
import { Radio, Stack } from "@mui/material";
import CircleTickIcon from "icons/CircleTickIcon";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { TaskData } from "store/project/actions";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT, STATUS_OPTIONS } from "constant/index";
import { Status } from "constant/enums";
import { Task } from "store/project/reducer";

const StatusTask = () => {
  const { task, taskListId, onUpdateTask } = useTaskDetail();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const [isShow, onShow, onHide] = useToggle();
  const [status, setStatus] = useState<Status | undefined>();

  const onChange = (newStatus: Status) => {
    return () => {
      setStatus(newStatus);
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!status || !taskListId || !task?.id) return;
    try {
      const newData = await onUpdateTask(
        { status } as Partial<TaskData>,
        taskListId,
        task.id,
      );
      if (newData) {
        onAddSnackbar(
          projectT("detail.notification.changeStatusSuccess"),
          "success",
        );
        onHide();
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  useEffect(() => {
    setStatus(task?.status);
  }, [isShow, task?.status]);

  return (
    <>
      <Button onClick={onShow} variant="secondary" size="small">
        {projectT("detail.changeStatus")}
      </Button>

      <FormLayout
        open={isShow}
        onClose={onHide}
        label={projectT("taskDetail.changeStatusTask")}
        onSubmit={onSubmit}
        disabled={!status}
        sx={{
          maxWidth: 320,
          minWidth: { xs: 320, sm: 400 },
          minHeight: "fit-content",
          zIndex: 1201,
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
              <Text variant="body2">{commonT(item.label)}</Text>
            </Stack>
          ))}
        </Stack>
      </FormLayout>
    </>
  );
};

export default memo(StatusTask);
