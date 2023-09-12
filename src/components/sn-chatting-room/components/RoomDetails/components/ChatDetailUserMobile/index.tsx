import { Avatar, Box, Typography } from "@mui/material";
import ChatDetailUserHeaderMobile from "./ChatDetailUserHeaderMobile";
import { IChatItemInfo } from "store/chat/type";
import AccountProfileIcon from "icons/AccountProfileIcon";
import SearchIcon from "icons/SearchIcon";
import ChatDetailUserMenuItemMobile from "./ChatDetailUserMenuItemMobile";
import MediaFileIcon from "icons/MediaFileIcon";
import CreateGroupChatIcon from "icons/CreateGroupChatIcon";
import DeleteChatIcon from "icons/DeleteChatIcon";

interface ChatDetailUserMobileProps {
  currentConversation: IChatItemInfo;
}

interface MenuItem {
  text: string;
  icon: JSX.ElementType;
  stroke: string;
  borderBottom?: boolean;
}

const ChatDetailUserMobile = (currentConversation) => {
  const menuItems: MenuItem[] = [
    {
      text: "Account infomation",
      icon: AccountProfileIcon,
      stroke: "#3699FF",
      borderBottom: true,
    },
    {
      text: `Create a chat group with ${currentConversation?.name}`,
      icon: CreateGroupChatIcon,
      stroke: "#3699FF",
      borderBottom: true,
    },
    {
      text: "Media files, files and links",
      icon: MediaFileIcon,
      stroke: "#1BC5BD",
      borderBottom: true,
    },
    {
      text: "Search in conversation",
      icon: SearchIcon,
      stroke: "#999999",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <ChatDetailUserHeaderMobile />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "18px",
        }}
      >
        <Avatar
          src={currentConversation?.avatar}
          sx={{
            height: "80px",
            width: "80px",
            flexShrink: "0",
            borderRadius: "50%",
          }}
        />
        <Box>
          <Typography
            variant="h6"
            color="var(--Black, #212121)"
            sx={{ textAlign: "center" }}
          >
            {currentConversation?.name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "12px 24px",
            marginX: "16px",
            gap: "8px",
            borderRadius: "16px",
            backgroundColor: "#F7F7FD",
          }}
        >
          {menuItems.map((item, index) => (
            <ChatDetailUserMenuItemMobile
              key={index}
              text={item.text}
              icon={item.icon}
              stroke={item.stroke}
              borderBottom={item.borderBottom}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "12px 24px",
            marginX: "16px",
            gap: "8px",
            borderRadius: "16px",
            backgroundColor: "#F7F7FD",
          }}
        >
          <ChatDetailUserMenuItemMobile
            text="Delete chat"
            icon={DeleteChatIcon}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatDetailUserMobile;
