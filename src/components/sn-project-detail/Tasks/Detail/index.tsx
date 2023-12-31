import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Breadcrumbs,
  Drawer,
  Stack,
  Typography,
  drawerClasses,
} from "@mui/material";
import { IconButton } from "components/shared";
import { NS_PROJECT } from "constant/index";
import CloseIcon from "icons/CloseIcon";
import { useTranslations } from "next-intl";
import { memo, useMemo, useRef, useState } from "react";
import { useAppSelector } from "store/hooks";
import { useTaskDetail } from "store/project/selectors";
import Activities from "./Activities";
import Comments from "./Comments";
import Information from "./Information";
import TabList, { TabDetail } from "./TabList";
import { AssignTask, CommentEditor, StatusTask } from "./components";
import EditTask from "./components/EditTask";
import Actions, { Action } from "./components/SubTasksOfTask/Actions";
import MoveOtherTask from "./components/SubTasksOfTask/MoveOtherTask";

const Detail = () => {
  const { task, taskParent, onUpdateTaskDetail, onUpdateTask } =
    useTaskDetail();
  const taskLists = useAppSelector((state) => state.project.tasks);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const [action, setAction] = useState<Action | undefined>();
  const projectT = useTranslations(NS_PROJECT);

  const options = useMemo(
    () => [
      {
        label: projectT("taskDetail.changeParentTask"),
        value: Action.CHANGE_PARENT_TASK,
      },
    ],
    [projectT],
  );

  const [tab, setTab] = useState<TabDetail>(TabDetail.DETAIL);
  const onClose = () => {
    setTab(TabDetail.DETAIL);
    onUpdateTaskDetail();
  };

  if (!task || !taskParent) return null;

  const breadcrumbs_values = [taskParent.taskListName, taskParent.taskName];
  if (task.subTaskId) {
    breadcrumbs_values.push(task.name);
  } else if (task.taskId) {
    breadcrumbs_values[1] = task.name;
  }

  const onGotoTask = async () => {
    const taskList = taskLists.filter((item) => item.id === task.taskListId);

    if (!taskList[0]) return;

    const taskOfSubtask = taskList[0].tasks.filter(
      (item) => item.id === task.taskId,
    );

    if (!taskOfSubtask[0]) return;

    onUpdateTaskDetail({
      ...taskOfSubtask[0],
      taskId: taskOfSubtask[0].id,
      taskListId: taskList[0].id,
    });
  };

  const breadcrumbs = breadcrumbs_values.map((item, idx) => {
    return (
      <Typography
        key={idx + 1}
        color="text.primary"
        sx={{
          fontSize: "20px",
          fontWeight: idx !== 2 ? "500" : "400",
          color: idx === 0 ? "grey.300" : "text.primary",
          cursor: idx === 1 ? "pointer" : "unset",
          textOverflow: "ellipsis",
          textWrap: "nowrap",
          display: "block",
          overflow: "hidden",
        }}
        onClick={idx === 1 ? onGotoTask : undefined}
      >
        {item}
      </Typography>
    );
  });

  const onChangeAction = (newAction?: Action) => {
    setAction(newAction);
  };

  const onResetAction = () => {
    setAction(undefined);
  };

  const onAfterSubmit = () => {
    onUpdateTaskDetail();
  };

  return (
    <Drawer
      anchor="right"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
          backgroundImage: "none",
          width: { xs: "100%", md: "70%", lg: "50%" },
          maxWidth: 720,
          overflow: "hidden",
        },
      }}
      onClose={onClose}
      open
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={{ xs: 2, md: 3 }}
      >
        <Stack direction="row" alignItems="center">
          <Breadcrumbs
            separator={<NavigateNextIcon color="disabled" fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              ".MuiBreadcrumbs-li": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,

                "&:first-child": {
                  flex: "0 auto",
                },
              },
            }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          {task.subTaskId && (
            <Stack ml={2}>
              <Actions
                subId={task.subTaskId}
                onChangeAction={onChangeAction}
                options={options}
              />

              {/* ACTIONS */}
              {action === Action.CHANGE_PARENT_TASK && (
                <MoveOtherTask
                  subId={task.subTaskId}
                  open
                  onClose={onResetAction}
                  onAfterSubmit={onAfterSubmit}
                />
              )}
            </Stack>
          )}
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <TabList value={tab} onChange={setTab} />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        display={{ md: "none" }}
        my={2}
        justifyContent="center"
      >
        <AssignTask />
        <StatusTask />
        <EditTask />
      </Stack>
      <Stack
        flex={1}
        overflow="auto"
        p={{ xs: 2, md: 3 }}
        spacing={{ xs: 2, md: 3 }}
      >
        {tab === TabDetail.DETAIL ? (
          <>
            <Information />
            <CommentEditor ref={scrollEndRef} />
            <Comments comments={task?.comments} />
            <Box ref={scrollEndRef} />
          </>
        ) : (
          <Activities />
        )}
      </Stack>
    </Drawer>
  );
};

export default memo(Detail);
