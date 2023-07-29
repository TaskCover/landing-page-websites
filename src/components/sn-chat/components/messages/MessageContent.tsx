import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MessageInfo } from "store/chat/type";
import { formatDate } from "utils/index";
import Linkify from "linkify-react";
import linkifyHtml from "linkify-html";
import AttachmentContent from "../conversation/AttachmentContent";
import { useEffect, useRef } from "react";

interface MessageContentProps {
  message: MessageInfo;
  isCurrentUser: boolean;
}
const MessageContent = ({ message, isCurrentUser }: MessageContentProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message.msg && textRef.current) {
      textRef.current.innerHTML = linkifyHtml(message.msg, {
        target: "_blank",
      });
    }
  }, [message]);

  if (message.msg) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "flex-end",
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          backgroundColor: isCurrentUser ? "#EBF5FF" : "#F7F7FD",
          maxWidth: "270px",
        }}
        order={2}
      >
        <Typography
          component="div"
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
              ref={textRef}
              sx={{
                "& pre": {
                  whiteSpace: "pre-wrap",
                },
                "& *": {
                  margin: "0",
                },
                // "& p": {
                //   display: "initial",
                // },
              }}
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
