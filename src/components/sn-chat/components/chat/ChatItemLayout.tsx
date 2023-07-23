import Box, { BoxProps } from "@mui/material/Box";
import { Typography } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import { renderTimeDiff } from "components/sn-chat/utils";
import ChatItemRender from "./ChatItemRender";

interface ChatItemProp {
  sessionId: string;
  chatInfo: IChatItemInfo;
  chatItemProps?: BoxProps;
  onClickConvention: (data: IChatItemInfo) => void;
}
const ChatItemLayout = ({
  chatItemProps,
  sessionId,
  chatInfo,
  onClickConvention,
}: ChatItemProp) => {
  const { sx, ...props } = chatItemProps || {};
  const { lastMessage } = chatInfo;

  return (
    <Box
      onClick={() => onClickConvention(chatInfo)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: 1,
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#F7F7FD",
        },
        ...sx,
      }}
      p={2}
      {...props}
    >
      <ChatItemRender chatInfo={chatInfo} sessionId={sessionId} />
      <Typography variant="caption" color="#999999" ml="auto">
        {renderTimeDiff(lastMessage?.ts)}
      </Typography>
    </Box>
  );
};

export default ChatItemLayout;
