import { Box, CircularProgress } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React from "react";
import RoomHeader from "./components/RoomHeader";

const RoomDetails = ({ currentConversation }) => {
  const {loading } = useChattingActions();
  
  return (
    (!loading) ? (
      <Box width="100%">
        <RoomHeader currentConversation={currentConversation} />
      </Box>
    ) : (
      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  )
};

export default RoomDetails;
