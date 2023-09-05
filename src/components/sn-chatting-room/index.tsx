"use client";

import React from "react";
import { Box } from "@mui/material";
import { SNChat } from "./components";
import useRouteChatDetails from "./hooks/useRouteChatDetails";
import useGetScreenMode from "./hooks/useGetScreenMode";
import ChattingRoomMobileLayout from "./ChattingRoomMobileLayout";

const { RoomDetails, Sidebar } = SNChat;

const ChattingRoom = () => {
  useRouteChatDetails();

  const { mobileMode } = useGetScreenMode();

  const renderChattingRoomWithModeDesktop = () => {
    return (
      <>
        <Sidebar />
        <RoomDetails />
      </>
    );
  };

  const renderChattingRoomWithModeMobile = () => {
    return (
      <>
        <ChattingRoomMobileLayout>
          <Sidebar />
        </ChattingRoomMobileLayout>
      </>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        ...(!mobileMode && { display: "flex", alignItems: "flex-start" }),
      }}
    >
      {!mobileMode
        ? renderChattingRoomWithModeDesktop()
        : renderChattingRoomWithModeMobile()}
    </Box>
  );
};

export default ChattingRoom;
