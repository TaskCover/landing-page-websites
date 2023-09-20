import { Drawer, Box, Typography, Avatar } from "@mui/material";
import ChatDetailInfoHeader from "./ChatDetailInfoHeader";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";
import { IChatItemInfo } from "store/chat/type";
import { useMemo } from "react";
import { useChatDetailInfoReturns } from "components/sn-chatting-room/hooks/useChatDetailInfo";
import DefaultPopupLayout from "components/sn-time-tracking/TimeTrackingModal/DefaultPopupLayout";
import useGetScreenMode from "hooks/useGetScreenMode";
import ChatDetailGroup from "./ChatDetailGroup";
import { useActionGroupDetails } from "./useActionGroupDetails";
import DrawerInfoChat from "../Drawer";
import useTheme from "hooks/useTheme";

export type ChatDetailInfoProps = {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
} & useChatDetailInfoReturns;

const ChatDetailInfo: React.FC<ChatDetailInfoProps> = ({
  isOpen,
  onClose,
  currentConversation,
  ...props
}) => {
  const { extraDesktopMode } = useGetScreenMode();

  const { onOpenDrawer, isDrawerOpen, closeDrawer, menuItems, typeDrawer, onChangeTypeDrawer } = props

  const styleDrawerOpen = useMemo(
    () =>
      isOpen ? { width: extraDesktopMode ? "424px" : "272px" } : { width: 0 },
    [extraDesktopMode, isOpen],
  );

  const { isDarkMode } = useTheme();

  const renderColorByType = useMemo(() => {

    if(currentConversation?.t === 'd'){
      if(isDarkMode) return "#313130"
      return  "var(--Gray0, #F7F7FD)"
    }
    if(isDarkMode) return "#313130"
    return '#ffffff'

  } , [isDarkMode, currentConversation?.t])

  const propsActionGroupDetail = useActionGroupDetails();
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        ...styleDrawerOpen,
        "& .MuiDrawer-paper": {
          top: "50px",
          width: extraDesktopMode ? "424px" : "272px",
          boxSizing: "border-box",
          border: "none",
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: extraDesktopMode ? "424px" : "272px",
          height: extraDesktopMode ? "948px" : "681px",
          backgroundColor: renderColorByType,
          gap: "12px",
          ...isDarkMode ? {} : {borderLeft: '1px solid #cccccc'},
        }}
      >
        <ChatDetailInfoHeader onClose={onClose} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
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
        </Box>
        <Box>
          <Typography
            variant="h6"
            color={isDarkMode ? 'white' :"var(--Black, #212121)"}
            sx={{ textAlign: "center" }}
          >
            {currentConversation?.name}
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
                isOpenDrawer={isDrawerOpen}
                currentConversation={currentConversation}
                onOpenDrawer={onOpenDrawer}
                callBackOpenDrawer={item.callback}
              />
            ))
          ) : (
            <ChatDetailGroup currentConversation={currentConversation} {...props} {...propsActionGroupDetail}/>
          )}
        </Box>
        {isDrawerOpen ? (
          <DrawerInfoChat
            isOpen={isDrawerOpen}
            type={typeDrawer}
            onClose={closeDrawer}
            currentConversation={currentConversation}
            onChangeTypeDrawer={onChangeTypeDrawer}
            onSelectNewGroup={props.onSelectRoom}
          />
        ) : null}
      </Box>
    </Drawer>
  );
};


export default ChatDetailInfo;
