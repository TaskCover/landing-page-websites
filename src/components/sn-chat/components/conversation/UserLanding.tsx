import { useChat } from "store/chat/selectors";
import ProfileHeader from "../common/ProfileHeader";
import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Typography } from "@mui/material";
import ProfileCircleIcon from "icons/ProfileCircleIcon";
import ArrowDownIcon from "icons/ArrowDownIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import LinkIcon from "icons/LinkIcon";
import FileBasicIcon from "icons/FileBasicIcon";
import { MessageSearchInfo, STEP_INFO } from "store/chat/type";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MessageListSearch from "../messages/MessageListSearch";
import { useSnackbar } from "store/app/selectors";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import UserInfo from "./UserInfo";
import GroupMediaProfile from "./GroupMediaProfile";

const ItemProfile = ({
  Icon,
  title,
  onClick,
}: {
  Icon: React.ElementType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <Box
      display="flex"
      gap="1rem"
      ml="1rem"
      mr="1.5rem"
      alignItems="center"
      sx={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Icon
        sx={{
          fill: "none",
          color: "#666666",
          filter: "opacity(0.8)",
        }}
      />
      <Typography>{title}</Typography>
      <ArrowDownIcon
        sx={{
          ml: "auto",
          transform: "rotate(180deg)",
          filter: "opacity(0.5)",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

interface UserLandingProps {
  displayUserInfo: boolean;
  onPrevious: () => void;
}
const UserLanding = ({ displayUserInfo, onPrevious }: UserLandingProps) => {
  const {
    conversationInfo,
    stateSearchMessage,
    onSetStateSearchMessage,
    onSearchChatText,
  } = useChat();
  const { onAddSnackbar } = useSnackbar();
  const t = useTranslations(NS_COMMON);
  const { avatar, name } = conversationInfo || {};
  const [stateSearch, setStateSearch] = useState<{
    isSearch: boolean;
    isToggle?: boolean;
    text: string;
  }>({ isSearch: false, isToggle: false, text: "" });
  const [stepMedia, setStepMedia] = useState<STEP_INFO>(STEP_INFO.IDLE);
  const [isShowMedia, setShowMedia] = useState(false);

  const text = stateSearch.text;
  const isToggle = stateSearch.isToggle;
  const isSearch = stateSearch.isSearch;

  const handleSearchChatText = useCallback(async () => {
    try {
      if (text && isSearch) {
        await onSearchChatText({ text: stateSearch.text, type: "d" });
      }
    } catch (error) {
      onAddSnackbar(
        typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
        "error",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToggle, onSearchChatText, t]);

  useEffect(() => {
    handleSearchChatText();
  }, [handleSearchChatText]);

  const handleSelectMessage = useCallback(
    (message: MessageSearchInfo) => {
      if (
        !stateSearchMessage ||
        stateSearchMessage.messageId !== message.messageId
      ) {
        onSetStateSearchMessage(message);
      }
      setStateSearch({ isSearch: false, text: "" });
      onPrevious();
    },
    [onPrevious, onSetStateSearchMessage, stateSearchMessage],
  );

  const resetForm = (step: STEP_INFO) => {
    setShowMedia(false);
    setTimeout(() => {
      setStepMedia(step);
    }, 200);
  };

  const renderContent = useMemo(() => {
    if (stateSearch.isSearch) {
      return (
        <Box overflow="auto" maxHeight="calc(600px - 65px)">
          <MessageListSearch
            text={stateSearch.text}
            type="d"
            onSelectMessage={handleSelectMessage}
          />
        </Box>
      );
    } else {
      return (
        <Box textAlign="center" mt={2}>
          <Avatar
            alt="Avatar"
            src={avatar || undefined}
            size={80}
            style={{
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
          <Box display="flex" flexDirection="column" gap={2} mt={5}>
            <ItemProfile
              Icon={ProfileCircleIcon}
              title="Account infomation"
              onClick={() => {
                setStepMedia(STEP_INFO.USER);
                setShowMedia(true);
              }}
            />
            <ItemProfile
              Icon={MediaFileIcon}
              title="Media file"
              onClick={() => {
                setStepMedia(STEP_INFO.MEDIA);
                setShowMedia(true);
              }}
            />
            <ItemProfile
              Icon={LinkIcon}
              title="Link"
              onClick={() => {
                setStepMedia(STEP_INFO.LINK);
                setShowMedia(true);
              }}
            />
            <ItemProfile
              Icon={FileBasicIcon}
              title="File"
              onClick={() => {
                setStepMedia(STEP_INFO.FILE);
                setShowMedia(true);
              }}
            />
          </Box>
        </Box>
      );
    }
  }, [avatar, handleSelectMessage, stateSearch.isSearch, stateSearch.text]);

  const renderMediaContent = useMemo(() => {
    switch (stepMedia) {
      case STEP_INFO.USER:
        return <UserInfo onPrevious={resetForm} />;
      case STEP_INFO.MEDIA:
      case STEP_INFO.LINK:
      case STEP_INFO.FILE:
        return <GroupMediaProfile type={stepMedia} onPrevious={resetForm} />;
      default:
        return null;
    }
  }, [stepMedia]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "600px",
        minHeight: "600px",
        backgroundColor: "white",
        transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transform: `translate(${displayUserInfo ? "0" : "100%"}, -100%)`,
        position: "relative",
        zIndex: 1,
      }}
    >
      <>
        <ProfileHeader
          name={name || ""}
          onPrevious={onPrevious}
          textSearch={stateSearch.text}
          isSearch={stateSearch.isSearch}
          onChangeText={(value) =>
            setStateSearch((prev) => ({ ...prev, text: value }))
          }
          onSearch={(text: string, isSearch: boolean) => {
            setStateSearch((prev) => ({
              text,
              isSearch,
              isToggle: !prev.isToggle,
            }));
          }}
          nameProps={{
            sx: {
              maxWidth: "100%",
              width: "200px",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            },
          }}
        />
        {renderContent}
        <Box
          sx={{
            width: "100%",
            height: "600px",
            minHeight: "600px",
            backgroundColor: "white",
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transform: `translate(${isShowMedia ? "0" : "100%"}, -100%)`,
            position: "absolute",
            top: "100%",
          }}
        >
          {renderMediaContent}
        </Box>
      </>
    </Box>
  );
};

export default UserLanding;
