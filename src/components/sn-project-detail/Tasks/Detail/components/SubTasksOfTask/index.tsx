import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { Collapse, IconButton, Text } from "components/shared";
import {
  NS_PROJECT,
  NS_COMMON,
  AN_ERROR_TRY_AGAIN,
  DATE_FORMAT_FORM,
} from "constant/index";
import { useTranslations } from "next-intl";
import { useSnackbar } from "store/app/selectors";
import { useTaskDetail, useTasksOfProject } from "store/project/selectors";
import PlusIcon from "icons/PlusIcon";
import { formatDate, getMessageErrorByAPI } from "utils/index";
import { Task, TaskDetail } from "store/project/reducer";
import MoreSquareIcon from "icons/MoreSquareIcon";
import PDate from "./PDate";
import Assign from "./Assign";
import StatusTask from "./Status";
import Actions, { Action } from "./Actions";
import { genName } from "components/sn-project-detail/Tasks/components";
import { Status } from "constant/enums";
import MoveOtherTask from "./MoveOtherTask";
import ConfirmDialog from "components/ConfirmDialog";

type SubTasksOfTaskProps = {};

const SubTasksOfTask = (props: SubTasksOfTaskProps) => {
  const projectT = useTranslations(NS_PROJECT);
  const { task, taskListId, taskId, subTaskId, onUpdateTask } = useTaskDetail();
  const { onCreateTask } = useTasksOfProject();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError("");
  };

  const onSubmit = async (nameValue: string) => {
    if (!taskListId) return;
    try {
      return await onCreateTask(
        { name: nameValue, status: Status.ACTIVE },
        taskListId,
        taskId,
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  return (
    <>
      <Collapse
        initCollapse
        label={
          <Text color="text.primary" variant="h6">
            {`${projectT("taskDetail.subTasks")} (${
              task?.sub_tasks?.length ?? 0
            })`}
          </Text>
        }
      >
        <Stack mt={2}>
          {task?.sub_tasks?.map((subTask) => (
            <SubTaskItem key={subTask.id} subId={subTask.id} {...subTask} />
          ))}
          <Stack direction="row" alignItems="center" spacing={1}>
            <PlusIcon />
            <TaskName onSubmit={onSubmit} />
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
};

export default memo(SubTasksOfTask);

const TaskName = ({
  onSubmit,
  value = "",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (name: string) => Promise<any>;
  value?: string;
}) => {
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const [name, setName] = useState<string>(value);
  const [error, setError] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError("");
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const nameTrimmed = name?.trim();
    if (nameTrimmed) {
      await onSubmit(nameTrimmed);
      setName("");
    } else {
      setError(
        commonT("form.error.required", {
          name: projectT("detailTasks.form.title.name"),
        }),
      );
    }
  };

  return (
    <Stack width="100%">
      <TextField
        value={name}
        onKeyDown={onKeyDown}
        fullWidth
        variant="filled"
        size="small"
        onChange={onChange}
        sx={{
          "& >div": {
            bgcolor: "transparent!important",
          },
        }}
      />
      {!!error && (
        <Text variant="caption" color="error">
          {error}
        </Text>
      )}
    </Stack>
  );
};

const SubTaskItem = (props: Task & { subId: string }) => {
  const { status, name, end_date, start_date, owner, description, subId } =
    props;
  const {
    task,
    taskListId,
    taskId,
    subTaskId,
    onUpdateTask,
    onUpdateTaskDetail,
  } = useTaskDetail();
  const { onAddSnackbar } = useSnackbar();
  const { onCreateTask, onDeleteSubTasks } = useTasksOfProject();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const [action, setAction] = useState<Action | undefined>();

  const onChangeDate = async (name: string, value?: string) => {
    try {
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      await onUpdateTask(
        { [name]: formatDate(value, DATE_FORMAT_FORM) },
        taskListId,
        taskId,
        subId,
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const onChangeName = async (newName: string) => {
    try {
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      await onUpdateTask({ name: newName }, taskListId, taskId, subId);
      setAction(undefined);
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const onDuplicate = async () => {
    if (!taskListId || !taskId) return;
    const subTaskNames = (task?.sub_tasks ?? []).map((item) => item.name);
    try {
      await onCreateTask(
        {
          status,
          name: genName(subTaskNames, name),
          end_date,
          start_date,
          owner: owner?.id,
          description,
        },
        taskListId,
        taskId,
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const onDelete = async () => {
    try {
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      await onDeleteSubTasks({
        task: taskId,
        task_list: taskListId,
        sub_tasks: [subId],
      });
      setAction(undefined);
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const onChangeAction = (newAction?: Action) => {
    switch (newAction) {
      case Action.DUPLICATE_SUB_TASK:
        onDuplicate();
        break;
      default:
        setAction(newAction);
        break;
    }
  };

  const onResetAction = () => {
    setAction(undefined);
  };

  const onSetTask = () => {
    onUpdateTaskDetail({
      ...props,
      taskListId,
      taskId,
      subTaskId: subId,
    } as TaskDetail);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="100%"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={2} flex={1}>
          <StatusTask status={status} subId={subId} />
          {action === Action.RENAME ? (
            <TaskName onSubmit={onChangeName} value={name} />
          ) : (
            <Text
              variant="body2"
              onClick={onSetTask}
              noWrap
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              maxWidth={150}
            >
              {name}
            </Text>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} flex={1}>
          <PDate
            label={
              start_date
                ? formatDate(start_date)
                : commonT("form.title.startDate")
            }
            name="start_date"
            maxDate={end_date}
            onChange={onChangeDate}
            value={start_date}
          />
          <PDate
            label={
              end_date
                ? formatDate(end_date)
                : projectT("taskDetail.setDueDate")
            }
            name="end_date"
            minDate={start_date}
            onChange={onChangeDate}
            value={end_date}
          />
          <Assign owner={owner} subId={subId} />
          <Actions subId={subId} onChangeAction={onChangeAction} />
        </Stack>
      </Stack>
      {action === Action.CHANGE_PARENT_TASK && (
        <MoveOtherTask subId={subId} open onClose={onResetAction} />
      )}
      {action === Action.DELETE && (
        <ConfirmDialog
          onSubmit={onDelete}
          open
          onClose={onResetAction}
          title={commonT("confirmDelete.title")}
          content={commonT("confirmDelete.content")}
        />
      )}
    </>
  );
};
