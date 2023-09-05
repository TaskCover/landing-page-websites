"use client";

import React from "react";
import { Box } from "@mui/material";
import { SNChat } from "./components";
import useRouteChatDetails from "./hooks/useRouteChatDetails";

const { RoomDetails, Sidebar } = SNChat;

const ChattingRoom = () => {
  useRouteChatDetails()

  return (
    <Box sx={{ width: '100%', display: "flex", alignItems: "flex-start" }}>
      <Sidebar />
      <RoomDetails />
    </Box>
  );
};

export default ChattingRoom;
