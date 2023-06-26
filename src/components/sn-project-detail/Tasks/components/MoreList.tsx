import {
  Box,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  popoverClasses,
} from "@mui/material";
import { IconButton, Text } from "components/shared";
import { AN_ERROR_TRY_AGAIN, NS_COMMON, NS_PROJECT } from "constant/index";
import DuplicateIcon from "icons/DuplicateIcon";
import MoreDotIcon from "icons/MoreDotIcon";
import MoveArrowIcon from "icons/MoveArrowIcon";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import { memo, MouseEvent, useId, useState } from "react";
import { useTasksOfProject } from "store/project/selectors";
import { Selected, genTime } from "./helpers";
import { Task, TaskList } from "store/project/reducer";
import { useParams } from "next/navigation";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { TaskData } from "store/project/actions";

type MoreListProps = {
  selectedList: Selected[];
  onReset: () => void;
};

enum Action {
  RENAME,
  DUPLICATE = 1,
  MOVE,
  DELETE,
}

const MoreList = (props: MoreListProps) => {
  const { selectedList, onReset } = props;

  const {
    onUpdateTaskList: onUpdateTaskListAction,
    items,
    onCreateTaskList,
    onCreateTask,
    onDeleteTaskList: onDeleteTaskListAction,
  } = useTasksOfProject();
  const projectT = useTranslations(NS_PROJECT);
  const { onAddSnackbar } = useSnackbar();

  const params = useParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverId = useId();
  const commonT = useTranslations(NS_COMMON);

  const [type, setType] = useState<Action | undefined>();

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onSetTType = (action?: Action) => {
    return () => {
      onClose();
      setType(action);
    };
  };

  const onDuplicateTaskList = async (taskList: TaskList) => {
    try {
      if (!params?.id) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newName = projectT("detailTasks.duplicateName", {
        name: taskList.name,
        value: genTime(),
      });
      const newTaskList = await onCreateTaskList({
        name: newName,
        project: params.id,
      });

      if (newTaskList?.id) {
        const tasksOfTaskList = items.find((item) => item.id === taskList.id);
        if (!tasksOfTaskList) {
          throw AN_ERROR_TRY_AGAIN;
        }
        const tasks: Task[] = [];
        for (const taskItem of tasksOfTaskList.tasks) {
          const newTask = (await onCreateTask(
            {
              name: projectT("detailTasks.duplicateName", {
                name: taskItem.name,
                value: genTime(),
              }),
              description: taskItem?.description,
              start_date: taskItem?.start_date,
              end_date: taskItem?.end_date,
              owner: taskItem?.owner?.id,
              estimated_hours: taskItem?.estimated_hours,
            },
            newTaskList.id,
          )) as { task: Task };
          if (newTask?.task?.id) {
            tasks.push(newTask.task);
          }
        }

        for (let i = 0; i < tasks.length; i++) {
          const subTasks = tasksOfTaskList.tasks[i]?.sub_tasks ?? [];
          for (const subTask of subTasks) {
            (await onCreateTask(
              {
                name: projectT("detailTasks.duplicateName", {
                  name: subTask.name,
                  value: genTime(),
                }),
                description: subTask?.description,
                start_date: subTask?.start_date,
                end_date: subTask?.end_date,
                owner: subTask?.owner?.id,
                estimated_hours: subTask?.estimated_hours,
              },
              newTaskList.id,
              tasks[i].id,
            )) as { task: Task };
          }
        }

        onAddSnackbar(
          projectT("detailTasks.notification.duplicateSuccess"),
          "success",
        );
        onSetTType();
      }
    } catch (error) {
      throw error;
    }
  };

  const onDuplicateTask = async (task: Task & { task_list: string }) => {
    try {
      if (!task?.task_list) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newTask = (await onCreateTask(
        {
          name: projectT("detailTasks.duplicateName", {
            name: task.name,
            value: genTime(),
          }),
          description: task?.description,
          start_date: task?.start_date,
          end_date: task?.end_date,
          owner: task?.owner?.id,
          estimated_hours: task?.estimated_hours,
        },
        task.task_list,
      )) as { task: Task };
      if (newTask?.task?.id && task?.sub_tasks?.length) {
        for (const subTask of task.sub_tasks) {
          (await onCreateTask(
            {
              name: projectT("detailTasks.duplicateName", {
                name: subTask.name,
                value: genTime(),
              }),
              description: subTask?.description,
              start_date: subTask?.start_date,
              end_date: subTask?.end_date,
              owner: subTask?.owner?.id,
              estimated_hours: subTask?.estimated_hours,
            },
            task.task_list,
            newTask.task.id,
          )) as { task: Task };
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const onDuplicate = async () => {
    try {
      // DM01
      //   DM01-Task 01
      //     DM01-Task 01-SubTask 01
      //     DM01-Task 01-SubTask 02
      //   DM01-Task 02
      //     DM01-Task 02-SubTask 01
      //   DM01-Task 03
      //     DM01-Task 02-SubTask 01

      const taskListGroup = selectedList.reduce(
        (
          out: {
            taskLists: TaskList[];
            tasks: (Task & { task_list: string })[];
            subTasks: (Partial<TaskData> & { name: string; id: string })[];
          },
          item,
          index,
        ) => {
          let hasTaskList = Boolean(
            out.taskLists.length &&
              out.taskLists.some((taskList) => taskList.id === item.taskListId),
          );
          const taskList = items.find(
            (taskListItem) => taskListItem.id === item.taskListId,
          );
          if (!hasTaskList) {
            const nOfTaskOfSelected = selectedList.filter(
              (selected) =>
                !item?.subTaskId && selected?.taskId === item.taskId,
            ).length;

            hasTaskList = taskList?.tasks.length === nOfTaskOfSelected;
          }

          if (hasTaskList) {
            // DM01 selected
            if (taskList) {
              const isExisted = out.taskLists.some(
                (outTaskList) => outTaskList.id === taskList.id,
              );
              if (!isExisted) {
                out.taskLists.push(taskList);
              }
            }
          } else {
            const hasTask = selectedList.some(
              (selected) =>
                !selected?.subTaskId && selected?.taskId === item.taskId,
            );

            if (hasTask) {
              // DM01-Task 01 selected
              const isExisted = out.tasks.some(
                (outTask) => outTask.id === item.taskId,
              );
              if (!isExisted) {
                const indexTask = (taskList?.tasks ?? []).findIndex(
                  (taskItem) => taskItem.id === item.taskId,
                );
                if (indexTask !== -1) {
                  out.tasks.push({
                    ...taskList?.tasks[indexTask],
                    task_list: item.taskListId as string,
                  } as Task & { task_list: string });
                }
              }
            } else if (item?.subTaskId) {
              const isExisted = out.subTasks.some(
                (subTask) => subTask.id === item.subTaskId,
              );
              if (!isExisted) {
                const indexTask = (taskList?.tasks ?? []).findIndex(
                  (taskItem) => taskItem.id === item.taskId,
                );
                const subTask = (
                  taskList?.tasks[indexTask].sub_tasks ?? []
                ).find((subTaskItem) => subTaskItem.id === item.subTaskId);
                if (subTask) {
                  out.subTasks.push({
                    id: item.subTaskId,
                    name: subTask?.name,
                    task_list: item.taskListId,
                    task: item.taskId,

                    description: subTask?.description,
                    start_date: subTask?.start_date,
                    end_date: subTask?.end_date,
                    owner: subTask?.owner?.id,
                    estimated_hours: subTask?.estimated_hours,
                  });
                }
              }
            }
          }
          return out;
        },
        {
          taskLists: [],
          tasks: [],
          subTasks: [],
        },
      );

      for (const taskList of taskListGroup.taskLists) {
        await onDuplicateTaskList(taskList);
      }

      for (const task of taskListGroup.tasks) {
        await onDuplicateTask(task);
      }

      for (const subTask of taskListGroup.subTasks) {
        const { id, ...data } = subTask;
        await onCreateTask(
          {
            ...data,
            name: projectT("detailTasks.duplicateName", {
              name: data.name,
              value: genTime(),
            }),
          },
          subTask.task_list as string,
          subTask.task as string,
        );
      }
      onAddSnackbar(
        projectT("detailTasks.notification.duplicateSuccess"),
        "success",
      );
      onSetTType();
      onClose();
      onReset();
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  return (
    <>
      <IconButton noPadding onClick={onOpen}>
        <MoreDotIcon fontSize="medium" sx={{ color: "grey.300" }} />
      </IconButton>
      <Popover
        id={popoverId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            minWidth: 150,
            maxWidth: 150,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              mt: 0.5,
            },
          },
        }}
      >
        <Stack
          py={2}
          sx={{
            boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderTopWidth: 0,
            borderColor: "grey.100",
            borderRadius: 1,
          }}
        >
          <MenuList component={Box} sx={{ py: 0 }}>
            <MenuItem
              onClick={onDuplicate}
              component={ButtonBase}
              sx={sxConfig.item}
            >
              <DuplicateIcon sx={{ color: "grey.400" }} fontSize="medium" />
              <Text ml={2} variant="body2" color="grey.400">
                {commonT("duplicate")}
              </Text>
            </MenuItem>
            <MenuItem
              onClick={onSetTType(Action.MOVE)}
              component={ButtonBase}
              sx={sxConfig.item}
            >
              <MoveArrowIcon sx={{ color: "grey.400" }} fontSize="medium" />
              <Text ml={2} variant="body2" color="grey.400">
                {commonT("move")}
              </Text>
            </MenuItem>
            <MenuItem
              onClick={onSetTType(Action.DELETE)}
              component={ButtonBase}
              sx={sxConfig.item}
            >
              <TrashIcon color="error" fontSize="medium" />
              <Text ml={2} variant="body2" color="error.main">
                {commonT("delete")}
              </Text>
            </MenuItem>
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

export default memo(MoreList);

const sxConfig = {
  item: {
    width: "100%",
    py: 1,
    px: 2,
  },
};
