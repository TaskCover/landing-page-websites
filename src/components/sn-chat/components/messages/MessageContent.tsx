import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { MediaPreviewItem, MessageInfo, UnreadUserInfo } from "store/chat/type";
import { formatDate } from "utils/index";
import Linkify from "linkify-react";
import linkifyHtml from "linkify-html";
import AttachmentContent from "../conversation/AttachmentContent";
import { useEffect, useMemo, useRef } from "react";
import ReadedIcon from "icons/ReadedIcon";
import UnReadIcon from "icons/UnReadIcon";
import hljs from "highlight.js";
import useTheme from "hooks/useTheme";
import { useChat } from "store/chat/selectors";

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
  const {listSearchMessage} = useChat();

  const isUnReadCheck = unReadMessage.some((item) => item.unreadCount === 0);
  const {isDarkMode} = useTheme();
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
      // const parser = new DOMParser();
      // const html = parser.parseFromString(message.msg, "text/html");
      // const body = html.body;
      // const isCodeBlock = message.msg.indexOf("<pre");

      // console.log(message.msg, isCodeBlock > -1);
      // if (isCodeBlock > -1) {
      //   for (let i = 0; i < body.children.length; i++) {
      //     const element = body.children[i];
      //     if (element.getElementsByClassName("ql-syntax") != undefined) {
      //       const content = hljs.highlightAuto(element.textContent || "", [
      //         "javascript",
      //         "html",
      //       ]).value;
      //       element.innerHTML = content;
      //     }
      //   }
      //   textRef.current.innerHTML = body.innerHTML;
      // } else {
      //   textRef.current.innerHTML = linkifyHtml(message.msg, {
      //     target: "_blank",
      //   });
      // }
      textRef.current.innerHTML = linkifyHtml(message.msg, {
        target: "_blank",
      });
    }
  }, [message]);

  const renderBackgroundColor = useMemo(() => {
    if(listSearchMessage.map(item => item.messageId).includes(message._id)) {
      return isDarkMode ? "#F7F7FD" : "#3a3b3c" ;
    }
    if(isCurrentUser) {
      if(isDarkMode) return '#333333';
      return "#EBF5FF"
    }
    return isDarkMode ? "#3a3b3c" : "#F7F7FD";
  }, [isCurrentUser, isDarkMode, listSearchMessage, message._id]);

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
          backgroundColor: renderBackgroundColor,
          maxWidth: "270px",
        }}
        order={2}
      >
        <Typography
          component="div"
          sx={{
            maxWidth: "calc(270px - 32px)",
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
                  // whiteSpace: "pre-wrap",
                  overflow: "auto",
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
