import { ImageList } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
import PointOnline from "icons/pointOnline";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import { ChatItemInfo } from "store/chat/type";

interface AccountInfoHeaderProp {
  accountInfo: ChatItemInfo;
  onPrevious: () => void;
  onSetStep: () => void;
}
const AccountInfoHeader = ({
  accountInfo,
  onPrevious,
  onSetStep,
}: AccountInfoHeaderProp) => {
  const { usersCount } = accountInfo;
  const isGroup = usersCount > 1;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 1.5,
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
        {isGroup ?
        <div style={{position: 'relative'}}>
          <ImageList sx={{ width: 56, height: 56, margin: 0 }} cols={2} rowHeight={164}>
            <Avatar
              alt="Avatar"
              size={25}
              style={{
                borderRadius: "5px",
              }}
            />
            <Avatar
              alt="Avatar"
              size={25}
              style={{
                borderRadius: "5px",
              }}
            />
            <Avatar
              alt="Avatar"
              size={25}
              style={{
                borderRadius: "5px",
              }}
            />
           
            {usersCount - 3 > 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  borderRadius: "5px",
                  backgroundColor: "#3078F1",
                  color: "white",
                }}
              >
                <Typography variant="caption">+ {usersCount - 3}</Typography>
              </Box>
            ) : null}
          </ImageList>
          <IconButton 
            style={{
              width: 5,
              height: 5,
              position: 'absolute',
              right: -2,
              top: -2,
              cursor: 'unset'
            }}
          >
            <PointOnline />
          </IconButton>
        </div>
          :
          <>
            <Avatar
              alt="Avatar"
              size={40}
              style={{
                borderRadius: "10px",
              }}
            />
           
          </>
        }
         
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
            <IconButton
          sx={{
            cursor: "pointer",
          }}
          // onClick={onPrevious}
        >
          <ArrowRightIcon />
        </IconButton>
        <Box ml="auto">
          {!isGroup && <IconButton>
            <SearchIcon
              sx={{
                color: "#1BC5BD",
              }}
            />
          </IconButton>}
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
