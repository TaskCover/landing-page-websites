import AccountProfileIcon from "icons/AccountProfileIcon";
import FileBasicIcon from "icons/FileBasicIcon";
import LinkIcon from "icons/LinkIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import { useCallback, useMemo } from "react";
import { useChat } from "store/chat/selectors";
import { RoomType, TypeDrawerChat } from "store/chat/type";

interface MenuItem {
  text: string;
  icon: JSX.ElementType;
  callback: (username?: string) => void;
  type: TypeDrawerChat;
}

export interface useChatDetailInfoReturns {
  menuItems: MenuItem[];
  onChangeTypeDrawer: (type: string) => void;
}

export const useChatDetailInfo = (): useChatDetailInfoReturns => {
  const {
    onGetUserInfo,
    onGetChatAttachments,
    onGetChatUrls,
    dataTransfer: currentConversation,
  } = useChat();

  console.log(currentConversation.username, "currentConversation");

  const callbackOpenAccount = useCallback(
    (username) => {
      onGetUserInfo(currentConversation?.username);
    },
    [currentConversation, onGetUserInfo],
  );

  const callbackChatAttachment = useCallback(
    (fileType: "link" | "media" | "file") => {
      if (!currentConversation) return;
      onGetChatAttachments({
        roomId: currentConversation?._id,
        roomType: (currentConversation?.t as RoomType) || "d",
        fileType,
      });
    },
    [currentConversation],
  );

  const callbackChatUrls = useCallback(() => {
    if (!currentConversation?.t || !currentConversation?._id) return;
    if (currentConversation)
      onGetChatUrls({
        roomId: currentConversation?._id,
        type: currentConversation?.t,
      });
  }, [currentConversation]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        text: "Account infomation",
        icon: AccountProfileIcon,
        callback: (username) => callbackOpenAccount(username),
        type: "account",
      },
      {
        text: "Media file",
        icon: MediaFileIcon,
        callback: () => callbackChatAttachment("media"),
        type: "media",
      },
      {
        text: "Link",
        icon: LinkIcon,
        callback: () => callbackChatUrls(),
        type: "link",
      },
      {
        text: "File",
        icon: FileBasicIcon,
        callback: () => callbackChatAttachment("file"),
        type: "file",
      },
    ],
    [callbackOpenAccount, callbackChatAttachment, callbackChatUrls],
  );

  const onChangeTypeDrawer = (type: string) => {
    const onCallBackByType = menuItems.find(
      (menuItem) => menuItem.type === type,
    )?.callback;
    if (onCallBackByType) {
      onCallBackByType();
    }
  };

  return {
    menuItems,
    onChangeTypeDrawer,
  };
};
