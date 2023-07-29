import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import { renderTimeDiff } from "components/sn-chat/utils";
import { DataStatus } from "constant/enums";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "store/app/selectors";
import { useChat } from "store/chat/selectors";
import { MessageSearchInfo, RoomType } from "store/chat/type";

interface MesageListSearchProps {
  text: string;
  type: RoomType;
  messageItemProps?: BoxProps;
  onSelectMessage: (message: MessageSearchInfo) => void;
}

const MessageItemRender = ({
  text,
  message,
}: {
  text: string;
  message: MessageSearchInfo;
}) => {
  const { user } = useAuth();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [avatarClone, setAvatarClone] = useState<string | undefined>(
    message.avatar,
  );
  const isCurrentAcc = useMemo(
    () => user?.["id_rocket"] === message.userId,
    [message, user],
  );

  const messageMatched = useMemo(
    () =>
      isCurrentAcc ? `<p>You: ${message.matchedText}</p>` : message.matchedText,
    [isCurrentAcc, message],
  );

  useEffect(() => {
    if (lastMessageRef.current) {
      const messageHighlight = messageMatched.replace(
        text,
        `<mark>${text}</mark>`,
      );
      lastMessageRef.current.innerHTML = messageHighlight;
    }
  }, [message, messageMatched, text]);
  return (
    <>
      <Box position="relative">
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
        <>
          <Typography variant="inherit" fontWeight="bold">
            {message.fullname}
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
              },
              "& p": {
                overflowWrap: "anywhere",
                ...(isCurrentAcc && {
                  "&:nth-of-type(1)": {
                    overflowWrap: "unset",
                    marginRight: "0.3rem",
                  },
                }),
              },
              "& mark": {
                display: "inline",
              },
              "& ol": {
                marginLeft: "1rem",
              },
              "& pre": {
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              },
            }}
          />
        </>
      </Box>
    </>
  );
};

const MessageListSearch = ({
  text,
  messageItemProps,
  onSelectMessage,
}: MesageListSearchProps) => {
  const { sx, ...props } = messageItemProps || {};
  const {
    listSearchMessage,
    statusListSearchMessage,
    stateSearchMessage,
    onSetStateSearchMessage,
  } = useChat();

  const handleShowConversation = (message: MessageSearchInfo) => {
    if (
      !stateSearchMessage ||
      stateSearchMessage.messageId !== message.messageId
    ) {
      onSetStateSearchMessage(message);
    }
    onSelectMessage(message);
  };

  return (
    <>
      {statusListSearchMessage === DataStatus.LOADING ||
      statusListSearchMessage === DataStatus.FAILED ? (
        <Typography textAlign="center" mt={3}>
          Loading...
        </Typography>
      ) : (
        listSearchMessage.length > 0 &&
        listSearchMessage.map((message, index) => {
          return (
            <Box
              key={index}
              onClick={() => handleShowConversation(message)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: 1,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#F7F7FD",
                },
                ...sx,
              }}
              p={2}
              {...props}
            >
              <MessageItemRender text={text} message={message} />
              <Typography variant="caption" color="#999999" ml="auto">
                {renderTimeDiff(message?.ts)}
              </Typography>
            </Box>
          );
        })
      )}
    </>
  );
};

export default MessageListSearch;