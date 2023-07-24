import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import SearchRoundIcon from "icons/SearchRoundIcon";
import { useCallback, useState } from "react";

interface ProfileHeaderProps {
  avatar?: string | undefined;
  name: string;
  statusOnline?: string;
  onPrevious: () => void;
  onShowProfile?: () => void;
  onSearch?: (text: string) => void;
}
const ProfileHeader = ({
  avatar,
  name,
  statusOnline,
  onPrevious,
  onShowProfile,
  onSearch,
}: ProfileHeaderProps) => {
  const [openSearch, setOpenSearch] = useState(false);

  const groupButton = useCallback(() => {
    return (
      <>
        {onSearch && (
          <IconButton onClick={() => setOpenSearch(true)}>
            <SearchIcon
              sx={{
                color: "#1BC5BD",
              }}
            />
          </IconButton>
        )}

        <IconButton
          sx={{
            color: "white",
          }}
        >
          <ProfileAdd />
        </IconButton>
        {/* <IconButton
          sx={{
            color: "white",
          }}
        >
          <VideoCallIcon />
        </IconButton> */}
      </>
    );
  }, [onSearch]);

  const groupUserProfile = useCallback(() => {
    if (!openSearch) {
      return (
        <>
          {avatar && (
            <Avatar
              alt="Avatar"
              src={avatar}
              size={40}
              style={{
                borderRadius: "10px",
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {onShowProfile ? (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={onShowProfile}
              >
                <Typography variant="inherit" fontWeight="bold">
                  {name}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    transform: "rotate(180deg)",
                    display: "flex",
                    "& .MuiSvgIcon-root": {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                >
                  <ArrowDownIcon />
                </Box>
              </Box>
            ) : (
              <Typography variant="inherit" fontWeight="bold">
                {name}
              </Typography>
            )}
            {statusOnline && (
              <Typography variant="caption" color="#999999">
                {statusOnline}
              </Typography>
            )}
          </Box>
          <Box ml="auto">{groupButton()}</Box>
        </>
      );
    } else {
      return (
        <>
          <TextField
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                pl: "10px",
                borderRadius: "8px",
                backgroundColor: "#F7F7FD",
                "& fieldset": {
                  border: "unset",
                },
              },
            }}
            inputProps={{
              style: {
                paddingLeft: "5px",
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchRoundIcon
                  sx={{
                    fill: "none",
                    filter: "opacity(0.8)",
                    height: "20px",
                    width: "20px",
                  }}
                />
              ),
            }}
            placeholder="Search in conversation"
          />
          <Button onClick={() => setOpenSearch(false)}>Hủy</Button>
        </>
      );
    }
  }, [avatar, groupButton, name, onShowProfile, openSearch, statusOnline]);

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
        {groupUserProfile()}
      </Box>
    </>
  );
};

export default ProfileHeader;
