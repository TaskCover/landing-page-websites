import { memo, useEffect, useState, useRef, useMemo } from "react";
import { DrawerProps, Drawer, drawerClasses, Stack, Box, Typography, Breadcrumbs, OutlinedInput } from "@mui/material";
import { IconButton, Input, Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_PROJECT } from "constant/index";
import CloseIcon from "icons/CloseIcon";
import TabList, { TabDetail } from "./TabList";
import Information from "./Information";
import { Task } from "store/project/reducer";
import Comments from "./Comments";
import { useTaskDetail } from "store/project/selectors";
import { AssignTask, CommentEditor, StatusTask } from "./components";
import Activities from "./Activities";
import EditTask from "./components/EditTask";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';

const Detail = () => {
  const { task, taskParent, onUpdateTaskDetail, onUpdateTask } = useTaskDetail();
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  const projectT = useTranslations(NS_PROJECT);

  const [tab, setTab] = useState<TabDetail>(TabDetail.DETAIL);
  const [newTaskName, setNewTaskName] = useState("");
  const [editName, setEditName] = useState(false);
  const onClose = () => {
    onUpdateTaskDetail();
  };

  if (!task || !taskParent) return null;

  const updateTaskName = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      onUpdateTask({ name: newTaskName }, task.taskListId, task.taskId, task.subTaskId);
      setEditName(false);
    }
  }

  const setDefaultValue = (name) => {
    setNewTaskName(name);
    setEditName(true)
  }

  const breadcrumbs_values = [taskParent.taskListName, taskParent.taskName];
  if (task.subTaskId) {
    breadcrumbs_values.push(task.name);
  }

  const breadcrumbs = breadcrumbs_values.map((item, idx) => {
    if (idx == breadcrumbs_values.length - 1) {
      return !editName ? (
          <Typography onMouseEnter={() => setDefaultValue(item)} key={idx+1} color="text.primary">{item}</Typography>
        ) : (
          <OutlinedInput
            key={idx+1}
            size="small"
            id="outlined-adornment-weight"
            endAdornment={<EditIcon />}
            aria-describedby="outlined-weight-helper-text"
            onChange={(e) => setNewTaskName(e.target.value)}
            onBlur={() => setEditName(false)}
            onMouseLeave={() => setEditName(false)}
            onKeyDown={updateTaskName}
            value={newTaskName}
          />
        )
    } else {
      return <Typography key={idx+1} color="text.primary">{item}</Typography>
    }
  })

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
        <Breadcrumbs
          separator={<NavigateNextIcon color="disabled" fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
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
