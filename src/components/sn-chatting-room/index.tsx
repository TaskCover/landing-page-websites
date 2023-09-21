"use client";

import React, { useState } from "react";
import { SNChat } from "./components";
import useGetScreenMode from "hooks/useGetScreenMode";
import { Box } from "@mui/material";
import useFetchingChatting from "./hooks/useFetchingChatting";
import ChattingRoomMobileLayout from "./components/Layout/ChattingRoomMobileLayout";
import AddGroup from "components/sn-chat/chatGroup/AddGroup";
import { useChat } from "store/chat/selectors";

const { RoomDetails, Sidebar, ChattingRoomLayout } = SNChat;

const ChattingRoom = () => {
  const [openAddGroup, setOpenAddGroup] = useState(false);

  const { mobileMode } = useGetScreenMode();
  const { onSearchText, onChangeParamsConversation } = useFetchingChatting();
  const { dataTransfer: currentConversation } = useChat();

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
            onSearchText={onSearchText}
            onChangeParamsConversation={onChangeParamsConversation}
          />
          <RoomDetails />
        </ChattingRoomLayout>
      ) : (
        <>
          {currentConversation ? (
            <RoomDetails />
          ) : (
            <ChattingRoomMobileLayout setOpenAddGroup={setOpenAddGroup}>
              {openAddGroup ? (
                <AddGroup />
              ) : (
                <Sidebar
                  onSearchText={onSearchText}
                  onChangeParamsConversation={onChangeParamsConversation}
                />
              )}
            </ChattingRoomMobileLayout>
          )}
        </>
      )}
    </Box>
  );
};

export default ChattingRoom;
