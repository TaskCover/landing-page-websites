import Box from "@mui/material/Box";
import {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  MessageInfo,
  MessageSearchInfo,
  UnReadMessageInfo,
} from "store/chat/type";
import { DataStatus } from "constant/enums";
import Skeleton from "@mui/material/Skeleton";
import MessageLayout from "../messages/MessageLayout";
import MessageContent from "./MessageContent";
import { sleep } from "utils/index";

interface MessagesProps {
  sessionId: string;
  avatarPartner: string | undefined;
  pageIndex: number;
  pageSize: number;
  initialMessage: MessageInfo[];
  stateMessage?: {
    filePreview?: File | File[] | null;
    status: DataStatus;
  };
  focusMessage: MessageSearchInfo | null;
  unReadMessage: UnReadMessageInfo | null;
  onRefetch: (page: number) => void;
}

type MessageHandle = {
  pageRef: MutableRefObject<number>;
  scrollBottom: () => void;
  scrollMessage: () => void;
};

const Messages: React.ForwardRefRenderFunction<MessageHandle, MessagesProps> = (
  {
    sessionId,
    avatarPartner,
    pageIndex,
    pageSize,
    initialMessage: messages,
    stateMessage,
    focusMessage,
    unReadMessage,
    onRefetch,
  }: MessagesProps,
  ref,
) => {
  const [firstElement, setFirstElement] = useState(null);

  const pageRef = useRef(pageIndex);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messagesContentRef = useRef<HTMLDivElement>(null);
  const scrollHeightRef = useRef(0);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        console.log(pageRef.current, pageSize);
        pageRef.current = pageRef.current + pageSize;
        scrollHeightRef.current = messagesContentRef.current?.scrollHeight || 0;
        const clientHeight =
          (messagesContentRef.current?.clientHeight || 0) + 100;

        if (scrollHeightRef.current > clientHeight) {
          onRefetch(pageRef.current);
        }
      }
    }),
  );
  const focusMessageRef = useRef<HTMLDivElement>(null);

  const scrollBottom = async () => {
    scrollHeightRef.current = 0;
    await sleep(1);
    if (messageEndRef?.current) {
      messageEndRef?.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollMessage = async () => {
    await sleep(500);
    if (focusMessageRef.current) {
      focusMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (focusMessageRef.current.hasChildNodes()) {
        (
          focusMessageRef.current?.childNodes[0] as HTMLDivElement
        ).style.border = "1px solid gray";

        setTimeout(() => {
          (
            focusMessageRef.current?.childNodes[0] as HTMLDivElement
          ).style.border = "1px solid transparent";
        }, 2000);
      }
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return { pageRef, scrollBottom, scrollMessage };
    },
    [],
  );

  const initScrollIntoView = () => {
    if (messagesContentRef.current) {
      const index = messagesContentRef.current?.scrollHeight
        ? Number(
            messagesContentRef.current?.scrollHeight -
              scrollHeightRef.current || 0,
          )
        : 0;
      messagesContentRef.current.scrollTo(0, index);
    }
  };

  useEffect(() => {
    pageRef.current = pageIndex;
  }, [pageIndex]);

  useEffect(() => {
    initScrollIntoView();
  }, [messages, scrollHeightRef, messagesContentRef]);

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
  }, [firstElement, messagesContentRef]);

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
                ...(message._id === focusMessage?.messageId && {
                  ref: focusMessageRef,
                }),
              }}
            >
              <MessageContent
                message={message}
                isCurrentUser={isCurrentUser}
                unReadMessage={unReadMessage}
              />
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
        <Box ref={messageEndRef} />
      </Box>
    </>
  );
};

export default forwardRef(Messages);
