"use client";

import React from "react";
import { SNChat } from "./components";
import useRouteChatDetails from "./hooks/useRouteChatDetails";
import useGetScreenMode from "hooks/useGetScreenMode";
import { Box } from "@mui/material";

const { RoomDetails } = SNChat;

const ChattingRoom = () => {
  useRouteChatDetails();

  const { mobileMode } = useGetScreenMode();
  return (
    <Box
      sx={{
        width: "100%",
        ...(!mobileMode && { display: "flex", alignItems: "flex-start" }),
      }}
    >
      <SNChat.ChattingRoomLayout>
        <SNChat.Sidebar />
        <RoomDetails />
      </SNChat.ChattingRoomLayout>
    </Box>
  );
};

export default ChattingRoom;
