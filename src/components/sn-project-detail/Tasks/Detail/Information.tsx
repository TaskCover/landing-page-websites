import { ReactNode, memo, useEffect, useMemo, useState } from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { Text } from "components/shared";
import { useTranslations } from "next-intl";
import {
  COLOR_STATUS,
  NS_COMMON,
  NS_PROJECT,
  TEXT_STATUS,
} from "constant/index";
import TextStatus from "components/TextStatus";
import Avatar from "components/Avatar";
import { formatDate, formatNumber } from "utils/index";
import { useTaskDetail } from "store/project/selectors";
import ArrowTriangleIcon from "icons/ArrowTriangleIcon";
import AlignLeftIcon from "icons/AlignLeftIcon";
import LinkSquareIcon from "icons/LinkSquareIcon";
import FatrowIcon from "icons/FatrowIcon";
import HierarchyIcon from "icons/HierarchyIcon";
import TaskSquareIcon from "icons/TaskSquareIcon";
import useToggle from "hooks/useToggle";
import {
  DescriptionTask,
  AttachmentsTask,
  SubTasksOfTask,
  TodoList,
  Dependencies,
} from "./components";
import { SUB_TASKS_ID } from "./components/SubTasksOfTask";
import { TODO_LIST_ID } from "./components/TodoList";
import { DEPENDENCIES_ID } from "./components/Dependencies";
import hljs from "highlight.js";
import { TASK_TEXT_STATUS } from "../components";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
  color?: string;
};

type ActionItemProps = {
  icon: ReactNode;
  children: string;
  onClick?: () => void;
};

const Information = () => {
  const { task, subTaskId } = useTaskDetail();

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const [isAddDescription, onShowAddDescription, onHideAddDescription] =
    useToggle(false);
  const [isAddSubTask, onShowAddSubTask, , , setShowAddSubTask] = useToggle(
    !!task?.sub_tasks?.length,
  );
  const [isAddTodo, onShowAddTodo, , , setShowAddTodo] = useToggle(
    !!task?.todo_list?.length,
  );
  const [isAddDepen, onShowAddDepen, , , setShowAddDepen] = useToggle(
    !!task?.dependencies?.length,
  );

  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, onDraggingTrue, onDraggingFalse] = useToggle(false);

  const isHideActions = useMemo(
    () =>
      Boolean(
        task?.description &&
          task.description !== VALUE_AS_EMPTY &&
          task?.attachments?.length &&
          task?.dependencies?.length &&
          task?.todo_list?.length &&
          (subTaskId || task?.sub_tasks?.length),
      ),
    [
      subTaskId,
      task?.attachments?.length,
      task?.dependencies?.length,
      task?.description,
      task?.sub_tasks?.length,
      task?.todo_list?.length,
    ],
  );

  const onShowAddSub = () => {
    onShowAddSubTask();
    document.getElementById(SUB_TASKS_ID)?.scrollIntoView();
  };
  const onShowAddTodoList = () => {
    onShowAddTodo();
    document.getElementById(TODO_LIST_ID)?.scrollIntoView();
  };

  const onShowAddDependencies = () => {
    onShowAddDepen();
    document.getElementById(DEPENDENCIES_ID)?.scrollIntoView();
  };

  const onAddAttachments = () => {
    document.getElementById(ATTACHMENT_ID)?.click();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    onDraggingTrue();
  };
  const onDrop = (event) => {
    event.preventDefault();
    onDraggingFalse();

    const { files } = event.dataTransfer;
    setFiles(files);
  };

  useEffect(() => {
    setShowAddSubTask(!!task?.sub_tasks?.length);
  }, [setShowAddSubTask, task?.sub_tasks?.length]);

  useEffect(() => {
    setShowAddTodo(!!task?.todo_list?.length);
  }, [setShowAddTodo, task?.todo_list?.length]);

  useEffect(() => {
    setShowAddDepen(!!task?.dependencies?.length);
  }, [setShowAddDepen, task?.dependencies?.length]);

  if (!task) return null;

  return (
    <Stack
      width="100%"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDraggingFalse}
      position="relative"
      spacing={2}
    >
      {isDragging && (
        <Box
          width="100%"
          height="100%"
          border="3px dashed"
          borderColor="grey.100"
          position="absolute"
          top={0}
          left={0}
          zIndex={52}
          bgcolor="text.primary"
          sx={{ opacity: 0.2 }}
        />
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Text
          variant="h5"
          color="text.primary"
          sx={{ wordBreak: "break-word" }}
        >
          {task.name}
        </Text>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Text variant="caption" color="grey.400">
            {commonT("status")}
          </Text>
          <TextStatus
            color={COLOR_STATUS[task.status]}
            text={TASK_TEXT_STATUS[task.status]}
          />
        </Stack>
      </Stack>
      {!isHideActions && (
        <Stack
          display="grid"
          gap={1}
          gridTemplateColumns="repeat(auto-fill, 190px)"
          bgcolor="grey.50"
          p={2}
          borderRadius={1}
        >
          {(!task?.description || task?.description === VALUE_AS_EMPTY) && (
            <ActionItem
              onClick={onShowAddDescription}
              icon={<AlignLeftIcon sx={{ color: "grey.400" }} />}
            >
              {projectT("taskDetail.addDescription")}
            </ActionItem>
          )}
          {!task?.attachments_down?.length && (
            <ActionItem
              onClick={onAddAttachments}
              icon={<LinkSquareIcon sx={{ color: "grey.400" }} />}
            >
              {projectT("taskDetail.addAttachments")}
            </ActionItem>
          )}
          {!task?.dependencies?.length && (
            <ActionItem
              onClick={onShowAddDependencies}
              icon={<FatrowIcon sx={{ color: "grey.400" }} />}
            >
              {projectT("taskDetail.addDependencies")}
            </ActionItem>
          )}
          {!task?.sub_tasks?.length && !subTaskId && (
            <ActionItem
              onClick={onShowAddSub}
              icon={<HierarchyIcon sx={{ color: "grey.400" }} />}
            >
              {projectT("taskDetail.addSubTasks")}
            </ActionItem>
          )}
          {!task?.todo_list?.length && (
            <ActionItem
              onClick={onShowAddTodoList}
              icon={<TaskSquareIcon sx={{ color: "grey.400" }} />}
            >
              {projectT("taskDetail.addToDos")}
            </ActionItem>
          )}
        </Stack>
      )}
      <InformationItem label={commonT("assigner")}>
        {!!task?.owner?.id ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={task.owner?.avatar?.link} />
            <Stack>
              <Text variant="body2" lineHeight={1.57}>
                {task.owner?.fullname ?? "--"}
              </Text>
              <Text variant="caption" color="grey.400" lineHeight={1.5}>
                {task.owner?.email}
              </Text>
            </Stack>
          </Stack>
        ) : (
          "--"
        )}
      </InformationItem>
      <Stack
        display="grid"
        gap={1}
        gridTemplateColumns="repeat(2, 1fr)"
        bgcolor="grey.50"
        p={2}
        borderRadius={1}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <InformationItem label={commonT("form.title.startDate")}>
            {formatDate(task?.start_date, undefined, "--")}
          </InformationItem>

          <ArrowTriangleIcon sx={{ color: "grey.400", width: 46 }} />
          <InformationItem label={commonT("form.title.endDate")}>
            {formatDate(task?.end_date, undefined, "--")}
          </InformationItem>
        </Stack>

        <InformationItem
          label={projectT("detailTasks.form.title.expectCompletionTime")}
          width={150}
        >
          {formatNumber(task?.estimated_hours)}
        </InformationItem>
        <InformationItem label={commonT("creationDate")}>
          {formatDate(task.created_time, "HH:mm - dd/MM/yyyy")}
        </InformationItem>
        <InformationItem
          color="secondary.main"
          label={projectT("detailTasks.form.title.timeTaken")}
        >
          {formatNumber(task?.time_execution, {
            space: false,
            suffix: "h",
          })}
        </InformationItem>
      </Stack>

      <InformationItem
        label={`${commonT("form.title.description")}:`}
        minHeight={150}
        bgcolor="grey.50"
        p={2}
        borderRadius={1}
      >
        {!!task?.description && (
          <Box
            sx={{
              fontSize: 14,
              "& *": {
                wordBreak: "break-all",
              },
            }}
            className="html"
            dangerouslySetInnerHTML={{
              __html: task.description,
            }}
          />
        )}
      </InformationItem>
      <DescriptionTask open={isAddDescription} onClose={onHideAddDescription} />
      <AttachmentsTask id={ATTACHMENT_ID} files={files} setFiles={setFiles} />
      {!subTaskId && <SubTasksOfTask open={isAddSubTask} />}
      <TodoList open={isAddTodo} />
      <Dependencies open={isAddDepen} />
    </Stack>
  );
};

export default memo(Information);

const ActionItem = (props: ActionItemProps) => {
  const { icon, children, onClick } = props;
  return (
    <Stack
      onClick={onClick}
      spacing={0.5}
      direction="row"
      p={0.5}
      borderRadius={1}
      alignItems="center"
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "grey.100",
        },
      }}
    >
      {icon}
      <Text variant="h6" color="grey.400" lineHeight={1.28}>
        {children}
      </Text>
    </Stack>
  );
};

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--", color = "text.primary", ...rest } = props;
  return (
    <Stack spacing={0.5} {...rest}>
      <Text color="grey.300" variant="caption">
        {label}
      </Text>
      {typeof children === "string" ? (
        <Text variant="body2" color={color}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};

const ATTACHMENT_ID = "attachment_id";

const VALUE_AS_EMPTY = "<p><br></p>";
