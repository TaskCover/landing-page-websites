import { Avatar, Box, Drawer, IconButton, Typography } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import { useGroupChat } from "./GroupChatMobile/useGroupChat";

interface ChatDetailUserMobileProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

const GroupChatMobile: React.FC<ChatDetailUserMobileProps> = (props) => {
  const styleDrawerOpen = isOpen ? { width: "100%" } : { width: "0" };

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          width: "100%",
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
    ></Drawer>
  );
};

export default GroupChatMobile;
