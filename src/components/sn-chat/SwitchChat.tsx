import { useCallback, useEffect } from "react";
import { useChat } from "store/chat/selectors";
import { STEP } from "store/chat/type";
import ChatListUser from "./components/chat/ChatList";
import ConversationLayoutUser from "./components/conversation/ConversationLayout";
import UserLanding from "./components/conversation/UserLanding";
import GroupMediaProfile from "./components/conversation/GroupMediaProfile";
import ConversationLayout from "./components/ConversationLayout";
import AddGroup from "./chatGroup/AddGroup";
import ChatDetailGroup from "./chatGroup/ChatDetailGroup";
import List from "./chatGroup/list/List";
import ChatForward from "./ChatForward";
import Conversation from "./components/conversation/Conversation";

const SwitchChat = () => {
  const { currStep, onSetStep } = useChat();
  useEffect(() => {
    onSetStep(STEP.CONVENTION);

    return () => {
      onSetStep(STEP.IDLE);
    };
  }, [onSetStep]);

  const renderContent = useCallback(() => {
    switch (currStep) {
      case STEP.CONVENTION:
        return <ChatListUser />;
      case STEP.CHAT_ONE:
        return <ConversationLayoutUser />;
      default:
        return null;
    }
  }, [currStep]);
  return <>{renderContent()}</>;
};

export default SwitchChat;
