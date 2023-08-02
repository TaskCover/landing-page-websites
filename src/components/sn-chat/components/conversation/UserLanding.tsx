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
import { STEP_INFO } from "store/chat/type";
import React, { useEffect, useMemo, useState } from "react";
import MessageListSearch from "../messages/MessageListSearch";

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
    <Box display="flex" gap="1rem" ml="1rem" mr="1.5rem" alignItems="center">
      <Icon
        sx={{
          fill: "none",
          color: "#666666",
          filter: "opacity(0.8)",
        }}
      />
      <Typography>{title}</Typography>
      <ArrowDownIcon
        onClick={onClick}
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
  children?: React.ReactNode;
  onPrevious: () => void;
  onSetMediaStep: (step: STEP_INFO) => void;
}
const UserLanding = ({
  displayUserInfo,
  children,
  onPrevious,
  onSetMediaStep,
}: UserLandingProps) => {
  const { conversationInfo, onSearchChatText } = useChat();
  const { avatar, name } = conversationInfo || {};
  const [stateSearch, setStateSearch] = useState<{
    isSearch: boolean;
    isToggle?: boolean;
    text: string;
  }>({ isSearch: false, isToggle: false, text: "" });

  const text = stateSearch.text;
  const isToggle = stateSearch.isToggle;
  const isSearch = stateSearch.isSearch;

  useEffect(() => {
    if (text && isSearch) {
      onSearchChatText({ text: stateSearch.text, type: "d" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSearchChatText, isToggle]);

  const renderContent = useMemo(() => {
    if (stateSearch.isSearch) {
      return (
        <Box overflow="auto" maxHeight="calc(600px - 74px)">
          <MessageListSearch
            text={stateSearch.text}
            type="d"
            onSelectMessage={(message) => {
              setStateSearch({ isSearch: false, text: "" });
              onPrevious();
            }}
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
              border: "1px solid #efefef",
            }}
          />
          <Box display="flex" flexDirection="column" gap={2} mt={5}>
            <ItemProfile
              Icon={ProfileCircleIcon}
              title="Account infomation"
              onClick={() => onSetMediaStep(STEP_INFO.USER)}
            />
            <ItemProfile
              Icon={MediaFileIcon}
              title="Media file"
              onClick={() => onSetMediaStep(STEP_INFO.MEDIA)}
            />
            <ItemProfile
              Icon={LinkIcon}
              title="Link"
              onClick={() => onSetMediaStep(STEP_INFO.LINK)}
            />
            <ItemProfile
              Icon={FileBasicIcon}
              title="File"
              onClick={() => onSetMediaStep(STEP_INFO.FILE)}
            />
          </Box>
        </Box>
      );
    }
  }, [avatar, onPrevious, onSetMediaStep, stateSearch]);
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        zIndex: 100,
        width: "100%",
        height: "600px",
        minHeight: "600px",
        backgroundColor: "white",
        display: displayUserInfo ? "block" : "none",
      }}
    >
      {!children ? (
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
          />
          {renderContent}
        </>
      ) : (
        children
      )}
    </Box>
  );
};

export default UserLanding;
