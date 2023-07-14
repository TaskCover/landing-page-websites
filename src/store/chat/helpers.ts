/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import WebSocket from "ws";

const authToken = "RoqccyqkxXUWBlm02YdpQyKToXyz6ykuN4rDZAsA3gy";
const userId = "wcdRs6zKbnxWGsoEY";
const roomId = "64afae790ca17fe87a637d56";
// Connect websocket
const socket = new WebSocket(process.env.NEXT_APP_WS_URL || "");

export const useWSChat = ({ authToken, userId, roomId }: any) => {
  useEffect(() => {
    socket.onopen = function () {
      socket.send(
        JSON.stringify({
          msg: "connect",
          version: "1",
          support: ["1"],
        }),
      );
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.msg === "connected") {
        socket.send(
          JSON.stringify({
            msg: "method",
            id: "1",
            method: "login",
            params: [{ resume: authToken }],
          }),
        );
      }

      if (data.msg === "result" && data.id === "1") {
        socket.send(
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
        appendMessage(data.fields.args[0].msg, data.fields.args[0].u.username);
      }
    };

    socket.onclose = () => console.log("ws closed");
    return () => {
      socket.close();
    };
  }, []);

  const appendMessage = (message, sender) => {
    // const chatWindow = document.getElementById('chatWindow');
    // const messageNode = document.createTextNode(`${sender}: ${message}`);
    // const lineBreak = document.createElement('br');
    // chatWindow.appendChild(messageNode);
    // chatWindow.appendChild(lineBreak);
    // chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const sendMessage = () => {
    const input = document.getElementById("inputMessage");
    // const message = input.value;

    socket.send(
      JSON.stringify({
        msg: "method",
        id: "3",
        method: "sendMessage",
        params: [
          {
            _id: Math.random().toString(36).substr(2, 10),
            rid: roomId,
            //   msg: message
          },
        ],
      }),
    );

    // input.value = '';
    // appendMessage(message, 'You');
  };
};
