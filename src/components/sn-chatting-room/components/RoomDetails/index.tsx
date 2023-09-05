import { Box, CircularProgress, Typography } from "@mui/material";
import NoData from "components/NoData";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import { NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import React from "react";
import RoomHeader from "./components/RoomHeader";
import { usePathname } from "next/navigation";
import { CHATTING_ROOM_PATH } from "constant/paths";

const RoomDetails = () => {
  const { conversations, loading } = useChattingActions();
  const pathname = usePathname()
  const t = useTranslations(NS_COMMON);

  return (
    (pathname !== CHATTING_ROOM_PATH && !loading) ? (
      <Box width="100%">
        <RoomHeader />
      </Box>
    ) : (
      <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  )
};

export default RoomDetails;
