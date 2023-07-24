import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Typography } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import { useMemo, useState } from "react";

interface ChatItemRenderProps {
  sessionId: string;
  chatInfo: IChatItemInfo;
}
const ChatItemRender = ({ sessionId, chatInfo }: ChatItemRenderProps) => {
  const { lastMessage, name, avatar, t } = chatInfo;
  const [avatarClone, setAvatarClone] = useState<string | undefined>(avatar);
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
      return isCurrentAcc ? `You: ${lastMessage?.msg}` : lastMessage?.msg;
    }
  }, [isCurrentAcc, lastMessage]);

  const switchChat = useMemo(() => {
    return (
      <>
        <Typography variant="inherit" fontWeight="bold">
          {name}
        </Typography>
        <Typography
          variant="caption"
          color="#999999"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
            dangerouslySetInnerHTML={{
              __html: !isMessageNotConnect ? lastMessageContent : "",
            }}
          />
        </Typography>
      </>
    );
  }, [isMessageNotConnect, lastMessageContent, name]);

  return (
    <>
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
        }}
      >
        {switchChat}
      </Box>
    </>
  );
};

export default ChatItemRender;
