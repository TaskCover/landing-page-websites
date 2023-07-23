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
import React from "react";

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
  const { conversationInfo } = useChat();
  const { avatar, name } = conversationInfo || {};

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        zIndex: 15,
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
            onSearch={(text: string) => {
              console.log("search", text);
            }}
          />
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
        </>
      ) : (
        children
      )}
    </Box>
  );
};

export default UserLanding;
