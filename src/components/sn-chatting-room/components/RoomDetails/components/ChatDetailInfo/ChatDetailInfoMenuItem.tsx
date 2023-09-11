import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import UserIcon from "icons/UserIcon";
import AccountInfo from "../AccountInfo";
import { IChatItemInfo } from "store/chat/type";

interface ChatDetailInfoMenuItemProps {
  text: string;
  icon: JSX.ElementType;
  openDrawer: boolean;
  currentConversation: IChatItemInfo;
}

const ChatDetailInfoMenuItem: React.FC<ChatDetailInfoMenuItemProps> = (
  props,
) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Handler to open the drawer.
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const [isRotated, setIsRotated] = useState(false);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const rotationStyle: React.CSSProperties = isRotated
    ? { transform: "rotate(90deg)" }
    : {};

  const isOpenDrawer = props.openDrawer ? openDrawer : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        padding: "10px 0px",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <props.icon
            sx={{
              fill: "none",
              color: "#666666",
              filter: "opacity(0.8)",
            }}
          />
          <Typography variant="body2" color="var(--Black, #212121)">
            {props.text}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "20px",
            height: "20px",
            ...rotationStyle,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={isOpenDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M14 9.99998C14 10.5833 13.775 11.1667 13.3334 11.6083L7.90003 17.0417C7.65837 17.2833 7.25837 17.2833 7.0167 17.0417C6.77503 16.8 6.77503 16.4 7.0167 16.1583L12.45 10.725C12.85 10.325 12.85 9.67498 12.45 9.27498L7.0167 3.84165C6.77503 3.59999 6.77503 3.19998 7.0167 2.95832C7.25837 2.71665 7.65836 2.71665 7.90003 2.95832L13.3334 8.39165C13.775 8.83332 14 9.41665 14 9.99998Z"
                fill="#666666"
              />
            </svg>
          </IconButton>
        </Box>
      </Box>
      <AccountInfo
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        currentConversation={props.currentConversation}
      />
    </Box>
  );
};

export default ChatDetailInfoMenuItem;
