import { useEffect } from "react";
import { useChat } from "store/chat/selectors";
import Messages from "./Messages";
import { useAuth } from "store/app/selectors";
import { useWSChat } from "store/chat/helpers";
import ChatInput from "../common/ChatInput";
import { STEP } from "store/chat/type";

const Conversation = () => {
  const {
    backFallStep,
    prevStep,
    roomId,
    userPartner,
    convention,
    messageInfo,
    onGetLastMessages,
  } = useChat();
  const { user } = useAuth();
  const { sendMessage } = useWSChat();
  const account = convention?.find((item) => item._id === roomId);

  useEffect(() => {
    console.log("prevStep", backFallStep);

    if (backFallStep !== STEP.VIEW_DETAIL_USER) {
      onGetLastMessages({ roomId, type: "d" });
    }
  }, [roomId, onGetLastMessages]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  return (
    <>
      <Messages
        sessionId={user?.["username"]}
        avatarPartner={userPartner?.avatar ?? account?.avatar ?? undefined}
        initialMessage={messageInfo}
      />
      <ChatInput isLoading={false} onEnterMessage={handleSendMessage} />
    </>
  );
};

export default Conversation;
