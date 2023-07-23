import Box from "@mui/material/Box";
import { ChatItemInfo, STEP, STEP_INFO, TYPE_LIST } from "store/chat/type";
import { useChat } from "store/chat/selectors";
import { useCallback, useEffect, useMemo, useState } from "react";
import Conversation from "./Conversation";
import ProfileHeader from "../common/ProfileHeader";
import UserLanding from "./UserLanding";
import UserInfo from "./UserInfo";
import GroupMediaProfile from "./GroupMediaProfile";

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
    conversationInfo,
    onSetStep,
    onSetRoomId,
    onSetConversationInfo,
    onClearMessageList,
  } = useChat();
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const [stepMedia, setStepMedia] = useState<STEP_INFO>(STEP_INFO.IDLE);
  const accountInfo = useMemo(() => {
    const account = convention?.find(
      (item) => item._id === roomId,
    ) as ChatItemInfo;
    return account;
  }, [convention, roomId]);

  const _renderMediaContent = useMemo(() => {
    switch (stepMedia) {
      case STEP_INFO.USER:
        return <UserInfo onPrevious={setStepMedia} />;
      case STEP_INFO.MEDIA:
        return (
          <GroupMediaProfile type={STEP_INFO.MEDIA} onPrevious={setStepMedia} />
        );
      case STEP_INFO.LINK:
        return (
          <GroupMediaProfile type={STEP_INFO.LINK} onPrevious={setStepMedia} />
        );
      case STEP_INFO.FILE:
        return (
          <GroupMediaProfile type={STEP_INFO.FILE} onPrevious={setStepMedia} />
        );
      default:
        return null;
    }
  }, [stepMedia]);

  return (
    <>
      <ProfileHeader
        avatar={accountInfo?.avatar}
        name={accountInfo?.name || ""}
        statusOnline={conversationInfo?.statusOnline || ""}
        onPrevious={() => {
          onSetStep(prevStep);
          onClearMessageList();
          onSetConversationInfo(null);
          onSetRoomId("");
        }}
        onShowProfile={() => {
          setDisplayUserInfo((prev) => !prev);
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
      <UserLanding
        displayUserInfo={displayUserInfo}
        onPrevious={() => {
          setDisplayUserInfo((prev) => !prev);
        }}
        onSetMediaStep={setStepMedia}
      >
        {_renderMediaContent}
      </UserLanding>
    </>
  );
};

export default ConversationLayout;
