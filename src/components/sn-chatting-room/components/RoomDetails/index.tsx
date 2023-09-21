import { Box, CircularProgress } from "@mui/material";
import React from "react";
import RoomHeader from "./components/RoomHeader";
import Conversation from "components/sn-chat/components/conversation/Conversation";
import useGetScreenMode from "hooks/useGetScreenMode";
import RoomHeaderMobile from "./components/RoomHeaderMobile";
import { useChat } from "store/chat/selectors";

const RoomDetails = () => {
  const { mobileMode } = useGetScreenMode();
  const { isFetching: loading } = useChat();
  return !loading ? (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      {mobileMode ? <RoomHeaderMobile /> : <RoomHeader />}
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
