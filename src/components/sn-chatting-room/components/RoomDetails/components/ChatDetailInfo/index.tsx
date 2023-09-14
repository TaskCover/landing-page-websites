import { Drawer, Box, Typography, Avatar } from "@mui/material";
import ChatDetailInfoHeader from "./ChatDetailInfoHeader";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";
import { IChatItemInfo } from "store/chat/type";
import useGetScreenMode from "hooks/useGetScreenMode";
import { useMemo } from "react";
import AccountInfo from "../Drawer";
import { useChatDetailInfo } from "./useChatDetailInfo";
import DrawerInfoChat from "../Drawer";

interface ChatDetailInfoProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}


const ChatDetailInfo: React.FC<ChatDetailInfoProps> = ({
  isOpen,
  onClose,
  currentConversation,
}) => {
  const { extraDesktopMode } = useGetScreenMode();
  const {
    onOpenDrawer,
    isDrawerOpen,
    closeDrawer,
    menuItems,
    typeDrawer
  } = useChatDetailInfo({ currentConversation });

  const styleDrawerOpen = useMemo(
    () =>
      isOpen
        ? { width: extraDesktopMode ? "424px" : "272px" }
        : { width: 0 },
    [extraDesktopMode, isOpen],
  );

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          top: "50px",
          width: extraDesktopMode ? "424px" : "272px",
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: extraDesktopMode ? "424px" : "272px",
          height: extraDesktopMode ? "948px" : "677px",
          backgroundColor: "var(--Gray0, #F7F7FD)",
          gap: "12px",
        }}
      >
        <ChatDetailInfoHeader onClose={onClose} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Avatar
            src={currentConversation?.avatar}
            sx={{
              height: "80px",
              width: "80px",
              flexShrink: "0",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="h6"
            color="var(--Black, #212121)"
            sx={{ textAlign: "center" }}
          >
            {currentConversation?.name}
          </Typography>
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            alignSelf: "stretch",
            flexDirection: "column",
            padding: "0px 12px",
          }}
        >
          {menuItems.map((item, index) => (
            <ChatDetailInfoMenuItem
              key={index}
              text={item.text}
              icon={item.icon}
              isOpenDrawer={isDrawerOpen}
              currentConversation={currentConversation}
              onOpenDrawer={onOpenDrawer}
              callBackOpenDrawer={item.callback}
            />
          ))}
        </Box>
        {isDrawerOpen ? <DrawerInfoChat isOpen={isDrawerOpen} type={typeDrawer} onClose={closeDrawer} currentConversation={currentConversation} /> : null}
      </Box>
    </Drawer>
  );
};


export default ChatDetailInfo;