"use client";

import { Box, CircularProgress } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ChatList from "./components/ChatList";
const Sidebar = () => {

  const { handleGetConversation, loading } = useChattingActions();

  useEffect(() => {
    handleGetConversation(undefined)
  }, [handleGetConversation])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 'calc(var(--vh, 1vh) * 100)', boxShadow: '2px 2px 24px 0px rgba(0, 0, 0, 0.10)', minWidth: '300px', maxWidth: '300px' }}>
      <SearchBar />
      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )
        : <ChatList />}
    </Box>
  );
};

export default Sidebar;
