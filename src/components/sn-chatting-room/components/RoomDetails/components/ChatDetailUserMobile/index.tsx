import { Avatar, Box, Drawer, Typography } from "@mui/material";
import ChatDetailUserHeaderMobile from "./ChatDetailUserHeaderMobile";
import { IChatItemInfo } from "store/chat/type";
import AccountProfileIcon from "icons/AccountProfileIcon";
import SearchIcon from "icons/SearchIcon";
import ChatDetailUserMenuItemMobile from "./ChatDetailUserMenuItemMobile";
import MediaFileIcon from "icons/MediaFileIcon";
import CreateGroupChatIcon from "icons/CreateGroupChatIcon";
import DeleteChatIcon from "icons/DeleteChatIcon";
import { useCallback, useState } from "react";
import SearchDetailChatUser from "../SearchDetailChatUser";
import { useChat } from "store/chat/selectors";
import AccountInfoMobile from "../AccountInfoMobile";

interface ChatDetailUserMobileProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
}

interface MenuItem {
  text: string;
  icon: JSX.ElementType;
  stroke: string;
  borderBottom?: boolean;
  handleOnClick?: () => void;
}

const ChatDetailUserMobile: React.FC<ChatDetailUserMobileProps> = ({
  isOpen,
  onClose,
  currentConversation,
}) => {
  const [searchConversationShow, setSearchConversationShow] = useState(false);
  const [accountInfoShow, setAccountInfoShow] = useState(false);
  const { onGetUserInfo } = useChat();

  const handleOpenAccountInfoMobile = useCallback(() => {
    if (currentConversation?.usernames[0]) {
      setAccountInfoShow(true);
      onGetUserInfo(currentConversation?.usernames[0]);
    }
  }, [currentConversation?.usernames]);

  const handleCloseAccountInfoMobile = () => {
    setAccountInfoShow(false);
  };

  const handleSearchConversation = () => {
    setSearchConversationShow(!searchConversationShow);
  };

  const menuItems: MenuItem[] = [
    {
      text: "Account infomation",
      icon: AccountProfileIcon,
      stroke: "#3699FF",
      borderBottom: true,
      handleOnClick: handleOpenAccountInfoMobile,
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
      handleOnClick: handleSearchConversation,
    },
  ];
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
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          height: "100%",
          gap: "12px",
        }}
      >
        <ChatDetailUserHeaderMobile onClose={onClose} />
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
              variant="h4"
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
                handleOnClick={item.handleOnClick}
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
        <SearchDetailChatUser
          isOpen={searchConversationShow}
          onClose={handleSearchConversation}
          currentConversation={currentConversation}
        />
        <AccountInfoMobile
          isOpen={accountInfoShow}
          onClose={handleCloseAccountInfoMobile}
          currentConversation={currentConversation}
        />
      </Box>
    </Drawer>
  );
};

export default ChatDetailUserMobile;
