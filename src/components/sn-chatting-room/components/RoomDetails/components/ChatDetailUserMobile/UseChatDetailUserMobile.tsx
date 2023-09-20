import AccountProfileIcon from "icons/AccountProfileIcon";
import CreateGroupChatIcon from "icons/CreateGroupChatIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import SearchIcon from "icons/SearchIcon";
import { useCallback, useState } from "react";
import { useChat } from "store/chat/selectors";
import { IChatItemInfo } from "store/chat/type";

interface MenuItem {
  text: string;
  icon: JSX.ElementType;
  stroke: string;
  borderBottom?: boolean;
  handleOnClick?: () => void;
}

export const useChatDetailUserMobile = ({
  currentConversation,
}: {
  currentConversation: IChatItemInfo;
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

  return {
    menuItems,
    accountInfoShow,
    searchConversationShow,
    handleCloseAccountInfoMobile,
    handleSearchConversation,
  };
};
