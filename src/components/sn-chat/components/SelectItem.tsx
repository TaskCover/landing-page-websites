import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Checkbox, ImageList, Typography } from "@mui/material";
import { ChatItemInfo } from "store/chat/type";
import { useMemo } from "react";
import CircleUnchecked from "icons/CircleUnchecked";
import CircleCheckedFilled from "icons/CircleCheckedFilled";
import { Button } from "components/shared";

interface ChatItemProp {
  sessionId: string;
  chatInfo: ChatItemInfo;
  onClickConvention: (data: ChatItemInfo) => void;
}
const SelectItem = ({ sessionId, chatInfo, onClickConvention }: ChatItemProp) => {
  const { lastMessage, name, usersCount } = chatInfo;
  const isGroup = usersCount > 1;
  const isCurrentAcc = sessionId === lastMessage?.u.username;
  const nameLastMessage = isCurrentAcc ? "You: " : "";
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const lastMessageRender = useMemo(() => {
    return [nameLastMessage, lastMessage?.msg].join("").trim();
  }, [lastMessage?.msg, nameLastMessage]);
  return (
    <Box
      // onClick={() => onClickConvention(chatInfo)}
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
      p={1.5}
    >
      
      <Typography variant="caption" color="#999999">
      <Checkbox
        {...label}
        icon={<CircleUnchecked />}
        checkedIcon={<CircleCheckedFilled />}
      />
      </Typography>
      <Avatar
        alt="Avatar"
        size={56}
        style={{
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="inherit" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="caption" color="#999999">
          {lastMessageRender}
        </Typography>
      </Box>
      
    </Box>
  );
};
export default SelectItem;