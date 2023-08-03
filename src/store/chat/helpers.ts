import { useCallback, useEffect, useState } from "react";
import { useAuth } from "store/app/selectors";
import { useChat } from "./selectors";
import { MessageBodyRequest } from "./type";
import { sleep } from "utils/index";

export const useWSChat = () => {
  const { user } = useAuth();
  const { roomId, dataTransfer, onSetMessage, onSetLastMessage } = useChat();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const token = user?.["authToken"];

  // Connect websocket
  const connectMessage = () => {
    if (ws) {
      console.log("reConnect message");
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.msg === "connected") {
          console.log("affter recie connected", ws);

          ws.send(
            JSON.stringify({
              msg: "method",
              id: "1",
              method: "login",
              params: [{ resume: token }],
            }),
          );
        }

        if (data.msg === "result" && data.id === "1") {
          ws.send(
            JSON.stringify({
              msg: "sub",
              id: "2",
              name: "stream-room-messages",
              params: [roomId, false],
            }),
          );
        }

        if (
          data.collection === "stream-room-messages" &&
          data.msg === "changed"
        ) {
          appendMessage(data.fields.args[0]);
        }
      };
    }
  };

  const connectSocket = () => {
    if (roomId) {
      const wsClient = new WebSocket(process.env.NEXT_APP_WS_URL || "");

      wsClient.onopen = () => {
        setWs(wsClient);
        wsClient.send(
          JSON.stringify({
            msg: "connect",
            version: "1",
            support: ["1"],
          }),
        );
      };
    }
  };

  useEffect(() => {
    connectSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let openSocketFlag = true;
    connectMessage();
    if (ws) {
      ws.onclose = () => {
        if (openSocketFlag) {
          setTimeout(() => {
            console.log("reConnect");
            connectSocket();
            connectMessage();
          }, 100);
        }
      };
    }

    return () => {
      openSocketFlag = false;
      ws?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, ws, dataTransfer?._id]);

  const appendMessage = useCallback(
    (message) => {
      const newMessage = { ...message, ts: new Date(message?.ts?.["$date"]) };
      onSetMessage(newMessage);
      onSetLastMessage({ roomId, lastMessage: newMessage });
    },
    [onSetMessage, onSetLastMessage, roomId],
  );

  const sendMessage = useCallback(
    (
      message: Omit<
        MessageBodyRequest,
        "sender_userId" | "sender_authToken" | "receiverUsername"
      >,
    ) => {
      if (message.message && message.message.trim()?.length > 0) {
        ws?.send(
          JSON.stringify({
            msg: "method",
            id: "3",
            method: "sendMessage",
            params: [
              {
                _id: Math.random().toString(36).substr(2, 10),
                rid: roomId,
                msg: message.message,
              },
            ],
          }),
        );
      }
    },
    [roomId, ws],
  );

  return { sendMessage };
};
