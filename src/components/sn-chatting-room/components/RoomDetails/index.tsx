import { Box, CircularProgress } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React from "react";
import RoomHeader from "./components/RoomHeader";
import Conversation from "components/sn-chat/components/conversation/Conversation";
import useGetScreenMode from "hooks/useGetScreenMode";
import RoomHeaderMobile from "./components/RoomHeaderMobile";

const RoomDetails = ({ currentConversation, onResetCurrentConversation, onSelectRoom }) => {
  const { loading } = useChattingActions();
  const { mobileMode } = useGetScreenMode();

  return !loading ? (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      {mobileMode ? (
        <RoomHeaderMobile
          currentConversation={currentConversation}
          onResetCurrentConversation={onResetCurrentConversation}
        />
      ) : (
        <RoomHeader onSelectRoom={onSelectRoom} currentConversation={currentConversation} />
      )}
      <Conversation wrapperMessageSx={{ height: "70vh" }} />
    </Box>
  ) : (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default RoomDetails;
