"use client";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import SwitchChat from "components/sn-chat/SwitchChat";
import ChatMessageIcon from "icons/ChatMessageIcon";
import CloseIcon from "icons/CloseIcon";
import { useRef, useState } from "react";
import { useChat } from "store/chat/selectors";

const ChatListTemp = () => {
  const { onGetAllConvention, onClearConversation, onReset } = useChat();
  const popperRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleTrigger = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    popperRef.current = !popperRef.current;
    setOpen((state) => !state);

    if (popperRef.current) {
      onGetAllConvention({
        type: "a",
        text: "",
        offset: 0,
        count: 10,
      });
    } else {
      onClearConversation();
      onReset();
    }
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
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top-start"
        transition
        sx={{
          zIndex: 10,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box paddingBottom={2}>
              <Paper
                sx={{
                  width: "400px",
                  minHeight: "600px",
                  height: "600px",
                  position: "relative",
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
