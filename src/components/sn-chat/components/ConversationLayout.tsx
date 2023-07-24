import Box from "@mui/material/Box";
import { IChatItemInfo, STEP } from "store/chat/type";
import AccountInfoHeader from "./AccountInfoHeader";
import { useChat } from "store/chat/selectors";
import { useMemo } from "react";

interface ConversationLayoutProp {
  children: React.ReactNode;
  viewStep?: STEP;
}
const ConversationLayout = ({ children, viewStep }: ConversationLayoutProp) => {
  const { roomId, convention, userOnlinePage, prevStep, onSetStep, currStep } = useChat();

  const accountInfo = useMemo(() => {
    const account = convention?.find(
      (item) => item._id === roomId,
    ) as IChatItemInfo & { stateOnPage: string };

    const stateOnPage =
      userOnlinePage?.find((item) => item.username === account?.usernames?.[1])
        ?.status || "";

    return { ...account, stateOnPage };
  }, [convention, roomId, userOnlinePage]);

  return (
    <>
      <AccountInfoHeader
        accountInfo={accountInfo}
        onPrevious={() => {
          switch (currStep) {
            case STEP.CHAT_GROUP:
              onSetStep(STEP.CONVENTION);
              break;
            case STEP.CHAT_DETAIL_GROUP:
              onSetStep(STEP.CHAT_GROUP);
              break;
            default:
              onSetStep(prevStep)
              break;
          }
        }}
        viewStep={viewStep}
      />
      <Box
        display="flex"
        flexDirection="column"
        overflow="hidden"
        height="calc(600px - 77px)"
      >
        {children}
      </Box>
    </>
  );
};

export default ConversationLayout;
