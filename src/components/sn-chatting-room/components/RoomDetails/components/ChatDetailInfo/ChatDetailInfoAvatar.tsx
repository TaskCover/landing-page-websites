import { Box, Avatar, Typography } from "@mui/material";
import useChattingActions from "components/sn-chatting-room/hooks/useChattingActions";

const ChatDetailInfoAvatar = () => {
  const { currentConversation } = useChattingActions();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Avatar
          src={currentConversation?.avatar}
          sx={{
            height: "80px",
            width: "80px",
            flexShrink: "0",
            borderRadius: "10px",
          }}
        ></Avatar>
      </Box>
      <Box>
        <Typography
          variant="h6"
          color="var(--Black, #212121)"
          sx={{ textAlign: "center" }}
        >
          {currentConversation?.name}
        </Typography>
      </Box>
    </>
  );
};

export default ChatDetailInfoAvatar;
