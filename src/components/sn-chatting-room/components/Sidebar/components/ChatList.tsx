import NoData from "components/NoData";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useAuth } from "store/app/selectors";
import ChatItemLayout from "components/sn-chat/components/chat/ChatItemLayout";
import { IChatItemInfo } from "store/chat/type";
import { useDeepCompareMemo } from "hooks/useDeepCompare";

const ChatList = ({ onSelectRoom, idActive }) => {
  const { conversations } = useChattingActions();
  const { user } = useAuth();

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
    onSelectRoom(chatInfo?._id);
  };

  const renderConversation = (idActive: string) => {
    console.log(idActive, 'idActive');
    
    return conversations.map((conversation) => (
      <ChatItemLayout
        chatInfo={conversation}
        sessionId={user?.["username"]}
        key={conversation._id}
        onClickConvention={handleClickConversation}
        isActive={idActive === conversation._id || false}
      />
    ));
  }

  const renderConversations = (idActive: string) => {
    if (conversations.length <= 0) return <NoData />;

    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="90vh"
          sx={{ overflowX: "scroll" }}
        >
          {renderConversation(idActive)}
        </Box>
      </>
    );
  };

  return <>{renderConversations(idActive)}</>;
};

export default ChatList;
