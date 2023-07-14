"use client";

import Box from "@mui/material/Box";
import TextareaAutosize from "react-textarea-autosize";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Editor from "components/Editor";
import ChatEditor from "./ChatEditor";

interface ChatInputProps {
  isSendLoading: boolean;
  onChangeInput: (message: string) => void;
}
const ChatInput = ({ isSendLoading, onChangeInput }: ChatInputProps) => {
  const [chatText, setChatText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
    console.log("123");
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "1rem",
      }}
    >
      <Box
        sx={{
          position: "relative",
          outline: "1px solid #e1e1e1",
          display: "initial",
        }}
      >
        <ChatEditor
          value=""
          onChange={() => {
            console.log("123");
          }}
        />
        {/* <TextareaAutosize
          ref={textareaRef}
          placeholder="Type Message..."
          value={chatText}
          rows={1}
          onChange={(e) => setChatText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          style={{
            backgroundColor: "transparent",
            resize: "none",
            color: "black",
            border: "none",
            outline: "unset",
            width: "100%",
            paddingLeft: ".5rem",
            paddingTop: ".5rem",
            display: "block",
            fontFamily: "Roboto,sans-serif",
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default ChatInput;
