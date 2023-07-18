import { ImageList, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
import CloseIcon from "icons/CloseIcon";
import PointOnline from "icons/pointOnline";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import { useMemo } from "react";
import { useState } from "react";
import { useChat } from "store/chat/selectors";
import { ChatItemInfo, STEP } from "store/chat/type";

interface AccountInfoHeaderProp {
  accountInfo: ChatItemInfo;
  onPrevious: () => void;
  viewStep?: STEP;
}
const AccountInfoHeader = ({
  accountInfo,
  onPrevious,
  viewStep,
}: AccountInfoHeaderProp) => {
  const { dataTransfer, onSetStep, prevStep } = useChat();
  const { usersCount, t, name } = accountInfo;
  const isGroup = useMemo(() => t !== "d", [t]);

  const [textSearch, setTextSearch] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
    }
  };

  const _renderChatGroup = () => {
    if (isGroup) {
      return (
        <>
          <div style={{ position: "relative" }}>
            <ImageList
              sx={{ width: 56, height: 56, margin: 0 }}
              cols={2}
              rowHeight={164}
            >
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
                position: "absolute",
                right: -2,
                top: -2,
                cursor: "unset",
              }}
            >
              <PointOnline />
            </IconButton>
          </div>
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
              Active
            </Typography>
          </Box>
          <IconButton
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              onSetStep(STEP.CHAT_DETAIL_GROUP);
            }}
          >
            <ArrowRightIcon />
          </IconButton>
        </>
      );
    }
  };
  const _renderItemHeader = (viewStep) => {
    switch (viewStep) {
      case STEP.CHAT_GROUP:
        return <>{_renderChatGroup()}</>;
      case STEP.CHAT_DETAIL_GROUP:
        return (
          <>
            <Box
              sx={{
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {dataTransfer?.name}
            </Box>
          </>
        );
      case STEP.LIST:
        return (
          <>
            <Box
              sx={{
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {dataTransfer?.name}
            </Box>
          </>
        );
      default:
        break;
    }
  };

  const _renderHeaderForward = () => {
    return (
      <>
        <Box sx={{ padding: 3, borderBottom: "1px solid #ECECF3" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "var(--black, #212121)",
                fontSize: "1rem",
                fontWeight: 600,
                paddingBottom: 2,
              }}
            >
              Forward message
            </Typography>
            <IconButton
              onClick={() => {
                onSetStep(STEP.ADD_GROUP, { ...dataTransfer, isNew: !isGroup });
              }}
              sx={{
                width: "26px",
                height: "26px",
              }}
            >
              <CloseIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </Box>
          <TextField
            size="small"
            sx={{
              backgroundColor: "var(--gray-0, #F7F7FD)",
              borderRadius: "10px",
              "& .MuiInputBase-root": {
                color: "black",
                borderRadius: "10px",
                border: "1px solid transparent",
              },
            }}
            placeholder="Search"
            fullWidth
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "#999999",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </>
    );
  };

  const _renderHeader = (viewStep) => {
    switch (viewStep) {
      case STEP.CHAT_FORWARD:
        return <>{_renderHeaderForward()}</>;
      default:
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
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
            {_renderItemHeader(viewStep)}

            <Box ml="auto">
              {viewStep != STEP.CHAT_ONE && (
                <IconButton>
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
                onClick={() => {
                  onSetStep(STEP.ADD_GROUP);
                }}
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
        );
    }
  };

  return <>{_renderHeader(viewStep)}</>;
};

export default AccountInfoHeader;
