"use client";

import React from "react";
import { SNChat } from "./components";
import useGetScreenMode from "hooks/useGetScreenMode";
import { Box } from "@mui/material";
import useFetchingChatting from "./hooks/useFetchingChatting";

const { RoomDetails, Sidebar, ChattingRoomLayout } = SNChat;

const ChattingRoom = () => {

  const { mobileMode } = useGetScreenMode();
  const { onSelectRoom, currentConversation } = useFetchingChatting()

  return (
    <Box
      sx={{
        width: "100%",
        ...(!mobileMode && { display: "flex", alignItems: "flex-start" }),
      }}
    >
      <ChattingRoomLayout>
        <Sidebar currentConversation={currentConversation} onSelectRoom={onSelectRoom} />
        <RoomDetails currentConversation={currentConversation}/>
      </ChattingRoomLayout>
    </Box>
  );
};

export default ChattingRoom;
