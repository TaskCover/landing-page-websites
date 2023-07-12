import { useCallback, useEffect } from "react";
import { useChat } from "store/chat/selectors";
import { STEP } from "store/chat/type";
import ChatList from "./ChatList";
import ConversationLayout from "./components/ConversationLayout";
import Conversation from "./components/Conversation";

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
          <ConversationLayout>
            <Conversation />
          </ConversationLayout>
        );

      case STEP.VIEW_DETAIL_USER:
        return (
          <ConversationLayout>
            <Conversation />
          </ConversationLayout>
        );

      default:
        return <ChatList />;
    }
  }, [currStep]);
  return <>{renderContent()}</>;
};

export default WrapperChat;
