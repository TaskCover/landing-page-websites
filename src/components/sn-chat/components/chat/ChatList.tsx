import { Skeleton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ChatItemLayout from "./ChatItemLayout";
import { useChat } from "store/chat/selectors";
import { IChatItemInfo, STEP } from "store/chat/type";
import { useAuth, useSnackbar } from "store/app/selectors";
import { useEffect, useMemo, useRef, useState } from "react";
import NewGroupIcon from "icons/NewGroupIcon";
import SearchRoundIcon from "icons/SearchRoundIcon";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";

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

  const { onAddSnackbar } = useSnackbar();
  const t = useTranslations(NS_COMMON);
  const [textSearch, setTextSearch] = useState("");
  const [lastElement, setLastElement] = useState(null);
  const pageRef = useRef(pageIndex);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        pageRef.current = pageRef.current + pageSize;
        handleGetConversation(textSearch, pageRef.current, pageSize);
      }
    }),
  );
  const conversationList = useMemo(() => {
    return convention
      .filter((item) => item.username !== user?.["username"])
      .map((item) => {
        if (item.t === "d") {
          const itemClone = { ...item };
          if (item.statuses && item.statuses.length > 0) {
            const statusPartner =
              item.statuses?.[0].username === user?.["username"]
                ? item.statuses?.[1]?.status
                : item.statuses?.[0]?.status;
            itemClone.status = statusPartner;
          }

          if (item.usernames && item.usernames.length > 0) {
            const usernamePartner =
              item.usernames?.[0] === user?.["username"]
                ? item.usernames?.[1]
                : item.usernames?.[0];
            itemClone.username = usernamePartner;
          }

          return itemClone;
        }
        return item;
      });
  }, [convention, user]);

  const handleGetConversation = async (
    text: string,
    offset?: number,
    count?: number,
  ) => {
    try {
      await onGetAllConvention({
        type: "a",
        text,
        offset: offset || 0,
        count: count || 10,
      });
    } catch (error) {
      onAddSnackbar(
        typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
        "error",
      );
    }
  };

  const handleClickConversation = (chatInfo: IChatItemInfo) => {
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
    pageRef.current = pageIndex;
  }, [pageIndex]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
      handleGetConversation(event.target.value);
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
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              color: "black",
              border: "1px solid transparent",
            },
            "& fieldset": {
              border: "unset",
            },
          }}
          inputProps={{
            sx: {
              paddingLeft: "5px",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              "&::-webkit-input-placeholder": {
                color: "#999999",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <SearchRoundIcon
                sx={{
                  fill: "none",
                  filter: "opacity(0.8)",
                  height: "20px",
                  width: "20px",
                }}
              />
            ),
          }}
          placeholder="Search name"
          fullWidth
          onKeyDown={handleKeyDown}
        />
        <Box
          onClick={() => {
            onSetStep(STEP.ADD_GROUP, { isNew: true });
          }}
        >
          <NewGroupIcon />
        </Box>
      </Box>
      <Box overflow="auto" maxHeight="calc(600px - 74px - 15px)">
        {(isFetching || isError) && conversationList?.length < 1 ? (
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
            {conversationList?.length > 0
              ? conversationList.map((item, index) => {
                  return (
                    <ChatItemLayout
                      chatInfo={item}
                      sessionId={user?.["username"]}
                      key={index}
                      onClickConvention={handleClickConversation}
                      chatItemProps={{
                        ...(index === conversationList?.length - 1 && {
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
