import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { useChat } from "store/chat/selectors";
import Messages from "./Messages";
import { useAuth } from "store/app/selectors";
import ChatInput from "./ChatInput";

const Conversation = () => {
  const { roomId, messageInfo, onSetStep, onGetLastMessages } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    onGetLastMessages({ roomId, type: "d" });
  }, [onGetLastMessages, roomId]);

  console.log("user", user?.["username"]);

  return (
    <>
      <Messages sessionId={user?.["username"]} initialMessage={messageInfo} />
      <ChatInput
        isSendLoading={false}
        onChangeInput={(message) => {
          console.log(message);
        }}
      />
    </>
  );
};

export default Conversation;
