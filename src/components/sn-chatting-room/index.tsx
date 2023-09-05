"use client";

import React from "react";
import { Box } from "@mui/material";
import { SNChat } from "./components";

const { RoomDetails, Sidebar } = SNChat;

const ChattingRoom = () => {
  return (
    <Box sx={{ width: '100%', display: "flex", alignItems: "flex-start" }}>
      <Sidebar />
      <RoomDetails />
    </Box>
  );
};

export default ChattingRoom;
