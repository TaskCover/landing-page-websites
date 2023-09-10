import { Drawer, Box } from "@mui/material";
import ChatDetailInfoHeader from "./ChatDetailInfoHeader";
import ChatDetailInfoAvatar from "./ChatDetailInfoAvatar";
// import ChatDetailInfoName from "./ChatDetailInfoName";
import AccountProfileIcon from "icons/AccountProfileIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import LinkIcon from "icons/LinkIcon";
import FileIcon from "icons/FileIcon";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";

interface ChatDetailInfoProps {
  isOpen: boolean;
  onClose: () => void;
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
    icon: <MediaFileIcon />,
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
            <ChatDetailInfoMenuItem key={index} text={item.text} icon={item.icon} />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatDetailInfo;
