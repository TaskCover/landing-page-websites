import React, { useCallback, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import AccountInfo from "../Drawer";
import { IChatItemInfo } from "store/chat/type";
import { useChat } from "store/chat/selectors";
import useTheme from "hooks/useTheme";

interface ChatDetailInfoMenuItemProps {
  text: string;
  icon: JSX.ElementType;
  isOpenDrawer: boolean;
  currentConversation: IChatItemInfo;
  callBackOpenDrawer?: () => void;
  onOpenDrawer?: () => void

}

const ChatDetailInfoMenuItem: React.FC<ChatDetailInfoMenuItemProps> = (
  props,
) => {

  // Handler to open the drawer.
  const onOpenDrawer = () => {
    props.onOpenDrawer && props.onOpenDrawer()
      props?.callBackOpenDrawer && props.callBackOpenDrawer() 
  };

  const [isRotated, setIsRotated] = useState(false);

  const rotationStyle: React.CSSProperties = isRotated
    ? { transform: "rotate(90deg)" }
    : {};

    const {isDarkMode} = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        padding: "10px 0px",
        gap: "10px",
        cursor: "pointer",
      }}
      onClick={onOpenDrawer}
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
              color: isDarkMode ? 'white' : "#666666",
              filter: "opacity(0.8)",
            }}
          />
          <Typography variant="body2" color={isDarkMode ? 'white' :"var(--Black, #212121)"}>
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
          {props?.callBackOpenDrawer ? <IconButton onClick={onOpenDrawer}>
            <ArrowDownIcon
              sx={{
                ml: "auto",
                transform: "rotate(180deg)",
                filter: "opacity(0.5)",
                cursor: "pointer",
              }}
            />
          </IconButton> : '' }
        </Box>
      </Box>

    </Box>
  );
};

export default ChatDetailInfoMenuItem;
