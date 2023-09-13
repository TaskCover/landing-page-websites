"use client";

import React from "react";
import { SNChat } from "./components";
import useGetScreenMode from "hooks/useGetScreenMode";
import { Box } from "@mui/material";
import useFetchingChatting from "./hooks/useFetchingChatting";
import ChattingRoomMobileLayout from "./components/Layout/ChattingRoomMobileLayout";
import ChatDetailUserMobile from "./components/RoomDetails/components/ChatDetailUserMobile";

const { RoomDetails, Sidebar, ChattingRoomLayout } = SNChat;

const ChattingRoom = () => {
  const { mobileMode } = useGetScreenMode();
  const { onSelectRoom, currentConversation } = useFetchingChatting();

  // const LayoutComponent = mobileMode
  //   ? ChattingRoomMobileLayout
  //   : ChattingRoomLayout;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        ...(!mobileMode && { display: "flex", alignItems: "flex-start" }),
      }}
    >
      {/* <LayoutComponent>
        <Sidebar
          currentConversation={currentConversation}
          onSelectRoom={onSelectRoom}
        />
        <RoomDetails currentConversation={currentConversation} />
      </LayoutComponent> */}
      {!mobileMode ? (
        <ChattingRoomLayout>
          <Sidebar
            currentConversation={currentConversation}
            onSelectRoom={onSelectRoom}
          />
          <RoomDetails currentConversation={currentConversation} />
        </ChattingRoomLayout>
      ) : (
        <ChatDetailUserMobile {...currentConversation} />
      )}
    </Box>
  );
};

export default ChattingRoom;
