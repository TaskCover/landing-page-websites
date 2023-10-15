import { useMemo } from "react";
import { useChat } from "store/chat/selectors";
import ForwardLayout from "../components/RoomDetails/components/Drawer/ChatForward/ForwardLayout";
import AddGroup from "components/sn-chat/chatGroup/AddGroup";

const useModalChatting = () => {
  const { isOpenInfoChat, typeDrawerChat, onCloseDrawer } = useChat();

  console.log(isOpenInfoChat, typeDrawerChat);

  const contentObject = useMemo(
    () => ({
      ["forward"]: {
        title: "Forward message",
        content: <ForwardLayout />,
        open: typeDrawerChat === "forward" && isOpenInfoChat,
        onClose: () => onCloseDrawer("account"),
        sx: { width: "500px" },
      },
      ["group-modal"]: {
        title: "Add group",
        content: <AddGroup isNew={true} />,
        open: typeDrawerChat === "group-modal" && isOpenInfoChat,
        onClose: () => onCloseDrawer("account"),
        sx: { width: "500px" },
      },
    }),
    [isOpenInfoChat, onCloseDrawer, typeDrawerChat],
  );

  const contentChatting = useMemo(
    () => contentObject[typeDrawerChat],
    [contentObject, typeDrawerChat],
  );

  return contentChatting;
};

export default useModalChatting;
