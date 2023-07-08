import { memo, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Collapse, Text } from "components/shared";
import { NS_PROJECT, NS_COMMON, AN_ERROR_TRY_AGAIN } from "constant/index";
import { useTranslations } from "next-intl";
import { useSnackbar } from "store/app/selectors";
import { useTaskDetail, useTasksOfProject } from "store/project/selectors";
import PlusIcon from "icons/PlusIcon";
import { getMessageErrorByAPI } from "utils/index";
import StatusDependency from "./Status";
import Actions from "./Actions";
import ConfirmDialog from "components/ConfirmDialog";
import { DependencyStatus } from "store/project/actions";
import { Option } from "constant/types";
import { Dropdown } from "components/Filters";
import { Dependency, TaskDetail } from "store/project/reducer";

const Dependencies = ({ open }: { open: boolean }) => {
  const projectT = useTranslations(NS_PROJECT);
  const { task } = useTaskDetail();
  const { items } = useTasksOfProject();
  const { onAddSnackbar } = useSnackbar();

  if (!open) return null;

  return (
    <>
      <Box component="span" id={DEPENDENCIES_ID} hidden />
      <Collapse
        initCollapse
        label={
          <Text color="text.primary" variant="h6">
            {`${projectT("taskDetail.dependencies")} (${
              task?.dependencies?.length ?? 0
            })`}
          </Text>
        }
      >
        <Stack mt={2}>
          {task?.dependencies?.map((dependency, index) => (
            <SubItem key={index} {...dependency} dependencyId={dependency.id} />
          ))}
          <Stack direction="row" alignItems="center" spacing={1}>
            <PlusIcon />
            <Select />
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
};

export default memo(Dependencies);
export const DEPENDENCIES_ID = "dependencies_id";

const Select = ({ value }: { value?: string }) => {
  const { task, taskListId, taskId, subTaskId, onUpdateTask } = useTaskDetail();
  const projectT = useTranslations(NS_PROJECT);
  const { items } = useTasksOfProject();
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);

  const [search, setSearch] = useState<string>("");

  const options = useMemo(() => {
    let _options = items.reduce((out: Option[], item) => {
      item.tasks.forEach((task) => {
        out.push({
          label: task.name,
          value: task.id,
          subText: item.id,
        });
        task?.sub_tasks?.forEach((subTask) => {
          out.push({
            label: subTask.name,
            value: subTask.id,
            subText: item.id,
          });
        });
      });
      return out;
    }, []);
    if (search) {
      _options = _options.filter(
        (item) => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1,
      );
    }
    return _options;
  }, [items, search]);

  const onChangeSearch = (_, newValue) => {
    setSearch(newValue);
  };

  const onChangeDependency = async (_, newValue: string) => {
    if (!taskListId || !taskId) return;
    try {
      const optionSelected = options.find((item) => item.value === newValue);
      if (!optionSelected) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newDependencies = [...(task?.dependencies ?? [])].map((item) => ({
        task_current: subTaskId ?? taskId,
        task_list_current: taskListId,
        task_list_update: item.id_task_list,
        task_update: item.id_task,
        status: item.status,
      }));

      if (value) {
        const indexUpdated = newDependencies.findIndex(
          (depen) => depen.task_update === value,
        );
        if (indexUpdated !== -1) {
          newDependencies[indexUpdated] = {
            ...newDependencies[indexUpdated],
            task_list_update: optionSelected.subText as string,
            task_update: optionSelected.value as string,
          };
        }
      } else {
        newDependencies.push({
          task_current: subTaskId ?? taskId,
          task_list_current: taskListId,
          task_list_update: optionSelected.subText as string,
          task_update: optionSelected.value as string,
          status: DependencyStatus.WAITING_ON,
        });
      }

      return await onUpdateTask(
        { dependencies: newDependencies },
        taskListId,
        taskId,
        subTaskId,
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };
  return (
    <Dropdown
      name=""
      fullWidth
      onChange={onChangeDependency}
      onChangeSearch={onChangeSearch}
      options={options}
      searchProps={{
        value: search,
      }}
      value={value}
      showSubText={false}
      size="small"
      hasAll={false}
      placeholder={value ? undefined : projectT("taskDetail.addDependencyTask")}
    />
  );
};

const SubItem = (props: Dependency & { dependencyId: string }) => {
  const { status, id_task, dependencyId } = props;
  const {
    taskListId,
    subTaskId,
    taskId,
    onUpdateTaskDetail,
    onDeleteDependency,
    onGetTaskList,
  } = useTaskDetail();
  const { onAddSnackbar } = useSnackbar();
  const { onCreateTask, onDeleteSubTasks } = useTasksOfProject();
  const { items } = useTasksOfProject();

  const options = useMemo(() => {
    return items.reduce((out: Option[], item) => {
      item.tasks.forEach((task) => {
        out.push({
          label: task.name,
          value: task.id,
          subText: item.id,
        });
        task?.sub_tasks?.forEach((subTask) => {
          out.push({
            label: subTask.name,
            value: subTask.id,
            subText: item.id,
            avatar: task.id,
          });
        });
      });
      return out;
    }, []);
  }, [items]);

  const selected = useMemo(
    () => options.find((item) => item.value === id_task),
    [id_task, options],
  );

  const onDelete = async () => {
    if (!taskListId || !taskId) return;
    try {
      const result = await onDeleteDependency({
        task: taskId,
        task_list: taskListId,
        sub_task: subTaskId,
        id_dependence: dependencyId,
      });
      onGetTaskList(taskListId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const onSetTask = () => {
    if (!selected) return;
    const taskListId = selected?.subText as string;
    const taskId = selected?.avatar ?? (selected.value as string);
    const subTaskId = (selected?.avatar ? selected.value : undefined) as
      | string
      | undefined;

    const taskList = items.find((taskList) => taskList.id === taskListId);

    if (!taskList) return;

    const task = taskList.tasks.find((taskItem) => taskItem.id === taskId);
    if (!task) return;

    if (subTaskId) {
      const subTask = (task.sub_tasks ?? []).find(
        (subTask) => subTask.id === subTaskId,
      );
      onUpdateTaskDetail({
        ...subTask,
        taskListId,
        taskId,
        subTaskId,
      } as TaskDetail);
    } else {
      onUpdateTaskDetail({
        ...task,
        taskListId,
        taskId,
        subTaskId,
      } as TaskDetail);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      width="100%"
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={2} flex={1}>
        <StatusDependency status={status} dependencyId={dependencyId} />
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
          {selected?.label}
        </Text>
      </Stack>

      <Actions onDelete={onDelete} />
    </Stack>
  );
};
