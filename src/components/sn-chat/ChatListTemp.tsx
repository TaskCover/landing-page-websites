"use client";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ChatMessageIcon from "icons/ChatMessageIcon";
import CloseIcon from "icons/CloseIcon";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import SwitchChat from "./SwitchChat";

const ChatListTemp = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleTrigger = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen((state) => !state);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "4rem",
        right: "5rem",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      <Popper open={open} anchorEl={anchorEl} placement="top-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box paddingBottom={2}>
              <Paper
                sx={{
                  width: "400px",
                  minHeight: "600px",
                  height: "600px",
                  overflow: "hidden",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <SwitchChat />
              </Paper>
            </Box>
          </Fade>
        )}
      </Popper>
      <Box
        sx={{
          backgroundColor: "#3699FF",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={"div"}
        onClick={handleTrigger}
      >
        {open ? (
          <CloseIcon
            sx={{
              color: "white",
            }}
          />
        ) : (
          <ChatMessageIcon />
        )}
      </Box>
    </Box>
  );
};

export default ChatListTemp;
