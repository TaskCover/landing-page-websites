import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "store/chat/type";
import { DataStatus } from "constant/enums";
import Skeleton from "@mui/material/Skeleton";
import MessageLayout from "../common/MessageLayout";
import MessageContent from "./MessageContent";
import { sleep } from "utils/index";

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

  const scrollHeightRef = useRef(0);
  const pageRef = useRef(pageNumber);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContentRef = useRef<HTMLDivElement>(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        pageRef.current = pageRef.current + pageSize;
        console.log(
          "messagesContentRef.current?.firstElementChild?.scrollHeight",
          messagesContentRef.current?.scrollHeight,
        );

        scrollHeightRef.current = messagesContentRef.current?.scrollHeight || 0;
        onRefetch(pageRef.current);
      }
    }),
  );

  const initScrollIntoView = (index: number) => {
    if (messagesContentRef.current) {
      messagesContentRef.current.scrollTo(0, index);
      // messagesEndRef.current?.scrollIntoView({
      //   behavior: "instant",
      // });
    }
  };

  //tifm casch luwu laji gias trij cuoosi cufng

  useEffect(() => {
    console.log('1111111111111111111111111', scrollHeightRef.current);
    
    initScrollIntoView(scrollHeightRef.current);
  }, [messages, scrollHeightRef]);

  // useEffect(() => {
  //   console.log(
  //     "messagesEndContentRef.current?.scrollHeight",
  //     messagesContentRef.current?.scrollHeight,
  //   );
  //   if (messagesContentRef.current) {
  //     messagesContentRef.current.lastElementChild?.scrollTo(
  //       0,
  //       messagesContentRef.current?.scrollHeight,
  //     );
  //   }
  // }, [messages]);

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
    <>
      <Box
        ref={messagesContentRef}
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
            <MessageLayout
              key={index}
              sessionId={sessionId}
              message={message}
              avatarPartner={avatarPartner || undefined}
              hasNextMessageFromSameUser={hasNextMessageFromSameUser}
              messageProps={{
                ...(index === 0 && {
                  ref: setFirstElement,
                }),
              }}
            >
              <MessageContent message={message} isCurrentUser={isCurrentUser} />
            </MessageLayout>
          );
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
      <Box ref={messagesEndRef} />
    </>
  );
};

export default Messages;
