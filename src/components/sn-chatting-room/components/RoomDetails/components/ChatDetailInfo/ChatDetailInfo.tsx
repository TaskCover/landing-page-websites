import { Drawer, Box } from "@mui/material";
import ChatDetailInfoHeader from "./ChatDetailInfoHeader";
import ChatDetailInfoAvatar from "./ChatDetailInfoAvatar";
import ChatDetailInfoName from "./ChatDetailInfoName";
import ChatDetailInfoMenu from "./ChatDetailInfoMenu";

interface ChatDetailInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDetailInfo: React.FC<ChatDetailInfoProps> = ({ isOpen, onClose }) => {
  const styleDrawerOpen = isOpen ? { display: "block" } : { display: "none" };

  return (
    <Drawer
      sx={{
        width: "272px",
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          width: "272px",
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
          width: "272px",
          height: "677px",
          backgroundColor: "var(--Gray0, #F7F7FD)",
          gap: "12px",
        }}
      >
        <ChatDetailInfoHeader onClose={onClose} />
        <ChatDetailInfoAvatar />
        <ChatDetailInfoName />
        <ChatDetailInfoMenu />
      </Box>
    </Drawer>
  );
};

export default ChatDetailInfo;
