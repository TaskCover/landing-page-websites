import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "store/app/selectors";
import { useChat } from "./selectors";
import { MessageBodyRequest, MessageInfo } from "./type";

export const useWSChat = () => {
  const { user } = useAuth();
  const {
    roomId,
    conversationPaging,
    dataTransfer,
    onSetMessage,
    onSetLastMessage,
    onGetAllConvention,
  } = useChat();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const token = user?.["authToken"];
  const userId = user?.["id_rocket"];

  const appendMessage = useCallback(
    (message) => {
      const newMessage = {
        ...message,
        ts: new Date(message?.ts?.["$date"]),
      } as unknown as MessageInfo;
      onSetMessage(newMessage);
      onSetLastMessage({
        roomId,
        lastMessage: newMessage,
        unreadCount: 0,
        unreadsFrom: "",
      });
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

  // Connect message websocket
  const connectMessage = (ws: WebSocket | null) => {
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
          if (roomId) {
            ws.send(
              JSON.stringify({
                msg: "sub",
                id: "2",
                name: "stream-room-messages",
                params: [roomId, false],
              }),
            );
          }

          ws.send(
            JSON.stringify({
              msg: "sub",
              id: "3",
              name: "stream-notify-user",
              params: [`${userId}/notification`, false],
            }),
          );
        }

        if (
          data.collection === "stream-room-messages" &&
          data.msg === "changed"
        ) {
          appendMessage(data.fields.args[0]);
        }

        if (
          data.collection === "stream-notify-user" &&
          data.msg === "changed"
        ) {
          const messageType = data.fields.eventName.split("/")[1];
          if (messageType === "notification") {
            const notificationData = data.fields.args[0];
            const title = notificationData.title;
            const text = notificationData.text;
            const payload = notificationData.payload;
            const roomIdnoti = payload.rid;
            const sender = payload.sender;
            const message = payload.message.msg;

            const lastMessage = {
              _id: roomIdnoti,
              msg: message,
              u: sender,
              ts: new Date(),
            } as MessageInfo;
            if (roomIdnoti !== roomId) {
              onSetLastMessage({
                roomId: roomIdnoti,
                lastMessage,
                unreadCount: 1,
                unreadsFrom: "",
              });
            }
          }
        }
      };
    }
  };

  const connectSocket = () => {
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
    return wsClient;
  };

  useEffect(() => {
    const wsNew = connectSocket();
    connectMessage(wsNew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onclose = (e) => {
        if (
          ws &&
          e.code !== 3001 &&
          (ws.readyState === ws.CLOSING || ws.readyState === ws.CLOSED)
        ) {
          setTimeout(() => {
            console.log("reConnect");
            const wsNew = connectSocket();
            connectMessage(wsNew);
          }, 100);
          // }
        }
      };
    }

    return () => {
      ws?.close(3001, "force closed");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, ws, dataTransfer?._id]);

  const forceCloseSocket = (reason?: string) => {
    if (ws) {
      ws.close(undefined, reason);
    }
  };

  return {
    connectMessage,
    sendMessage,
    forceCloseSocket,
  };
};
