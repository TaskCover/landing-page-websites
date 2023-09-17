"use client";

import React from "react";
import { SNChat } from "./components";
import useGetScreenMode from "hooks/useGetScreenMode";
import { Box } from "@mui/material";
import useFetchingChatting from "./hooks/useFetchingChatting";
import ChatDetailUserMobile from "./components/RoomDetails/components/ChatDetailUserMobile";
import GroupChatMobile from "./components/RoomDetails/components/GroupChatMobile";
import ChattingRoomMobileLayout from "./components/Layout/ChattingRoomMobileLayout";

const { RoomDetails, Sidebar, ChattingRoomLayout } = SNChat;

const ChattingRoom = () => {
  const { mobileMode } = useGetScreenMode();
<<<<<<< Updated upstream
  const { onSelectRoom, currentConversation, onSearchText } =
    useFetchingChatting();
=======
  const { onSelectRoom, currentConversation, onSearchText } = useFetchingChatting();

>>>>>>> Stashed changes
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        ...(!mobileMode && { display: "flex", alignItems: "flex-start" }),
      }}
    >
      {!mobileMode ? (
        <ChattingRoomLayout>
          <Sidebar
            currentConversation={currentConversation}
            onSelectRoom={onSelectRoom}
            onSearchText={onSearchText}
          />
          <RoomDetails currentConversation={currentConversation} />
        </ChattingRoomLayout>
      ) : (
        // <GroupChatMobile {...currentConversation} />

        <RoomDetails currentConversation={currentConversation} />
      )}
    </Box>
  );
};

export default ChattingRoom;
