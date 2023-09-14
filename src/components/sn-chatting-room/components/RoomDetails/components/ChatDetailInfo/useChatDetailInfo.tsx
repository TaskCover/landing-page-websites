import AccountProfileIcon from "icons/AccountProfileIcon";
import FileIcon from "icons/FileIcon";
import LinkIcon from "icons/LinkIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import { useCallback, useMemo, useState } from "react";
import { useChat } from "store/chat/selectors";
import { IChatItemInfo } from "store/chat/type";

interface MenuItem {
    text: string;
    icon: JSX.ElementType;
    callback: () => void;
  }
  
export enum TypeDrawer {
    account = "account",
    media = "media",
    link = "link",
    file = "file",
  }

  
export const useChatDetailInfo = ({
    currentConversation,
  }: {
    currentConversation: IChatItemInfo;
  }) => {
    const { onGetUserInfo, onGetChatAttachments, onGetChatUrls } = useChat();
  
    const [typeDrawer, setTypeDrawer] = useState<keyof typeof TypeDrawer>(TypeDrawer.account);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Handler to open the drawer.
  
  
    const onOpenDrawer = () => {
      setIsDrawerOpen(true);
    };
  
    const closeDrawer = () => {
      setIsDrawerOpen(false);
    };
  
    const callbackOpenAccount = useCallback(() => {
      onGetUserInfo(currentConversation?.usernames[0]);
      setTypeDrawer(TypeDrawer.account)
    }, [currentConversation]);
  
    const callbackChatAttachment = useCallback((fileType: 'link' | 'media' | 'file') => {
      onGetChatAttachments({
        roomId: currentConversation?._id,
        roomType: "d",
        fileType,
      });
      setTypeDrawer(fileType)
    }, [currentConversation]);
  
    const callbackChatUrls = useCallback((type = 'd') => {
      onGetChatUrls({ roomId: currentConversation?._id, type });
      setTypeDrawer(TypeDrawer.link)
    }, [currentConversation]);
  
    const menuItems: MenuItem[] = useMemo(
      () => [
        {
          text: "Account infomation",
          icon: AccountProfileIcon,
          callback: () => callbackOpenAccount(),
        },
        {
          text: "Media file",
          icon: MediaFileIcon,
          callback: () => callbackChatAttachment('media'),
        },
        {
          text: "Link",
          icon: LinkIcon,
          callback: () =>  callbackChatUrls(),
        },
        {
          text: "File",
          icon: FileIcon,
          callback: () =>  callbackChatAttachment('file'),
        },
      ],
      [callbackOpenAccount, callbackChatAttachment, callbackChatUrls],
    );
  
    return {
      onOpenDrawer,
      closeDrawer,
      isDrawerOpen,
      menuItems,
      typeDrawer
    };
  };
  