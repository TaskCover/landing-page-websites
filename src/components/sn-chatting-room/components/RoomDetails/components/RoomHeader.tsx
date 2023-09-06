import React, { useState } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import useTheme from "hooks/useTheme";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import SidebarIcon from "icons/SidebarIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import colorSchemes from "utils/colorSchemes";
import ChatDetailInfo from "./ChatDetailInfo/ChatDetailInfo";

const RoomHeader = () => {
  const { currentConversation } = useChattingActions();
  const { isDarkMode } = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Handler to open the drawer.
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Handler to close the drawer.
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      height="76px"
      padding="10px"
      bgcolor="var(--Gray0, #F7F7FD);"
    >
      <Box
        width="100%"
        display="flex"
        padding="10px"
        gap="20px"
        alignItems="center"
      >
        <Avatar
          src={currentConversation?.avatar}
          sx={{ height: "56px", width: "56px", borderRadius: "10px" }}
        />
        <Box display="flex" flexDirection="column" gap="4px">
          <Typography variant="h6" color="var(--Black, #212121)">
            {currentConversation?.name}
          </Typography>
          <Typography variant="body2" color="var(--Gray3, #999)">
            Online
          </Typography>
        </Box>
      </Box>
      <Box
        justifyContent="flex-end"
        width="100%"
        display="flex"
        padding="10px"
        gap="4px"
        alignItems="center"
      >
        <IconButton
          sx={{
            color:
              colorSchemes[isDarkMode ? "dark" : "light"].palette.secondary
                .main,
          }}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "transparent",
          }}
        >
          <ProfileAdd />
        </IconButton>
        <IconButton
          sx={{
            color: "transparent",
          }}
        >
          <VideoCallIcon />
        </IconButton>
        <IconButton
          onClick={openDrawer}
          sx={{
            color: "transparent",
          }}
        >
          <SidebarIcon />
        </IconButton>
      </Box>
      <ChatDetailInfo isOpen={isDrawerOpen} onClose={closeDrawer} />
    </Box>
  );
};

export default RoomHeader;
