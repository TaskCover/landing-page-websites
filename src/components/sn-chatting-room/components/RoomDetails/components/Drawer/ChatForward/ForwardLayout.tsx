import Box from "@mui/material/Box";
import { IChatItemInfo, STEP } from "store/chat/type";
import { useChat } from "store/chat/selectors";
import { useMemo } from "react";
import Forward from "icons/Forward";
import ForwardHeader from "./ForwarHeader";

interface ForwardLayoutProp {
  children: React.ReactNode;
  viewStep?: STEP;
}
const ForwardLayout = ({ children, viewStep }: ForwardLayoutProp) => {
  const { roomId, convention, prevStep, onSetStep, currStep } = useChat();

  const accountInfo = useMemo(() => {
    const account = convention?.find(
      (item) => item._id === roomId,
    ) as IChatItemInfo & { stateOnPage: string };

    return { ...account };
  }, [convention, roomId]);

  return (
    <>
      <ForwardHeader
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
              onSetStep(prevStep);
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

export default ForwardLayout;
