import { Box, Typography } from "@mui/material";
import NoData from "components/NoData";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import { NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import React from "react";

const RoomDetails = () => {
  const { conversations } = useChattingActions();
  const t = useTranslations(NS_COMMON);

  return (
    conversations.length > 0 ? (
      <Box>Room</Box>
    ) : (
      <NoData height="full" />
    )
  )
};

export default RoomDetails;
