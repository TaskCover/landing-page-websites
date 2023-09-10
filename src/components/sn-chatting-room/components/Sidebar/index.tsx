"use client";

import { Box } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ChatList from "./components/ChatList";
import useGetScreenMode from "hooks/useGetScreenMode";
const Sidebar = () => {
  const { handleGetConversation } = useChattingActions();
  const { mobileMode } = useGetScreenMode();

  useEffect(() => {
    handleGetConversation(undefined);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(var(--vh, 1vh) * 100)",
        boxShadow: "2px 2px 24px 0px rgba(0, 0, 0, 0.10)",
        ...(!mobileMode
          ? { minWidth: "300px", maxWidth: "300px" }
          : { width: "100%" }),
      }}
    >
      <SearchBar />
      <ChatList />
    </Box>
  );
};

export default Sidebar;
