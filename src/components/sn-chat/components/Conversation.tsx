import Box from "@mui/material/Box";
import { useEffect, useMemo } from "react";
import { useChat } from "store/chat/selectors";
import Messages from "./Messages";
import { useAuth } from "store/app/selectors";

const Conversation = () => {
  const { roomId, messageInfo, onSetStep, onGetLastMessages } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    onGetLastMessages({ roomId, type: "d" });
  }, [onGetLastMessages, roomId]);

  console.log("user", user?.["username"]);

  return (
    <Box>
      <Messages sessionId={user?.["username"]} initialMessage={messageInfo} />
    </Box>
  );
};

export default Conversation;
