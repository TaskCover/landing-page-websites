"use client";

import Box from "@mui/material/Box";
import TextareaAutosize from "react-textarea-autosize";
import { useMemo, useRef, useState } from "react";
import Button from "@mui/material/Button";

interface ChatInputProps {
  chatPartner: unknown;
  chatId: string;
}
const ChatInput = ({ chatPartner, chatId }: ChatInputProps) => {
  const [chatText, setChatText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    console.log("123");
  };
  return (
    <Box
      mt="auto"
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          margin: "1rem",
          padding: "0.5rem",
          borderRadius: "5px",
          position: "relative",
          outline: "1px solid #e1e1e1",
          border: "1px solid transparent",
          ":focus-within": {
            border: "1px solid #939393",
          },
        }}
      >
        <TextareaAutosize
          ref={textareaRef}
          // placeholder={`Message ${chatPartner.name}`}
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
        />
        <Box
          sx={{
            width: "100%",
            height: "4rem",
          }}
          onClick={(e) => textareaRef.current?.focus()}
        ></Box>
        <Button
          size="small"
          onClick={sendMessage}
          disabled={isLoading}
          variant="contained"
          sx={{
            position: "absolute",
            right: "0.3rem",
            bottom: "0.3rem",
          }}
        >
          {isLoading ? <span>Loading...</span> : <span>Post</span>}
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInput;
