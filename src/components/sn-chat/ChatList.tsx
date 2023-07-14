import { Skeleton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "store/chat/selectors";
import { ChatItemInfo, STEP } from "store/chat/type";
import { useAuth } from "store/app/selectors";

const ChatList = () => {
  const [textSearch, setTextSearch] = useState("");
  const { user } = useAuth();
  const {
    isError,
    isIdle,
    convention,
    conversationPaging,
    prevStep,
    currStep,
    isFetching,
    onSetRoomId,
    onGetAllConvention,
    onSetStep,
  } = useChat();

  useEffect(() => {
    onGetAllConvention({
      type: "d",
      text: textSearch,
      offset: 0,
      count: 1000,
    });
  }, [onGetAllConvention, textSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
    }
  };

  const handleClickConversation = (chatInfo: ChatItemInfo) => {
    onSetRoomId(chatInfo._id);

    if (chatInfo?.t) {
      onSetStep(STEP.CHAT_ONE);
    }
  };

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
        {isFetching || isError ? (
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
