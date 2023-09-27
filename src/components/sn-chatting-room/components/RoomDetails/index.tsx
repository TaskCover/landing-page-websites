import { Box, CircularProgress } from "@mui/material";
import React from "react";
import RoomHeader from "./components/RoomHeader";
import Conversation from "components/sn-chat/components/conversation/Conversation";
import useGetScreenMode from "hooks/useGetScreenMode";
import RoomHeaderMobile from "./components/RoomHeaderMobile";
import { useChat } from "store/chat/selectors";

const RoomDetails = () => {
  const { mobileMode, extraDesktopMode } = useGetScreenMode();
  const { isFetching: loading, isOpenInfoChat } = useChat();

  return (
    <Box
      width="100%"
      height="90vh"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      {mobileMode ? <RoomHeaderMobile /> : <RoomHeader />}
      <Conversation
        wrapperInputSx={{
          ...(isOpenInfoChat
            ? {
                width: `calc(100% - ${extraDesktopMode ? "424px" : "272px"})`,
              }
            : {}),
        }}
      />
    </Box>
  );
};

export default RoomDetails;