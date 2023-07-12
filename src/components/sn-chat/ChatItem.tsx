import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { ImageList, Typography } from "@mui/material";
import { ChatItemInfo } from "store/chat/type";
import { useMemo } from "react";

interface ChatItemProp {
  sessionId: string;
  chatInfo: ChatItemInfo;
  onClickConvention: (data: ChatItemInfo) => void;
}
const ChatItem = ({ sessionId, chatInfo, onClickConvention }: ChatItemProp) => {
  const { lastMessage, name, usersCount } = chatInfo;
  const isGroup = usersCount > 1;
  const isCurrentAcc = sessionId === lastMessage?.u.username;
  const nameLastMessage = isCurrentAcc ? "You: " : "";

  const lastMessageRender = useMemo(() => {
    return [nameLastMessage, lastMessage?.msg].join("").trim();
  }, [lastMessage?.msg, nameLastMessage]);
  return (
    <Box
      onClick={() => onClickConvention(chatInfo)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: 1,
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#F7F7FD",
        },
      }}
      p={2}
    >
      {isGroup ? (
        <ImageList sx={{ width: 56, height: 56 }} cols={2} rowHeight={164}>
          <Avatar
            alt="Avatar"
            size={25}
            style={{
              borderRadius: "5px",
            }}
          />
          <Avatar
            alt="Avatar"
            size={25}
            style={{
              borderRadius: "5px",
            }}
          />
          <Avatar
            alt="Avatar"
            size={25}
            style={{
              borderRadius: "5px",
            }}
          />
          {usersCount - 3 > 0 ? (
            <Box
              sx={{
                textAlign: "center",
                borderRadius: "5px",
                backgroundColor: "#3078F1",
                color: "white",
              }}
            >
              <Typography variant="caption">+ {usersCount - 3}</Typography>
            </Box>
          ) : null}
        </ImageList>
      ) : (
        <Avatar
          alt="Avatar"
          size={56}
          style={{
            borderRadius: "10px",
          }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="inherit" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="caption" color="#999999">
          {lastMessageRender}
        </Typography>
      </Box>
      <Typography variant="caption" color="#999999" ml="auto">
        3m
      </Typography>
    </Box>
  );
};

export default ChatItem;
