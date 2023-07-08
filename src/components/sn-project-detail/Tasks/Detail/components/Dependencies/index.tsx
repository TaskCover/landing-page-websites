import React, {
  ChangeEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Stack, TextField } from "@mui/material";
import { Collapse, IconButton, Select, Text } from "components/shared";
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
import StatusDependency from "./Status";
import Actions, { Action } from "./Actions";
import { genName } from "components/sn-project-detail/Tasks/components";
import { Status } from "constant/enums";
import ConfirmDialog from "components/ConfirmDialog";
import { Dependency, DependencyStatus } from "store/project/actions";
import { Option } from "constant/types";
import { Dropdown } from "components/Filters";

const Dependencies = () => {
  const projectT = useTranslations(NS_PROJECT);
  const { task, taskListId, taskId, subTaskId, onUpdateTask } = useTaskDetail();
  const { items } = useTasksOfProject();
  const { onCreateTask } = useTasksOfProject();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { onAddSnackbar } = useSnackbar();
  const commonT = useTranslations(NS_COMMON);

  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  const options = useMemo(() => {
    let _options = items.reduce((out: Option[], item) => {
      item.tasks.forEach((task) => {
        out.push({
          label: task.name,
          value: task.id,
        });
        task?.sub_tasks?.forEach((subTask) => {
          out.push({
            label: subTask.name,
            value: subTask.id,
            subText: task.id,
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

  const onChangeDependency = async (_, value: string) => {
    if (!taskListId || !taskId) return;
    try {
      const optionSelected = options.find((item) => item.value === value);
      if (!optionSelected) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newDependencies = [
        ...(task?.dependencies ?? []),
        {
          task_current: subTaskId ?? taskId,
          task_list_current: taskListId,
          task_list_update: taskListId,
          task_update: optionSelected.value,
          status: DependencyStatus.WAITING_ON,
        },
      ] as Dependency[];
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
    <>
      <Collapse
        initCollapse
        label={
          <Text color="text.primary" variant="h6">
            {`${projectT("taskDetail.dependencies")} (${
              task?.sub_tasks?.length ?? 0
            })`}
          </Text>
        }
      >
        <Stack mt={2}>
          {task?.dependencies?.map((dependency, index) => (
            <SubItem key={index} {...dependency} />
          ))}
          <Stack direction="row" alignItems="center" spacing={1}>
            <PlusIcon />
            <Dropdown
              name=""
              fullWidth
              onChange={onChangeDependency}
              onChangeSearch={onChangeSearch}
              options={options}
              searchProps={{
                value: search,
              }}
              showSubText={false}
              size="small"
              showPlaceholder
              placeholder={projectT("taskDetail.addDependencyTask")}
            />
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
};

export default memo(Dependencies);

const DependencyName = ({
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

const SubItem = (props: Dependency) => {
  const { status } = props;
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

  const onDelete = async () => {
    try {
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      // await onDeleteSubTasks({
      //   task: taskId,
      //   task_list: taskListId,
      //   sub_tasks: [subId],
      // });
      setAction(undefined);
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const onResetAction = () => {
    setAction(undefined);
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
          <StatusDependency />
        </Stack>

        {/* <Actions onChangeAction={onChangeAction} /> */}
      </Stack>
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
