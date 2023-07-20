import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "store/chat/type";
import { formatDate, sleep } from "utils/index";
import RenderAttachment from "./RenderMessage";
import { DataStatus } from "constant/enums";
import Skeleton from "@mui/material/Skeleton";

interface MessagesProps {
  sessionId: string;
  avatarPartner: string | undefined;
  pageNumber: number;
  pageSize: number;
  initialMessage: MessageInfo[];
  stateMessage?: {
    filePreview?: File | File[] | null;
    status: DataStatus;
  };
  onRefetch: (page: number) => void;
}

const Messages = ({
  sessionId,
  avatarPartner,
  pageNumber,
  pageSize,
  initialMessage: messages,
  stateMessage,
  onRefetch,
}: MessagesProps) => {
  const [firstElement, setFirstElement] = useState(null);

  const pageRef = useRef(pageNumber);
  const messageRef = useRef<HTMLDivElement>(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        pageRef.current = pageRef.current + pageSize;
        onRefetch(pageRef.current);
      }
    }),
  );

  const initScrollIntoView = async () => {
    await sleep(10);
    if (messageRef.current) {
      messageRef.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    pageRef.current = pageNumber;
  }, [pageNumber]);

  useEffect(() => {
    initScrollIntoView();
  }, [messages, stateMessage]);

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

        if (message.msg) {
          console.log(message);

          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "flex-end",
                justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                "&:last-child": {
                  paddingBottom: "1rem",
                },
              }}
              {...(index === 0 && { ref: setFirstElement })}
            >
              {/* Message content */}
              {message.msg && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "flex-end",
                    padding: "0.5rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: isCurrentUser ? "#EBF5FF" : "#F7F7FD",
                    maxWidth: "270px",
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
              )}
              {/* Avartar partner */}
              {!isCurrentUser && (
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
              )}
            </Box>
          );
        } else if (message.attachments?.length > 0) {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "flex-end",
                justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                "&:last-child": {
                  paddingBottom: "1rem",
                },
              }}
              {...(index === 0 && { ref: setFirstElement })}
            >
              {/* Message content */}
              {message.attachments?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.3rem",
                    alignItems: "flex-end",
                    borderRadius: "10px",
                  }}
                  order={2}
                >
                  <RenderAttachment
                    message={message}
                    attachmentProps={{
                      sx: {
                        justifyContent: isCurrentUser
                          ? "flex-end"
                          : "flex-start",
                      },
                    }}
                  />
                </Box>
              )}
              {/* Avartar partner */}
              {!isCurrentUser && (
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
              )}
            </Box>
          );
        }
      })}
      {stateMessage?.status === DataStatus.LOADING && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            "&:last-child": {
              paddingBottom: "1rem",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.3rem",
              alignItems: "flex-end",
              borderRadius: "10px",
            }}
            order={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: "0.2rem",
                maxWidth: "232px",
              }}
            >
              {Array.from(
                { length: stateMessage?.filePreview?.length || 0 },
                (_, i) => {
                  return (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      width={112}
                      height={112}
                    />
                  );
                },
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Messages;
