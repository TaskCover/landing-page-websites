import { Drawer, Box, Typography, Avatar } from "@mui/material";
import ChatDetailInfoHeader from "./ChatDetailInfoHeader";
// import ChatDetailInfoName from "./ChatDetailInfoName";
import AccountProfileIcon from "icons/AccountProfileIcon";
import LinkIcon from "icons/LinkIcon";
import FileIcon from "icons/FileIcon";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";
import MediaFileChatIcon from "icons/MediaFileChatIcon";
import { IChatItemInfo } from "store/chat/type";

interface ChatDetailInfoProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

interface MenuItem {
  text: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    text: "Account infomation",
    icon: <AccountProfileIcon />,
  },
  {
    text: "Media file",
    icon: <MediaFileChatIcon />,
  },
  {
    text: "Link",
    icon: <LinkIcon />,
  },
  {
    text: "File",
    icon: <FileIcon />,
  },
];

const ChatDetailInfo: React.FC<ChatDetailInfoProps> = ({
  isOpen,
  onClose,
  currentConversation,
}) => {
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
            }} />
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
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatDetailInfo;
