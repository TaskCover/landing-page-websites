import { Drawer } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import { useMemo } from "react";
import { useChatDetailInfoReturns } from "components/sn-chatting-room/hooks/useChatDetailInfo";
import useGetScreenMode from "hooks/useGetScreenMode";
import DrawerInfoChat from "../Drawer";
import { useChat } from "store/chat/selectors";

export type ChatDetailInfoProps = useChatDetailInfoReturns;

const ChatDetailInfo = () => {
  const { extraDesktopMode } = useGetScreenMode();
  const { isOpenInfoChat, typeDrawerChat } = useChat();

  const styleDrawerOpen = useMemo(
    () =>
    (isOpenInfoChat && typeDrawerChat !== 'forward') ? { width: extraDesktopMode ? "424px" : "272px" } : { width: 0 },
    [extraDesktopMode, isOpenInfoChat, typeDrawerChat],
  );


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
      open={isOpenInfoChat && typeDrawerChat !== 'forward'}
    >
        <DrawerInfoChat  />
    </Drawer>
  );
};

export default ChatDetailInfo;
