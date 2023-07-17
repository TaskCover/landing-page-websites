/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "store/app/selectors";
import { useChat } from "./selectors";

export const useWSChat = () => {
  const { user } = useAuth();
  const { roomId, onSetMessage } = useChat();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const token = user?.["authToken"];

  // Connect websocket
  const connectMessage = () => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.msg === "connected") {
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
          appendMessage(
            data.fields.args[0].msg,
            data.fields.args[0].u.username,
          );
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
  }, []);

  useEffect(() => {
    let openSocketFlag = true;
    connectMessage();
    if (ws) {
      ws.onclose = () => {
        if (openSocketFlag) {
          setTimeout(() => {
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
  }, [roomId, ws]);

  const appendMessage = useCallback(
    (message, sender) => {
      const messageInfoOne = {
        ts: new Date(),
        msg: message,
        u: {
          username: sender,
        },
      };
      onSetMessage(messageInfoOne);
    },
    [onSetMessage],
  );

  const sendMessage = (message: string) => {
    if (message.trim()?.length > 0) {
      ws?.send(
        JSON.stringify({
          msg: "method",
          id: "3",
          method: "sendMessage",
          params: [
            {
              _id: Math.random().toString(36).substr(2, 10),
              rid: roomId,
              msg: message,
            },
          ],
        }),
      );
    }
  };

  return { sendMessage };
};