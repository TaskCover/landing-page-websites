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
import { useCallback, useEffect, useState } from "react";

interface ProfileHeaderProps {
  textSearch?: string;
  isSearch?: boolean;
  avatar?: string | undefined;
  name: string;
  statusOnline?: string;
  onPrevious: () => void;
  onShowProfile?: () => void;
  onSearch?: (text: string, isSearch: boolean) => void;
  onChangeText?: (text: string) => void;
}
const ProfileHeader = ({
  textSearch,
  isSearch,
  avatar,
  name,
  statusOnline,
  onPrevious,
  onShowProfile,
  onSearch,
  onChangeText,
}: ProfileHeaderProps) => {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    setOpenSearch(isSearch || false);
    return () => {
      setOpenSearch(false);
    };
  }, [isSearch]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onSearch?.(event.target.value, true);
      }
    },
    [onSearch],
  );

  const handleGoPrevious = () => {
    if (openSearch && onSearch) {
      setOpenSearch(false);
      onSearch("", false);
    } else {
      onPrevious();
    }
  };

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
            autoFocus
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
            value={textSearch}
            placeholder="Search in conversation"
            onKeyDown={handleKeyDown}
            onChange={(e) => onChangeText?.(e.target.value)}
          />
          <Button
            onClick={() => {
              setOpenSearch(false);
              onSearch?.("", false);
            }}
            sx={{
              color: "#1BC5BD",
            }}
          >
            Hủy
          </Button>
        </>
      );
    }
  }, [
    avatar,
    groupButton,
    handleKeyDown,
    name,
    onChangeText,
    onSearch,
    onShowProfile,
    openSearch,
    statusOnline,
    textSearch,
  ]);

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
          onClick={handleGoPrevious}
        >
          <ArrowDownIcon />
        </IconButton>
        {groupUserProfile()}
      </Box>
    </>
  );
};

export default ProfileHeader;
