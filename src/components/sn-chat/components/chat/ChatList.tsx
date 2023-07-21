import { Skeleton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ChatItem from "./ChatItem";
import { useChat } from "store/chat/selectors";
import { ChatItemInfo, STEP } from "store/chat/type";
import { useAuth } from "store/app/selectors";
import { useEffect, useRef, useState } from "react";

const ChatList = () => {
  const { user } = useAuth();
  const {
    isError,
    convention,
    conversationPaging: { pageIndex, pageSize },
    isFetching,
    onSetRoomId,
    onSetConversationInfo,
    onGetAllConvention,
    onSetStep,
  } = useChat();

  const [textSearch, setTextSearch] = useState("");
  const [lastElement, setLastElement] = useState(null);
  const pageRef = useRef(pageIndex);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        pageRef.current = pageRef.current + pageSize;
        onGetAllConvention({
          type: "a",
          text: textSearch,
          offset: pageRef.current,
          count: pageSize,
        });
      }
    }),
  );

  console.log('convention', convention);
  

  useEffect(() => {
    pageRef.current = pageIndex;
  }, [pageIndex]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
      onGetAllConvention({
        type: "a",
        text: event.target.value,
        offset: 0,
        count: 10,
      });
    }
  };

  const handleClickConversation = (chatInfo: ChatItemInfo) => {
    onSetRoomId(chatInfo._id);
    onSetConversationInfo(chatInfo);

    if (chatInfo?.t)
      if (chatInfo?.t !== "d") {
        onSetStep(STEP.CHAT_GROUP, chatInfo);
      } else {
        onSetStep(STEP.CHAT_ONE, chatInfo);
      }
  };

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          padding: 2,
          backgroundColor: "#3699FF",
        }}
      >
        <Typography color="white" variant="h4">
          Chat
        </Typography>
        <TextField
          size="small"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            "& .MuiInputBase-root": {
              color: "black",
              borderRadius: "10px",
              border: "1px solid transparent",
            },
          }}
          placeholder="Search name"
          fullWidth
          onKeyDown={handleKeyDown}
        />
      </Box>
      <Box overflow="auto" maxHeight="calc(600px - 74px - 15px)">
        {(isFetching || isError) && convention?.length < 1 ? (
          Array.from({ length: 5 }, (_, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
              p={2}
            >
              <Skeleton variant="rounded" width={40} height={40} />
              <Box flex={1}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width="40%"
                />
              </Box>
            </Box>
          ))
        ) : (
          <>
            {convention?.length > 0
              ? convention.map((item, index) => {
                  return (
                    <ChatItem
                      chatInfo={item}
                      sessionId={user?.["username"]}
                      key={index}
                      onClickConvention={handleClickConversation}
                      chatItemProps={{
                        ...(index === convention?.length - 1 && {
                          ref: setLastElement,
                        }),
                      }}
                    />
                  );
                })
              : null}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatList;
