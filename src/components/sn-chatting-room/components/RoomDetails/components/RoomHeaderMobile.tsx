import React, { useState } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import useTheme from "hooks/useTheme";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import SidebarIcon from "icons/SidebarIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import colorSchemes from "utils/colorSchemes";
import ChatDetailInfo from "./ChatDetailInfo";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CallIcon from "icons/CallIcon";
import ChatDetailUserMobile from "./ChatDetailUserMobile";

const RoomHeaderMobile = ({
  currentConversation,
  onResetCurrentConversation,
}) => {
  const { isDarkMode } = useTheme();

  console.log(currentConversation);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Handler to open the drawer.
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Handler to close the drawer.
  const closeDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const styleIcon = { color: "white", fontSize: "24px", cursor: "pointer" };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "54px",
        padding: "0 16px",
        flexShrink: 0,
        backgroundColor: "#3699FF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <ArrowBackIosNewIcon
          style={styleIcon}
          onClick={onResetCurrentConversation}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={openDrawer}
        >
          <Avatar
            src={currentConversation?.avatar}
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "9999px",
            }}
          />
          <Box display="flex" flexDirection="column" gap="4px">
            <Typography variant="h6" color="#FFF">
              {currentConversation?.name}
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.60)">
              Online
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{
            color: "transparent",
          }}
        >
          <CallIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "transparent",
          }}
        >
          <VideoCallIcon stroke={"#FFF"} />
        </IconButton>
        <ChatDetailUserMobile
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          currentConversation={currentConversation}
        />
      </Box>
    </Box>
  );
};

export default RoomHeaderMobile;
