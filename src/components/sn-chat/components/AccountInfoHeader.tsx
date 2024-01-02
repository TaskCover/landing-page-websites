import { ImageList, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import { NS_CHAT_BOX, NS_COMMON } from "constant/index";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
import CloseIcon from "icons/CloseIcon";
import InfoUserIcon from "icons/InfoUserIcon";
import PointOnline from "icons/pointOnline";
import ProfileAdd from "icons/ProfileAdd";
import SearchIcon from "icons/SearchIcon";
import VideoCallIcon from "icons/VideoCallIcon";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useChat } from "store/chat/selectors";
import { IChatItemInfo, STEP } from "store/chat/type";

interface AccountInfoHeaderProp {
  accountInfo: IChatItemInfo;
  onPrevious: () => void;
  viewStep?: STEP;
}
const AccountInfoHeader = ({
  accountInfo,
  onPrevious,
  viewStep,
}: AccountInfoHeaderProp) => {
  const { dataTransfer, onSetStep, prevStep, currStep, onGetAllConvention } =
    useChat();
  const { usersCount, t, name } = accountInfo;
  const isGroup = useMemo(() => t !== "d", [t]);

  const [textSearch, setTextSearch] = useState("");
  const commonChatBox = useTranslations(NS_CHAT_BOX);
  const [avatar, setAvatar] = useState<string | undefined>(
    dataTransfer?.avatar,
  );

  useEffect(() => {
    setAvatar(dataTransfer?.avatar);
  }, [dataTransfer?.avatar]);

  useEffect(() => {
    (async () => {
      await onGetAllConvention({
        type: "a",
        text: textSearch ?? "",
        offset: 0,
        count: 30,
      });
    })();
  }, [currStep, textSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setTextSearch(event.target.value);
    }
  };

  const _renderChatGroup = () => {
    if (isGroup) {
      return (
        <>
          <div
            onClick={() => {
              onSetStep(STEP.CHAT_DETAIL_GROUP);
            }}
            style={{ position: "relative", cursor: "pointer" }}
          >
            {avatar ? (
              <Avatar
                alt="Avatar"
                size={40}
                src={avatar || undefined}
                onError={() => setAvatar(undefined)}
              />
            ) : (
              <ImageList
                sx={{ width: 56, height: 56, margin: 0 }}
                cols={2}
                rowHeight={164}
              >
                <Avatar
                  alt="Avatar"
                  size={25}
                  style={{
                    borderRadius: "50%",
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
                    <Typography variant="caption">
                      + {usersCount - 3}
                    </Typography>
                  </Box>
                ) : null}
              </ImageList>
            )}
            <IconButton
              style={{
                width: 5,
                height: 5,
                position: "absolute",
                right: -2,
                bottom: -2,
                cursor: "unset",
              }}
            >
              <PointOnline />
            </IconButton>
          </div>
          <Box
            onClick={() => {
              onSetStep(STEP.CHAT_DETAIL_GROUP);
            }}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Typography
              variant="inherit"
              fontWeight="bold"
              style={{ cursor: "pointer" }}
            >
              {dataTransfer?.fname
                ? dataTransfer?.fname?.replaceAll("_", " ")
                : dataTransfer?.name
                ? dataTransfer?.name?.replaceAll("_", " ")
                : name}
            </Typography>
            <Typography variant="caption">
              {commonChatBox("chatBox.active")}
            </Typography>
          </Box>
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
                maxWidth: "180px",
                fontSize: "16px",
                fontWeight: 600,
                color: "white",
                textAlign: "left",
                flex: 1,
              }}
            >
              {dataTransfer?.name?.replaceAll("_", " ")}
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
                color: "white",
                textAlign: "center",
                flex: 1,
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
                onSetStep(STEP.CHAT_GROUP, dataTransfer);
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
              },
              "& fieldset": { border: "none" },
            }}
            placeholder="Search"
            fullWidth
            onKeyDown={handleKeyDown}
            InputProps={{
              disableUnderline: true, // <== added this
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "#999999",
                      fontSize: "24px",
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
              gap: "10px",
              padding: 1,
              borderBottom: "1px solid #ECECF3",
              backgroundColor: "#3699FF",
            }}
          >
            <IconButton
              sx={{
                cursor: "pointer",
                color: "#FFFFFF",
                padding: "0px!important",
              }}
              onClick={onPrevious}
            >
              <ArrowDownIcon />
            </IconButton>
            {_renderItemHeader(viewStep)}

            <Box ml="auto">
              {viewStep == STEP.CHAT_DETAIL_GROUP && (
                <IconButton>
                  <SearchIcon
                    sx={{
                      color: "#FFFFFF",
                      // fontSize: "24px!important",
                    }}
                    onClick={() => {
                      onSetStep(STEP.SEARCH_CHAT_TEXT);
                    }}
                  />
                </IconButton>
              )}
              <IconButton
                sx={{
                  color: "white",
                }}
                onClick={() => {
                  onSetStep(STEP.ADD_MEMBER, {
                    ...dataTransfer,
                    openFrom: currStep,
                  });
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
            {viewStep != STEP.CHAT_DETAIL_GROUP && viewStep != STEP.LIST && (
              <IconButton
                onClick={() => {
                  onSetStep(STEP.CHAT_DETAIL_GROUP);
                }}
                sx={{
                  color: "white",
                }}
              >
                <InfoUserIcon />
              </IconButton>
            )}
          </Box>
        );
    }
  };

  return <>{_renderHeader(viewStep)}</>;
};

export default AccountInfoHeader;
