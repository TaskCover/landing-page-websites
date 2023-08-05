import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Typography } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import { useEffect, useMemo, useRef, useState } from "react";

interface ChatItemRenderProps {
  sessionId: string;
  chatInfo: IChatItemInfo;
}
const ChatItemRender = ({ sessionId, chatInfo }: ChatItemRenderProps) => {
  const { lastMessage, name, avatar, t, unreadCount } = chatInfo || {};
  const [avatarClone, setAvatarClone] = useState<string | undefined>(avatar);
  const isUnReadMessage = useMemo(() => unreadCount > 0, [unreadCount]);
  const isDirectMessage = useMemo(() => t === "d", [t]);
  const isMessageNotConnect = useMemo(() => lastMessage == null, [lastMessage]);
  const isCurrentAcc = useMemo(
    () => sessionId === lastMessage?.u?.username,
    [lastMessage, sessionId],
  );
  const lastMessageContent = useMemo(() => {
    const sendAttachment = lastMessage?.attachments?.length > 0;
    if (sendAttachment) {
      return isCurrentAcc ? "You sent a file." : "Sent a file.";
    } else {
      return isCurrentAcc
        ? `<p>You: ${lastMessage?.msg}</p>`
        : lastMessage?.msg;
    }
  }, [isCurrentAcc, lastMessage]);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageContent && lastMessageRef.current) {
      lastMessageRef.current.innerHTML = !isMessageNotConnect
        ? lastMessageContent
        : "";
    }
  }, [isMessageNotConnect, lastMessageContent]);

  const switchChat = useMemo(() => {
    return (
      <>
        <Typography
          variant="inherit"
          fontWeight={isUnReadMessage ? 700 : 600}
          fontSize="14px"
          lineHeight="18px"
          color="black"
        >
          {name}
        </Typography>
        <Typography
          ref={lastMessageRef}
          variant="caption"
          color="#999999"
          sx={{
            display: "flex",
            "& *": {
              margin: 0,
              padding: 0,
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: "normal",
              pointerEvents: "none",
              ...(isUnReadMessage && {
                fontWeight: 700,
                color: "black",
              }),
            },
            "& p": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              ...(isCurrentAcc && {
                "&:nth-of-type(1)": {
                  overflowWrap: "unset",
                  overflow: "initial",
                  marginRight: "0.3rem",
                },
              }),
            },
            "& a": {
              color: "#999999",
            },
            "& ol": {
              marginLeft: "1rem",
              display: "flex",
              gap: "1rem",
            },
            "& pre": {
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          }}
          fontWeight={isUnReadMessage ? "900" : "normal"}
        />
      </>
    );
  }, [isCurrentAcc, isUnReadMessage, name]);

  return (
    <>
      <Box
        display={isUnReadMessage ? "block" : "none"}
        sx={{
          position: "absolute",
          left: "5px",
          top: "50%",
          width: "8px",
          height: "8px",
          backgroundColor: "#3699FF",
          borderRadius: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <Box
        position="relative"
        sx={{
          "&::before": {
            content: `''`,
            position: "absolute",
            right: "-5px",
            top: "-2px",
            width: "17px",
            height: "17px",
            border: "2px solid #ffffff",
            backgroundColor: "#55C000",
            borderRadius: "50%",
            visibility:
              isDirectMessage &&
              isMessageNotConnect &&
              chatInfo?.status === "online"
                ? "visible"
                : "hidden",
          },
        }}
      >
        <Avatar
          alt="Avatar"
          size={56}
          src={avatarClone}
          style={{
            borderRadius: "10px",
          }}
          onError={() => setAvatarClone(undefined)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          gap: ".3rem",
        }}
      >
        {switchChat}
      </Box>
    </>
  );
};

export default ChatItemRender;
