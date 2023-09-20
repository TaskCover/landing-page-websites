"use client";

import React from "react";
import { SNChat } from "./components";
import useGetScreenMode from "hooks/useGetScreenMode";
import { Box } from "@mui/material";
import useFetchingChatting from "./hooks/useFetchingChatting";
import ChattingRoomMobileLayout from "./components/Layout/ChattingRoomMobileLayout";

const { RoomDetails, Sidebar, ChattingRoomLayout } = SNChat;

const ChattingRoom = () => {
  const { mobileMode } = useGetScreenMode();
  const {
    onSelectRoom,
    currentConversation,
    onSearchText,
    onResetCurrentConversation,
    onChangeParamsConversation,
  } = useFetchingChatting();

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
            onChangeParamsConversation={onChangeParamsConversation}
          />
          <RoomDetails
            currentConversation={currentConversation}
            onResetCurrentConversation={onResetCurrentConversation}
          />
        </ChattingRoomLayout>
      ) : (
        <>
          {currentConversation ? (
            <RoomDetails
              currentConversation={currentConversation}
              onResetCurrentConversation={onResetCurrentConversation}
            />
          ) : (
            <ChattingRoomMobileLayout>
              <Sidebar
                currentConversation={currentConversation}
                onSelectRoom={onSelectRoom}
                onSearchText={onSearchText}
                onChangeParamsConversation={onChangeParamsConversation}
              />
            </ChattingRoomMobileLayout>
          )}
        </>
      )}
    </Box>
  );
};

export default ChattingRoom;
