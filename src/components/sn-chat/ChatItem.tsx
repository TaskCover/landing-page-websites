import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { ImageList, Typography } from "@mui/material";
import { ChatItemInfo } from "store/chat/type";
import { useCallback, useMemo } from "react";
import { getDaysDiff } from "utils/index";
import { useChat } from "store/chat/selectors";

interface ChatItemProp {
  sessionId: string;
  chatInfo: ChatItemInfo;
  onClickConvention: (data: ChatItemInfo) => void;
}
const ChatItem = ({ sessionId, chatInfo, onClickConvention }: ChatItemProp) => {
  const { userOnlinePage } = useChat();

  const { lastMessage, name, usersCount, usernames, avatar, t } = chatInfo;
  const isGroup = useMemo(() => t !== 'd', [t]);
  const isCurrentAcc = sessionId === lastMessage?.u?.username;
  const nameLastMessage = isCurrentAcc ? "You: " : "";

  const stateOnPage = userOnlinePage?.find(
    (item) => item.username === usernames?.[1],
  )?.status;

  const lastMessageRender = useMemo(() => {
    return [nameLastMessage, lastMessage?.msg].join("").trim();
  }, [lastMessage?.msg, nameLastMessage]);

  const renderTimeDiff = useMemo(() => {
    const timeDiff = getDaysDiff(new Date(), new Date(lastMessage?.ts));
    const timePositive = Math.abs(timeDiff);
    if (timePositive < 60) {
      return timePositive + "m";
    } else if (timePositive < 1440) {
      return (timePositive / 60).toFixed(0) + "h";
    } else if (timePositive < 4320) {
      return (timePositive / 60 / 24).toFixed(0);
    }
  }, [lastMessage?.ts]);

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
      {/* {isGroup ? (
        <ImageList sx={{ width: 56, height: 56 }} cols={2} rowHeight={164}>
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
      )} */}
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
            visibility: stateOnPage === "online" ? "visible" : "hidden",
          },
        }}
      >
        {
          isGroup ? (
            <ImageList sx={{ width: 56, height: 56, margin: 0 }} cols={2} rowHeight={164}>
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
          ): (
              <Avatar
                alt="Avatar"
                size={56}
                src={avatar ?? undefined}
                style={{
                  borderRadius: "10px",
                }}
              />
          )
        }
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="inherit" fontWeight="bold">
          {name ?? usernames[1]}
        </Typography>
        <Typography variant="caption" color="#999999">
          {lastMessageRender}
        </Typography>
      </Box>
      <Typography variant="caption" color="#999999" ml="auto">
        {renderTimeDiff}
      </Typography>
    </Box>
  );
};

export default ChatItem;
