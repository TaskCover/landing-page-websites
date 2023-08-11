"use client";

import Box from "@mui/material/Box";
import ChatEditor from "./ChatEditor";
import { memo } from "react";

interface ChatInputProps {
  isLoading: boolean;
  initalMessage?: string;
  files?: File[];
  onEnterMessage: (message: string) => void;
  onChangeFiles?: (file: File[]) => void;
}
const ChatInput = ({
  isLoading,
  initalMessage,
  files,
  onEnterMessage,
  onChangeFiles,
}: ChatInputProps) => {
  return (
    <Box
      sx={{
        width: "100%",
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
          isLoading={isLoading}
          initalValue={initalMessage}
          files={files}
          onEnterText={onEnterMessage}
          onChangeFiles={onChangeFiles}
        />
      </Box>
    </Box>
  );
};

export default memo(ChatInput);
