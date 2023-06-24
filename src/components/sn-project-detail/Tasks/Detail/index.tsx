import React, { memo, useState } from "react";
import { DrawerProps, Drawer, drawerClasses, Stack } from "@mui/material";
import { IconButton, Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_PROJECT } from "constant/index";
import CloseIcon from "icons/CloseIcon";
import TabList, { TabDetail } from "./TabList";
import Information from "./Information";
import { Task } from "store/project/reducer";
import Comments from "./Comments";

type DetailProps = {
  onClose: () => void;
  item: Task;
} & Omit<DrawerProps, "onClose">;

const Detail = (props: DetailProps) => {
  const { onClose, item, ...rest } = props;

  const projectT = useTranslations(NS_PROJECT);

  const [tab, setTab] = useState<TabDetail>(TabDetail.DETAIL);

  return (
    <Drawer
      anchor="right"
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "common.white",
          backgroundImage: "none",
          width: "50%",
          overflow: "hidden",
        },
      }}
      onClose={onClose}
      {...rest}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
      >
        <Text variant="h5" color="text.primary" textTransform="capitalize">
          {projectT("taskDetail.title")}
        </Text>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <TabList value={tab} onChange={setTab} />
      <Stack flex={1} overflow="auto" p={3}>
        <Information {...item} />
        <Comments comments={item?.comments} />
      </Stack>
    </Drawer>
  );
};

export default memo(Detail);
