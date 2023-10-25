import { SxProps } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Avatar from "components/Avatar";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import SearchRoundIcon from "icons/SearchRoundIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import { useCallback, useEffect, useState } from "react";

interface ProfileHeaderProps {
  textSearch?: string;
  isSearch?: boolean;
  avatar?: { url: string | undefined; isShow: boolean };
  name: string;
  statusOnline?: string;
  containerProps?: BoxProps;
  nameProps?: TypographyProps;
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
  containerProps,
  nameProps,
  onPrevious,
  onShowProfile,
  onSearch,
  onChangeText,
}: ProfileHeaderProps) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [avatarClone, setAvatarClone] = useState<string | undefined>(
    avatar?.url,
  );
  const { sx: containerSx, ...containerProp } = containerProps || {};
  const { sx: nameSx, ...nameProp } = nameProps || {};

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
          {avatar?.isShow && (
            <Box
              position="relative"
              display="flex"
              sx={{
                "&::before": {
                  content: `''`,
                  position: "absolute",
                  right: "-5px",
                  top: "-4px",
                  width: "14px",
                  height: "14px",
                  border: "2px solid #ffffff",
                  backgroundColor: "#55C000",
                  borderRadius: "50%",
                  visibility: statusOnline === "online" ? "visible" : "hidden",
                },
              }}
            >
              <Avatar
                alt="Avatar"
                src={avatarClone}
                size={40}
                style={{
                  borderRadius: "10px",
                }}
                onError={() => setAvatarClone(undefined)}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "11px",
            }}
          >
            {onShowProfile ? (
              <Typography
                variant="inherit"
                fontWeight="bold"
                onClick={onShowProfile}
                sx={{
                  cursor: "pointer",
                  ...nameSx,
                }}
                {...nameProp}
              >
                {name}
              </Typography>
            ) : (
              <Typography
                variant="inherit"
                fontWeight="bold"
                sx={nameSx}
                {...nameProp}
              >
                {name}
              </Typography>
            )}
            {statusOnline && (
              <Typography
                variant="caption"
                color="#999999"
                fontSize="14px"
                lineHeight="22px"
              >
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
              marginLeft: '0.3rem',
              color: "#1BC5BD",
            }}
          >
            Cancel
          </Button>
        </>
      );
    }
  }, [
    avatar,
    avatarClone,
    groupButton,
    handleKeyDown,
    name,
    nameProp,
    nameSx,
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
          padding: "11.5px",
          borderBottom: "1px solid #ECECF3",
          ...containerSx,
        }}
        {...containerProp}
      >
        <IconButton
          sx={{
            cursor: "pointer",
          }}
          onClick={handleGoPrevious}
        >
          <ArrowDownIcon
            sx={{
              fontSize: "32px",
            }}
          />
        </IconButton>
        {groupUserProfile()}
      </Box>
    </>
  );
};

export default ProfileHeader;
