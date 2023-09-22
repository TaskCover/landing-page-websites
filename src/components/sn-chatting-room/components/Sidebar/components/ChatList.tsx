import NoData from "components/NoData";
import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "store/app/selectors";
import ChatItemLayout from "components/sn-chat/components/chat/ChatItemLayout";
import { IChatItemInfo } from "store/chat/type";
import { useDeepCompareMemo } from "hooks/useDeepCompare";
import { useWSChat } from "store/chat/helpers";
import useTheme from "hooks/useTheme";
import { useChat } from "store/chat/selectors";

const ChatList = () => {
  const {dataTransfer: currentConversation, convention: conversations, onSetRoomId, onSetDataTransfer, onSetConversationInfo} = useChat()
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  useWSChat();

  const _conversations = useDeepCompareMemo(() => {
    return conversations
      .filter((item) => item.username !== user?.["username"])
      .map((item) => {
        if (item.t !== "d") return item;
        return {
          ...item,
          ...(item?.statuses?.length > 0
            ? {
                status:
                  item.statuses?.[0].username === user?.["username"]
                    ? item.statuses?.[1]?.status
                    : item.statuses?.[0]?.status,
              }
            : {}),
          ...(item?.usernames?.length > 0
            ? {
                username:
                  item.usernames?.[0] === user?.["username"]
                    ? item.usernames?.[1]
                    : item.usernames?.[0],
              }
            : {}),
        };
      });
  }, [conversations, user]);

  const handleClickConversation = (chatInfo: IChatItemInfo) => {
    onSetRoomId(chatInfo._id)
    onSetDataTransfer(chatInfo)
    onSetConversationInfo(chatInfo)
  };

  const renderConversation = (idActive: string) => {
    return _conversations.map((conversation) => (
      <ChatItemLayout
        chatInfo={conversation}
        sessionId={user?.["username"]}
        key={conversation._id}
        onClickConvention={handleClickConversation}
        isActive={idActive === conversation._id || false}
      />
    ));
  };

  const renderConversations = (idActive: string) => {
    if (_conversations.length <= 0) return <NoData />;

    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="90vh"
          sx={{ overflowX: "scroll", bgcolor: isDarkMode ? "var(--mui-palette-grey-50)" : 'white' }}
        >        
            {renderConversation(idActive)}
        </Box>
      </>
    );
  };

  return <>{renderConversations(currentConversation?._id as string)}</>;
};

export default ChatList;
