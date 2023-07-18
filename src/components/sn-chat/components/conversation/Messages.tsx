import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "store/chat/type";
import { formatDate, sleep } from "utils/index";

interface MessagesProps {
  sessionId: string;
  avatarPartner: string | undefined;
  pageNumber: number;
  initialMessage: MessageInfo[];
  onRefetch: (page: number) => void;
}

const Messages = ({
  sessionId,
  avatarPartner,
  pageNumber,
  initialMessage: messages,
  onRefetch,
}: MessagesProps) => {
  const [firstElement, setFirstElement] = useState(null);

  const pageRef = useRef(pageNumber);
  const messageRef = useRef<HTMLDivElement>(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        pageRef.current = pageRef.current + 1;
        onRefetch(pageRef.current);
      }
    }),
  );

  const initScrollIntoView = async () => {
    await sleep(1);
    if (messageRef.current) {
      messageRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };
  useEffect(() => {
    initScrollIntoView();
  }, [messages]);

  useEffect(() => {
    const currentElement = firstElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [firstElement]);

  return (
    <Box
      ref={messageRef}
      sx={{
        display: "flex",
        gap: "0.5rem",
        flexDirection: "column",
        overflow: "auto",
        height: "100%",
        padding: "1rem 1rem 0 1rem",
      }}
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.u.username === sessionId;
        const hasNextMessageFromSameUser =
          messages[index + 1]?.u?.username === messages[index]?.u?.username;

        return (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
              justifyContent: isCurrentUser ? "flex-end" : "flex-start",
              "&:last-child": {
                paddingBottom: "1rem",
              },
            }}
            {...(index === 0 && { ref: setFirstElement })}
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
              {!isCurrentUser && (
                <Avatar
                  alt="Avatar"
                  size={30}
                  src={avatarPartner}
                  style={{
                    borderRadius: "10px",
                    visibility: hasNextMessageFromSameUser
                      ? "hidden"
                      : "visible",
                  }}
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
