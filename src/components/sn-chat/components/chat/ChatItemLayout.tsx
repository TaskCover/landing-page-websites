import Box, { BoxProps } from "@mui/material/Box";
import { Typography } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import ChatItemRender from "./ChatItemRender";
import { renderTimeDiff } from "utils/index";
import useTheme from "hooks/useTheme";

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
  const { lastMessage } = chatInfo || {};

  const { isDarkMode } = useTheme();
  return (
    <Box
      onClick={() => onClickConvention(chatInfo)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: 1,
        cursor: "pointer",
        position: "relative",
        ":hover": {
          backgroundColor: isDarkMode ? "#3a3b3c" : "#F7F7FD",
        },
        ...sx,
      }}
      p={2}
      {...props}
    >
      <ChatItemRender chatInfo={chatInfo} sessionId={sessionId} />
      <Typography
        variant="caption"
        color="#999999"
        ml="auto"
        whiteSpace="nowrap"
      >
        {renderTimeDiff(lastMessage?.ts)}
      </Typography>
    </Box>
  );
};

export default ChatItemLayout;
