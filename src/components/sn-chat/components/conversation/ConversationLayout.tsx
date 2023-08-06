import Box from "@mui/material/Box";
import { IChatItemInfo } from "store/chat/type";
import { useChat } from "store/chat/selectors";
import { useMemo, useState } from "react";
import Conversation from "./Conversation";
import ProfileHeader from "../common/ProfileHeader";
import UserLanding from "./UserLanding";

const ConversationLayout = () => {
  const {
    roomId,
    convention,
    prevStep,
    conversationInfo,
    onSetStep,
    onSetRoomId,
    onSetConversationInfo,
    onClearMessageList,
    onSetStateSearchMessage,
  } = useChat();
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const accountInfo = useMemo(() => {
    const account = convention?.find(
      (item) => item._id === roomId,
    ) as IChatItemInfo;
    return account;
  }, [convention, roomId]);

  return (
    <Box height="inherit">
      <Box display="flex" flexDirection="column">
        <ProfileHeader
          avatar={accountInfo?.avatar}
          name={accountInfo?.name || "123"}
          statusOnline={conversationInfo?.status || ""}
          onPrevious={() => {
            onSetStep(prevStep);
            onClearMessageList();
            onSetConversationInfo(null);
            onSetRoomId("");
            onSetStateSearchMessage(null);
          }}
          onShowProfile={() => {
            setDisplayUserInfo((prev) => !prev);
          }}
          nameProps={{
            sx: {
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
            variant: "h6",
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          overflow="hidden"
          height="calc(600px - 72px)"
        >
          <Conversation />
        </Box>
      </Box>
      <UserLanding
        displayUserInfo={displayUserInfo}
        onPrevious={() => {
          setDisplayUserInfo((prev) => !prev);
        }}
      />
    </Box>
  );
};

export default ConversationLayout;
