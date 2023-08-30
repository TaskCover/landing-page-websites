import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import {
  MediaPreviewItem,
  MessageInfo,
  UnReadMessageInfo,
  UnreadUserInfo,
} from "store/chat/type";
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
  time: string | Date;
  isRead: boolean;
  isCurrentUser: boolean;
  timeMessageProps?: TypographyProps;
}) => {
  const { sx, ...props } = timeMessageProps || {};

  const getTimeStamp = useMemo(() => {
    const date = new Date(time);
    const lastHours = date.getHours();
    let half = "AM";
    if (lastHours === undefined) {
      return "";
    }
    if (lastHours > 12) {
      date.setHours(lastHours - 12);
      half = "PM";
    }
    if (lastHours === 0) date.setHours(12);
    if (lastHours === 12) half = "PM";
    return `${formatDate(date, "HH:mm")}${half}`;
  }, [time]);
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
      {getTimeStamp}
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
  isGroup: boolean;
  unReadMessage: UnreadUserInfo[];
}
const MessageContent = ({
  message,
  mediaListPreview,
  isCurrentUser,
  isGroup,
  unReadMessage,
}: MessageContentProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  const isUnReadCheck = unReadMessage.some((item) => item.unreadCount === 0);
  const isReadMessage = useMemo(() => {
    const timeMessage = new Date(message.ts);
    if (isGroup) {
      return isUnReadCheck;
    } else {
      const timeRead = new Date(unReadMessage?.[0]?.unreadsFrom || "");
      return unReadMessage?.[0]?.unreadsFrom
        ? timeMessage.getTime() < timeRead.getTime()
        : false;
    }
  }, [isGroup, isUnReadCheck, message.ts, unReadMessage]);

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
            marginRight: isCurrentUser ? "unset" : "auto",
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
          isRead={isReadMessage}
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
          isRead={isReadMessage}
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
