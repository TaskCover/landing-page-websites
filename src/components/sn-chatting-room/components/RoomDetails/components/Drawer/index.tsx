import { Drawer, Box, Typography, Avatar } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import useGetScreenMode from "hooks/useGetScreenMode";
import AccountInfo from "./AccountInfo";
import StorageInfo from "./StorageInfo";
import AddGroup from "components/sn-chat/chatGroup/AddGroup";

export interface DrawerInfoChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversation: IChatItemInfo;
  type: string;
  onChangeTypeDrawer?: (type: string) => void;
}

const DrawerInfoChat: React.FC<DrawerInfoChatProps> = (props) => {
  const { extraDesktopMode } = useGetScreenMode();

  const styleDrawerOpen = props.isOpen
    ? { width: extraDesktopMode ? "424px" : "272px" }
    : { width: "0" };

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
      open={props.isOpen}
    >
      {props?.type === "group" ? (
        <AddGroup callbackBackIcon={() => props.onClose()} />
      ) : props?.type === "account" ? (
        <AccountInfo {...props} />
      ) : (
        <StorageInfo {...props} />
      )}
    </Drawer>
  );
};

export default DrawerInfoChat;
