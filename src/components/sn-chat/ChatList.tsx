import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { useChat } from "store/chat/selectors";
import { ChatItemInfo, STEP } from "store/chat/type";
import { setRoomId } from "store/chat/reducer";

const ChatList = () => {
  const [listChat, setListChat] = useState<ChatItemInfo[]>(
    Array.from({ length: 50 }, (_, i) => ({
      _id: "W9NNPYa2c66x9CH8zrNGpPWHQzakWfsktK",
      t: "d",
      usernames: ["rocket.admin", "tuanbn"],
      usersCount: 2,
      msgs: 40,
      ts: "2023-06-30T14:16:42.115Z",
      default: false,
      ro: false,
      sysMes: true,
      _updatedAt: "2023-07-10T15:26:30.735Z",
      lastMessage: {
        _id: "8r6DZK6BjwFAHvZLE",
        rid: "W9NNPYa2c66x9CH8zrNGpPWHQzakWfsktK",
        msg: "sd",
        ts: "2023-07-10T15:26:30.706Z",
        u: {
          _id: "W9NNPYa2c66x9CH8z",
          username: "tuanbn",
          name: "tuanBN",
        },
        _updatedAt: "2023-07-10T15:26:30.731Z",
      },
      lm: "2023-07-10T15:26:30.706Z",
    })),
  );
  const [textSearch, setTextSearch] = useState("");
  const {
    convention,
    isIdle,
    isFetching,
    roomId,
    onSetRoomId,
    onGetAllConvention,
    onSetStep,
  } = useChat();

  useEffect(() => {
    onGetAllConvention({
      type: "d",
      text: textSearch,
    });
  }, [onGetAllConvention, textSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
    }
  };

  const handleClickConversation = (id: string) => {
    onSetStep(STEP.CHAT_ONE);
    setRoomId(id);
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
        <Typography color="white">Chat</Typography>
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
        {isFetching ? (
          "Loading..."
        ) : (
          <>
            {convention?.length > 0
              ? convention.map((item, index) => {
                  return (
                    <ChatItem
                      chatInfo={item}
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
