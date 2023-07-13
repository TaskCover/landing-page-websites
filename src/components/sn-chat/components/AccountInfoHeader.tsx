import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import { ChatItemInfo, STEP } from "store/chat/type";

interface AccountInfoHeaderProp {
  accountInfo: ChatItemInfo | undefined;
  onPrevious: () => void;
  onSetStep: () => void;
}
const AccountInfoHeader = ({
  accountInfo,
  onPrevious,
  onSetStep,
}: AccountInfoHeaderProp) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 2,
          borderBottom: "1px solid #ECECF3",
        }}
      >
        <IconButton
          sx={{
            cursor: "pointer",
          }}
          onClick={onPrevious}
        >
          <ArrowDownIcon />
        </IconButton>
        <Avatar
          alt="Avatar"
          size={40}
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
            {accountInfo?.lastMessage?.u?.name}
          </Typography>
          <Typography variant="caption" color="#999999">
            Active
          </Typography>
        </Box>
        <Box ml="auto">
          <IconButton>
            <SearchIcon
              sx={{
                color: "#1BC5BD",
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
            }}
            onClick={onSetStep}
          >
            <ProfileAdd />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
            }}
          >
            <VideoCallIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default AccountInfoHeader;
