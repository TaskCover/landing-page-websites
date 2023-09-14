import { Box, CircularProgress } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React, { useCallback, useRef, useState } from "react";
import RoomHeader from "./components/RoomHeader";
import Conversation from "components/sn-chat/components/conversation/Conversation";

const RoomDetails = ({ currentConversation }) => {
  const {loading } = useChattingActions();
  
  return (
    (!loading) ? (
      <Box width="100%" display="flex" justifyContent="space-between" flexDirection="column">
        <RoomHeader currentConversation={currentConversation} />
        <Conversation wrapperMessageSx={{ height: '75vh' }} />
      </Box>
    ) : (
      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  )
};

export default RoomDetails;