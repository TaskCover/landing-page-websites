import Box from "@mui/material/Box";
import { STEP } from "store/chat/type";

interface ConversationLayoutProp {
  children: React.ReactNode;
  header: React.ReactNode;
  viewStep?: STEP;
}
const ConversationLayout = ({ children, header }: ConversationLayoutProp) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {header}
      <Box overflow="auto" maxHeight="calc(600px - 74px - 15px)">
        {children}
      </Box>
    </Box>
  );
};

export default ConversationLayout;
