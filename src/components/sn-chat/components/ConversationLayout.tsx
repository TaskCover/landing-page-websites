import Box from "@mui/material/Box";
import { STEP } from "store/chat/type";
import AccountInfoHeader from "./AccountInfoHeader";
import { useChat } from "store/chat/selectors";
import { useEffect, useMemo } from "react";

interface ConversationLayoutProp {
  children: React.ReactNode;
  viewStep?: STEP;
}
const ConversationLayout = ({ children }: ConversationLayoutProp) => {
  const { roomId, convention, prevStep, onSetStep } = useChat();

  const accountInfo = useMemo(() => {
    return convention?.find((item) => item._id === roomId);
  }, [convention, roomId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AccountInfoHeader
        accountInfo={accountInfo}
        onPrevious={() => onSetStep(prevStep)}
      />
      <Box overflow="auto" maxHeight="calc(600px - 74px - 15px)">
        {children}
      </Box>
    </Box>
  );
};

export default ConversationLayout;
