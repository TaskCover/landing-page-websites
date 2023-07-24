import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MessageInfo } from "store/chat/type";
import { formatDate } from "utils/index";
import Linkify from "linkify-react";
import AttachmentContent from "../conversation/AttachmentContent";
import { useEffect, useRef } from "react";

interface MessageContentProps {
  message: MessageInfo;
  isCurrentUser: boolean;
}
const MessageContent = ({ message, isCurrentUser }: MessageContentProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  if (message.msg) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "flex-end",
          padding: "0.5rem 1rem",
          borderRadius: "10px",
          backgroundColor: isCurrentUser ? "#EBF5FF" : "#F7F7FD",
          maxWidth: "270px",
        }}
        order={2}
      >
        <Typography
          sx={{
            overflowWrap: "anywhere",
            color: isCurrentUser ? "#3699FF" : "inherit",
            "& a": {
              textDecoration: "underline",
              color: "unset",
            },
          }}
        >
          <Linkify
            options={{
              target: "_blank",
            }}
          >
            <Box
              sx={{
                "& p": {
                  display: "initial",
                },
              }}
              dangerouslySetInnerHTML={{ __html: message.msg }}
            />
          </Linkify>
        </Typography>
        <Typography variant="caption" color="#999999">
          {formatDate(message.ts, "HH:mm")}
        </Typography>
      </Box>
    );
  } else if (message.attachments?.length > 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          alignItems: "flex-end",
          borderRadius: "10px",
        }}
        order={2}
      >
        <AttachmentContent
          message={message}
          attachmentProps={{
            sx: {
              justifyContent: isCurrentUser ? "flex-end" : "flex-start",
            },
          }}
        />
      </Box>
    );
  }

  return null;
};

export default MessageContent;
