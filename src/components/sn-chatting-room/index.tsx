<<<<<<< Updated upstream
"use-client";
import React, { useMemo } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Room from "./Room/Room";
import { Box } from "@mui/material";

const ChattingRoom = () => {
  const renderRoom = useMemo(() => <Room />, []);

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <Sidebar />

      {renderRoom}
=======
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
>>>>>>> Stashed changes
    </Box>
  );
};

export default ChattingRoom;
