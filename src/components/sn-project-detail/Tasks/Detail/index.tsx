import { memo, useEffect, useState, useRef, useMemo } from "react";
import { DrawerProps, Drawer, drawerClasses, Stack, Box } from "@mui/material";
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

const Detail = () => {
  const { task, onUpdateTaskDetail } = useTaskDetail();
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  const projectT = useTranslations(NS_PROJECT);

  const [tab, setTab] = useState<TabDetail>(TabDetail.DETAIL);

  const onClose = () => {
    onUpdateTaskDetail();
  };

  if (!task) return null;

  return (
    <Drawer
      anchor="right"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
          backgroundImage: "none",
          width: { xs: "100%", md: "70%", lg: "50%" },
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
        <Text variant="h5" color="text.primary" textTransform="capitalize">
          {projectT("taskDetail.title")}
        </Text>
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
