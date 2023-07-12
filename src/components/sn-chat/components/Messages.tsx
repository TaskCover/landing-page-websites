import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MessageInfo } from "store/chat/type";
import { formatDate } from "utils/index";

interface MessagesProps {
  sessionId: string;
  initialMessage: MessageInfo[];
}

const Messages = ({ sessionId, initialMessage: messages }: MessagesProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        flexDirection: "column",
        height: "100%",
        padding: "1rem",
      }}
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.u.username === sessionId;
        const hasNextMessageFromSameUser =
          messages[index + 1]?.u.username === messages[index].u.username;

        return (
          <Box
            key={index}
            sx={{
              width: "fit-content",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
              ...(isCurrentUser ? { marginLeft: "auto" } : null),
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "flex-end",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                backgroundColor: isCurrentUser ? "#EBF5FF" : "#F7F7FD",
              }}
              order={2}
            >
              <Typography
                sx={{
                  overflowWrap: "anywhere",
                  color: isCurrentUser ? "#3699FF" : "inherit",
                }}
              >
                {message.msg}
              </Typography>
              <Typography variant="caption" color="#999999">
                {formatDate(message.ts, "HH:mm")}
              </Typography>
            </Box>
            <Box
              order={isCurrentUser ? "2" : "1"}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <Image
                src={isCurrentUser ? sessionImg : chatPartner.image}
                alt={""}
                width={20}
                height={20}
                style={{
                  borderRadius: "50%",
                  visibility: hasNextMessageFromSameUser ? "hidden" : "visible",
                }}
              /> */}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
