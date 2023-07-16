import Box from "@mui/material/Box";
import { ChatItemInfo, STEP } from "store/chat/type";
import { useChat } from "store/chat/selectors";
import { useMemo } from "react";
import Conversation from "./Conversation";
import ProfileHeader from "../common/ProfileHeader";

interface ConversationLayoutProp {
  viewStep?: STEP;
  onShowUserInfo?: () => void;
}
const ConversationLayout = ({
  viewStep,
  onShowUserInfo,
}: ConversationLayoutProp) => {
  const {
    roomId,
    convention,
    prevStep,
    userPartner,
    onSetStep,
    onSetRoomId,
    onSetUserPartner,
    onClearMessageList,
  } = useChat();

  const accountInfo = useMemo(() => {
    const account = convention?.find(
      (item) => item._id === roomId,
    ) as ChatItemInfo;
    return account;
  }, [convention, roomId]);

  console.log("roomId", roomId);

  return (
    <>
      <ProfileHeader
        avatar={accountInfo?.avatar}
        name={accountInfo?.name || ""}
        statusOnline={userPartner?.status || ""}
        onPrevious={() => {
          onSetStep(prevStep);
          onClearMessageList();
          onSetUserPartner(null);
          onSetRoomId("");
        }}
        onShowProfile={() => {
          onSetStep(STEP.VIEW_DETAIL_USER);
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        overflow="hidden"
        height="calc(600px - 77px)"
      >
        <Conversation />
      </Box>
    </>
  );
};

export default ConversationLayout;
