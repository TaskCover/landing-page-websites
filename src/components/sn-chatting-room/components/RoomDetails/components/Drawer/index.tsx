import AccountInfo from "./AccountInfo";
import StorageInfo from "./StorageInfo";
import AddGroup from "components/sn-chat/chatGroup/AddGroup";
import { useCallback, useMemo } from "react";
import ChatForward from "components/sn-chat/ChatForward";
import MenuInfo from "./MenuInfo";
import { useChat } from "store/chat/selectors";
import ArrowDownIcon from "icons/ArrowDownIcon";
import { IChatItemInfo, STEP } from "store/chat/type";
import ConversationLayout from "components/sn-chat/components/ConversationLayout";
import Conversation from "components/sn-chat/components/conversation/Conversation";
import SearchChatText from "components/sn-chat/chatGroup/SearchChatText";
import ChatDetailGroup from "../ChatDetailInfo/ChatDetailGroup";
import { List } from "@mui/icons-material";
import ForwardHeader from "./ChatForward/ForwarHeader";
import ForwardLayout from "./ChatForward/ForwardLayout";

const DrawerInfoChat = () => {
  const {
    typeDrawerChat,
    onSetDrawerType,
    onSetConversationInfo,
    convention,
    roomId,
    currStep,
  } = useChat();

  const DrawerObjs = useMemo(
    () => ({
      info: <MenuInfo />,
      group: (
        <AddGroup
          callbackBackIcon={() => onSetDrawerType("info")}
          onSelectNewGroup={(value) => onSetConversationInfo(value)}
          CustomCallBackIcon={<ArrowDownIcon sx={{ fontSize: "2rem" }} />}
        />
      ),
      account: <AccountInfo />,
      forward: (
        <ForwardLayout viewStep={STEP.CHAT_FORWARD}>
          <ChatForward callbackCancel={() => onSetDrawerType("info")} />
        </ForwardLayout>
      ),
    }),

    [onSetDrawerType, onSetConversationInfo],
  );

  return DrawerObjs[typeDrawerChat] || <StorageInfo />;
};

export default DrawerInfoChat;
