import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { FC, useMemo } from "react";
import useTheme from "hooks/useTheme";
import { UploadAvatarGroup } from "components/sn-chat/chatGroup/UploadAvatarGroup";
import ChatDetailInfoHeader from "../../ChatDetailInfo/ChatDetailInfoHeader";
import ChatDetailInfoMenuItem from "../../ChatDetailInfo/ChatDetailInfoMenuItem";
import ChatDetailGroup from "../../ChatDetailInfo/ChatDetailGroup";
import { useActionGroupDetails } from "../../ChatDetailInfo/useActionGroupDetails";
import useGetScreenMode from "hooks/useGetScreenMode";
import { useChat } from "store/chat/selectors";
import { useChatDetailInfo } from "components/sn-chatting-room/hooks/useChatDetailInfo";

const MenuInfo = () => {
  const { isDarkMode } = useTheme();
  const { extraDesktopMode } = useGetScreenMode();
  const {
    onCloseDrawer,
    dataTransfer: currentConversation,
    conversationInfo,
  } = useChat();

  const { menuItems } = useChatDetailInfo({
    currentConversation,
    conversationInfo,
  });

  const renderColorByType = useMemo(() => {
    if (currentConversation?.t === "d") {
      if (isDarkMode) return "#313130";
      return "var(--Gray0, #F7F7FD)";
    }
    if (isDarkMode) return "#313130";
    return "#ffffff";
  }, [isDarkMode, currentConversation?.t]);

  const propsActionGroupDetail = useActionGroupDetails();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: extraDesktopMode ? "424px" : "272px",
        // height: extraDesktopMode ? "948px" : "730px",
        backgroundColor: renderColorByType,
        gap: "12px",
        overflow: "auto",
        height: "100%",
      }}
    >
      <>
        <ChatDetailInfoHeader onClose={() => onCloseDrawer("info")} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            position: "relative",
          }}
        >
          <Avatar
            src={currentConversation?.avatar}
            sx={{
              height: "80px",
              width: "80px",
              flexShrink: "0",
              borderRadius: "10px",
            }}
          />
          {currentConversation?.t !== "d" && <UploadAvatarGroup />}
        </Box>
        <Box>
          <Typography
            variant="h6"
            color={isDarkMode ? "white" : "var(--Black, #212121)"}
            sx={{ textAlign: "center" }}
          >
            {currentConversation?.t !== "d"
              ? currentConversation?.name?.replaceAll("_", " ")
              : currentConversation?.name}
          </Typography>
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            alignSelf: "stretch",
            flexDirection: "column",
            padding: "0px 12px",
          }}
        >
          {currentConversation?.t === "d" ? (
            menuItems.map((item, index) => (
              <ChatDetailInfoMenuItem
                key={index}
                text={item.text}
                icon={item.icon}
                callBackOpenDrawer={item.callback}
                type={item?.type}
              />
            ))
          ) : (
            <ChatDetailGroup
              currentName={currentConversation?.name?.replaceAll("_", " ")}
              menuItems={menuItems}
              {...propsActionGroupDetail}
            />
          )}
        </Box>
      </>
    </Box>
  );
};

export default MenuInfo;
