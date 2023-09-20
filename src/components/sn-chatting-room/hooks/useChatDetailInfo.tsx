import AccountProfileIcon from "icons/AccountProfileIcon";
import FileBasicIcon from "icons/FileBasicIcon";
import LinkIcon from "icons/LinkIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useChat } from "store/chat/selectors";
import { IChatItemInfo, RoomType } from "store/chat/type";

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
  typeDrawer: "account" | "link" | "media" | "file" | "group" | "forward";
  onChangeTypeDrawer: (type: string) => void;
  onSelectRoom: any
}
  
export const useChatDetailInfo = ({
    currentConversation,
    onSelectRoom
  }: {
    currentConversation: IChatItemInfo;
    onSelectRoom: any
  }): useChatDetailInfoReturns => {
    const { onGetUserInfo, onGetChatAttachments, onGetChatUrls, onGetAllConvention, conversationPaging} = useChat();
  
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
      if(!currentConversation) return;
      onGetChatAttachments({
        roomId: currentConversation?._id,
        roomType: currentConversation?.t  as RoomType || 'd',
        fileType,
      });
      setTypeDrawer(fileType)
    }, [currentConversation]);
  
    const callbackChatUrls = useCallback(() => {
      if(!currentConversation?.t || !currentConversation?._id) return;
      if(currentConversation)  onGetChatUrls({ roomId: currentConversation?._id, type: currentConversation?.t});
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
          icon: FileBasicIcon,
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
    
    const onSelectedRom = (value) => {      
      if(onSelectRoom){
        onSelectRoom(value)
      }
    }

    return {
      onOpenDrawer,
      closeDrawer,
      isDrawerOpen,
      menuItems,
      typeDrawer,
      onChangeTypeDrawer,
      onSelectRoom: onSelectedRom,
    };
  };
  