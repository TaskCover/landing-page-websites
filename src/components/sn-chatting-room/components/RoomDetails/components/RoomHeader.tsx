import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import useTheme from "hooks/useTheme";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import SidebarIcon from "icons/SidebarIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import colorSchemes from "utils/colorSchemes";
import ChatDetailInfo from "./ChatDetailInfo";
import CloseIcon from "icons/CloseIcon";
import useGetScreenMode from "hooks/useGetScreenMode";
import _ from "lodash";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";
import { debounce } from "utils/index";
import { Text } from "components/shared";
import {
  ArrowCircleDownOutlined,
  ArrowCircleUp,
  ArrowUpward,
} from "@mui/icons-material";
import { useChatDetailInfo } from "components/sn-chatting-room/hooks/useChatDetailInfo";
import { STEP } from "store/chat/type";

const RoomHeader = ({ currentConversation, onSelectRoom }) => {
  const { isDarkMode } = useTheme();
  const t = useTranslations(NS_COMMON);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { mobileMode } = useGetScreenMode();
  const { onAddSnackbar } = useSnackbar();

  const propsChatDetailInfo =
  useChatDetailInfo({ currentConversation, onSelectRoom });

  const {
    onSearchChatText,
    listSearchMessage,
    onSetStateSearchMessage,
    onSetStep,
    dataTransfer,
  } = useChat();
  const [search, setSearchText] = useState({
    text: "",
    isOpen: false,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(
    listSearchMessage?.length,
  );

  const handleSearchChatText = useCallback(async () => {
    try {
      if (!search?.isOpen) return;
      await onSearchChatText({
        text: search?.text,
        type: currentConversation?.t,
        roomId: currentConversation?._id,
      });
    } catch (error) {
      onAddSnackbar(
        typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
        "error",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.isOpen, search.text]);

  const debounceSearchText = debounce((text: string) => {
    setSearchText({ ...search, text });
  }, 1000);

  // Handler to open the drawer.
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Handler to close the drawer.
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onOpenSearchMessage = () => {
    setSearchText({ isOpen: !search.isOpen, text: "" });
  };

  useEffect(() => {
    handleSearchChatText();
  }, [handleSearchChatText]);

  const onDirectToMessage = useCallback(() => {
    const newIndex = currentIndex - 1;
    if (newIndex < 0 || newIndex > listSearchMessage.length - 1) return;
    setCurrentIndex(newIndex);
    const message = listSearchMessage[newIndex];
    onSetStateSearchMessage(message);
  }, [currentIndex, listSearchMessage]);

  useEffect(() => {
    setCurrentIndex(listSearchMessage?.length);
  }, [listSearchMessage?.length]);

  useEffect(() => {
    closeDrawer();
  }, [currentConversation]);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      height="76px"
      padding="10px"
      bgcolor="var(--Gray0, #F7F7FD);"
    >
      <Box
        width="100%"
        display="flex"
        padding="10px"
        gap="20px"
        alignItems="center"
      >
        {search?.isOpen ? (
          <Box display="flex" gap="10px">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                height: "40px",
                borderRadius: "8px",
                boxShadow: "none",
                ...(!mobileMode
                  ? { width: "400px" }
                  : { width: "80%", border: "1px solid" }),
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>

              <InputBase
                size="small"
                placeholder="Search text"
                onChange={(e) => debounceSearchText(e.target.value)}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  fontSize: 14,
                  "& .MuiInputBase-input": {
                    padding: "0px !important",
                  },
                }}
              />
            </Paper>
            {search?.text?.length > 0 && listSearchMessage?.length > 0 ? (
              <Box display="flex" gap="10px" width="240px" alignItems="center">
                <Text variant="body2" className="text-option">
                  {listSearchMessage?.length} matches
                </Text>
                <IconButton
                  sx={{ p: "5px", bgcolor: "white" }}
                  aria-label="search"
                  onClick={onDirectToMessage}
                >
                  <ArrowCircleUp />
                </IconButton>
              </Box>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <>
            <Avatar
              src={currentConversation?.avatar}
              sx={{ height: "56px", width: "56px", borderRadius: "10px" }}
            />
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" color="var(--Black, #212121)">
                {currentConversation?.name}
              </Typography>
              <Typography variant="body2" color="var(--Gray3, #999)">
                Online
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Box
        justifyContent="flex-end"
        width="100%"
        display="flex"
        padding="10px"
        gap="4px"
        alignItems="center"
      >
        <IconButton
          sx={{
            color:
              colorSchemes[isDarkMode ? "dark" : "light"].palette.secondary
                .main,
          }}
          onClick={onOpenSearchMessage}
        >
          {search?.isOpen ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
        <IconButton
          sx={{
            color: "transparent",
          }}
          onClick={() => {
            openDrawer();
            propsChatDetailInfo?.onOpenDrawer();
            propsChatDetailInfo?.onChangeTypeDrawer("group");
            if (currentConversation.t === "d") {
              onSetStep(STEP.ADD_GROUP, { ...dataTransfer, isNew: true });
            }
          }}
        >
          <ProfileAdd />
        </IconButton>
        <IconButton
          sx={{
            color: "transparent",
          }}
        >
          <VideoCallIcon />
        </IconButton>
        <IconButton
          onClick={openDrawer}
          sx={{
            color: "transparent",
          }}
        >
          <SidebarIcon />
        </IconButton>
      </Box>
      <ChatDetailInfo
        currentConversation={currentConversation}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        {...propsChatDetailInfo}
      />
    </Box>
  );
};

export default RoomHeader;
