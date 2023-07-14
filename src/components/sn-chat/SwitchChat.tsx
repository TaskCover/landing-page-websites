import { useCallback, useEffect } from "react";
import { useChat } from "store/chat/selectors";
import { STEP } from "store/chat/type";
import ChatList from "./ChatList";
import ConversationLayout from "./components/ConversationLayout";
import Conversation from "./components/Conversation";
import AddGroup from "./AddGroup";
import ChatDetailGroup from "./ChatDetailGroup";

const WrapperChat = () => {
  const { roomId, prevStep, currStep, onSetStep } = useChat();
  useEffect(() => {
    onSetStep(STEP.CONVENTION);
  }, [onSetStep]);

  const renderContent = useCallback(() => {
    switch (currStep) {
      case STEP.CONVENTION:
        return <ChatList />;
      case STEP.CHAT_ONE:
        return (
          <ConversationLayout viewStep={STEP.CHAT_ONE}>
            <Conversation />
          </ConversationLayout>
        );

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
            <>
              <ChatDetailGroup />
            </>
          </ConversationLayout>
        );
      default:
        return <ChatList />;
    }
  }, [currStep]);
  return <>{renderContent()}</>;
};

export default WrapperChat;
