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
      case STEP.VIEW_DETAIL_USER:
        return <UserLanding />;
      case STEP.MEDIA:
        return <GroupMediaProfile type={STEP.MEDIA} />;
      case STEP.LINK:
        return <GroupMediaProfile type={STEP.LINK} />;
      case STEP.FILE:
        return <GroupMediaProfile type={STEP.FILE} />;
      case STEP.ADD_GROUP:
        return <AddGroup />;
      case STEP.VIEW_DETAIL_USER:
        return (
          <ConversationLayout>
            <Conversation />
          </ConversationLayout>
        );
      case STEP.ADD_GROUP:
        return <AddGroup />;
      case STEP.CHAT_DETAIL_GROUP:
        return (
          <ConversationLayout viewStep={STEP.CHAT_DETAIL_GROUP}>
            <ChatDetailGroup />
          </ConversationLayout>
        );
      case STEP.LIST:
        return (
          <ConversationLayout viewStep={STEP.LIST}>
            <List />
          </ConversationLayout>
        );
      case STEP.CHAT_FORWARD:
        return (
          <ConversationLayout viewStep={STEP.CHAT_FORWARD}>
            <ChatForward />
          </ConversationLayout>
        );
      case STEP.CHAT_GROUP:
        return (
          <ConversationLayout viewStep={STEP.CHAT_GROUP}>
            <Conversation />
          </ConversationLayout>
        );
      default:
        return null;
    }
  }, [currStep]);
  return <>{renderContent()}</>;
};

export default SwitchChat;
