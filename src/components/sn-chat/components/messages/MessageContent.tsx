import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { MediaPreviewItem, MessageInfo, UnReadMessageInfo } from "store/chat/type";
import { formatDate } from "utils/index";
import Linkify from "linkify-react";
import linkifyHtml from "linkify-html";
import AttachmentContent from "../conversation/AttachmentContent";
import { useEffect, useMemo, useRef } from "react";
import ReadedIcon from "icons/ReadedIcon";
import UnReadIcon from "icons/UnReadIcon";

export const TimeMessage = ({
  time,
  isRead,
  isCurrentUser,
  timeMessageProps,
}: {
  time: string;
  isRead: boolean;
  isCurrentUser: boolean;
  timeMessageProps?: TypographyProps;
}) => {
  const { sx, ...props } = timeMessageProps || {};
  return (
    <Typography
      variant="caption"
      color="#999999"
      display="flex"
      alignItems="center"
      gap=".5rem"
      sx={sx}
      {...props}
    >
      {formatDate(time, "HH:mm")}
      {isCurrentUser &&
        (isRead ? (
          <ReadedIcon sx={{ fontSize: "14px" }} />
        ) : (
          <UnReadIcon sx={{ fontSize: "14px" }} />
        ))}
    </Typography>
  );
};
interface MessageContentProps {
  message: MessageInfo;
  mediaListPreview: MediaPreviewItem[];
  isCurrentUser: boolean;
  unReadMessage: UnReadMessageInfo | null;
}
const MessageContent = ({
  message,
  mediaListPreview,
  isCurrentUser,
  unReadMessage,
}: MessageContentProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isRead = useMemo(() => {
    const timeMessage = new Date(message.ts);
    const timeRead = new Date(unReadMessage?.unreadsFrom || "");
    if (unReadMessage?.unreadsFrom) {
      return timeMessage.getTime() < timeRead.getTime();
    }
    return true;
  }, [message.ts, unReadMessage]);

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
              }}
            />
          </Linkify>
        </Typography>
        <TimeMessage
          isCurrentUser={isCurrentUser}
          isRead={isRead}
          time={message.ts}
        />
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
          isCurrentUser={isCurrentUser}
          isRead={isRead}
          mediaListPreview={mediaListPreview}
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
