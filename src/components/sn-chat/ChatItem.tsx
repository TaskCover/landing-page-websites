import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Typography } from "@mui/material";
import { ChatItemInfo } from "store/chat/type";

interface ChatItemProp {
  chatInfo: ChatItemInfo;
  onClickConvention: (id: string) => void;
}
const ChatItem = ({ chatInfo, onClickConvention }: ChatItemProp) => {
  const { lastMessage } = chatInfo;
  return (
    <Box
      onClick={() => onClickConvention(chatInfo._id)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: 1,
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#F7F7FD",
        },
      }}
      p={2}
    >
      <Avatar
        alt="Avatar"
        size={56}
        style={{
          borderRadius: "10px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="inherit" fontWeight="bold">
          {lastMessage.u.name}
        </Typography>
        <Typography variant="caption" color="#999999">
          You: What’s man!
        </Typography>
      </Box>
      <Typography variant="caption" color="#999999" ml="auto">
        3m
      </Typography>
    </Box>
  );
};

export default ChatItem;
