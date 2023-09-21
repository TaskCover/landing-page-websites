import AccountInfo from "./AccountInfo";
import StorageInfo from "./StorageInfo";
import AddGroup from "components/sn-chat/chatGroup/AddGroup";
import { useMemo } from "react";
import ChatForward from "components/sn-chat/ChatForward";
import MenuInfo from "./MenuInfo";
import { useChat } from "store/chat/selectors";
import ArrowDownIcon from "icons/ArrowDownIcon";

const DrawerInfoChat = () => {
  const { typeDrawerChat, onSetDrawerType, onSetDataTransfer } = useChat();

  const DrawerObjs = useMemo(
    () => ({
      info: <MenuInfo />,
      group: (
        <AddGroup
          callbackBackIcon={() => onSetDrawerType("info")}
          onSelectNewGroup={(value) => onSetDataTransfer(value)}
          CustomCallBackIcon={<ArrowDownIcon sx={{ fontSize: '2rem' }} />}
        />
      ),
      account: <AccountInfo />,
      forward: (
        <>
          <ChatForward />
        </>
      ),
    }),
    [onSetDrawerType, onSetDataTransfer],
  );

  return DrawerObjs[typeDrawerChat] || <StorageInfo />;
};

export default DrawerInfoChat;
