import { useCallback, useEffect } from "react";
import { useChat } from "store/chat/selectors";
import { STEP } from "store/chat/type";
import ChatListUser from "./components/chat/ChatList";
import ConversationLayoutUser from "./components/conversation/ConversationLayout";
import UserLanding from "./components/conversation/UserLanding";
import UserInfomation from "./components/conversation/UserInfomation";
import GroupMediaProfile from "./components/conversation/GroupMediaProfile";
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
      case STEP.VIEW_DETAIL_USER:
        return <UserLanding />;
      case STEP.USER_INFO:
        return <UserInfomation />;
      case STEP.MEDIA:
        return <GroupMediaProfile type={STEP.MEDIA} />;
      case STEP.LINK:
        return <GroupMediaProfile type={STEP.LINK} />;
      case STEP.FILE:
        return <GroupMediaProfile type={STEP.FILE} />;
      default:
        return null;
    }
  }, [currStep]);
  return <>{renderContent()}</>;
};

export default SwitchChat;
