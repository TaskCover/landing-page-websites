import { Drawer, Box, Typography, Avatar } from "@mui/material";
import ChatDetailInfoHeader from "./ChatDetailInfoHeader";
import AccountProfileIcon from "icons/AccountProfileIcon";
import LinkIcon from "icons/LinkIcon";
import FileIcon from "icons/FileIcon";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";
import { IChatItemInfo } from "store/chat/type";
import MediaFileIcon from "icons/MediaFileIcon";

interface ChatDetailInfoProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

interface MenuItem {
  text: string;
  icon: JSX.ElementType;
  openDrawer: boolean;
}

const menuItems: MenuItem[] = [
  {
    text: "Account infomation",
    icon: AccountProfileIcon,
    openDrawer: true,
  },
  {
    text: "Media file",
    icon: MediaFileIcon,
    openDrawer: false,
  },
  {
    text: "Link",
    icon: LinkIcon,
    openDrawer: false,
  },
  {
    text: "File",
    icon: FileIcon,
    openDrawer: false,
  },
];

const ChatDetailInfo: React.FC<ChatDetailInfoProps> = ({
  isOpen,
  onClose,
  currentConversation,
}) => {
  const styleDrawerOpen = isOpen ? { width: "272px" } : { width: "0" };
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          top: "50px",
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
              openDrawer={item.openDrawer}
              currentConversation={currentConversation}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatDetailInfo;
