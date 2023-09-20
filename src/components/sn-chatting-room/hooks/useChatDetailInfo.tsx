import AccountProfileIcon from "icons/AccountProfileIcon";
import FileIcon from "icons/FileIcon";
import LinkIcon from "icons/LinkIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useChat } from "store/chat/selectors";
import { IChatItemInfo } from "store/chat/type";

interface MenuItem {
    text: string;
    icon: JSX.ElementType;
    callback: () => void;
    type: string;
  }
  
export enum TypeDrawer {
    account = "account",
    media = "media",
    link = "link",
    file = "file",
    group = 'group'
  }

export interface useChatDetailInfoReturns {
  onOpenDrawer: () => void;
  closeDrawer: () => void;
  isDrawerOpen: boolean;
  menuItems: MenuItem[];
  typeDrawer: "account" | "link" | "media" | "file" | "group";
  onChangeTypeDrawer: (type: string) => void;
}
  
export const useChatDetailInfo = ({
    currentConversation,
  }: {
    currentConversation: IChatItemInfo;
  }): useChatDetailInfoReturns => {
    const { onGetUserInfo, onGetChatAttachments, onGetChatUrls } = useChat();
  
    const [typeDrawer, setTypeDrawer] = useState<keyof typeof TypeDrawer | any>(TypeDrawer.account);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Handler to open the drawer.
  
  
    const onOpenDrawer = () => {
      setIsDrawerOpen(true);
    };
  
    const closeDrawer = () => {
      setIsDrawerOpen(false);
      setTypeDrawer(undefined)
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
          type: 'account'
        },
        {
          text: "Media file",
          icon: MediaFileIcon,
          callback: () => callbackChatAttachment('media'),
          type: 'media'
        },
        {
          text: "Link",
          icon: LinkIcon,
          callback: () =>  callbackChatUrls(),
          type: 'link'
        },
        {
          text: "File",
          icon: FileIcon,
          callback: () =>  callbackChatAttachment('file'),
          type: 'file'
        },
      ],
      [callbackOpenAccount, callbackChatAttachment, callbackChatUrls],
    );
  
    
    const onChangeTypeDrawer = (type: string) => {
      const onCallBackByType = menuItems.find(menuItem => menuItem.type === type)?.callback;
      if(onCallBackByType){
        onCallBackByType()
      }
      setTypeDrawer(type as TypeDrawer)
    }

    useEffect(() => {
      closeDrawer();
    }, [currentConversation])
    
    return {
      onOpenDrawer,
      closeDrawer,
      isDrawerOpen,
      menuItems,
      typeDrawer,
      onChangeTypeDrawer
    };
  };
  