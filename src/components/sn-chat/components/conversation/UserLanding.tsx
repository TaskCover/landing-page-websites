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
import { STEP } from "store/chat/type";

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

const UserLanding = () => {
  const { currStep, prevStep, conversationInfo, onSetStep } = useChat();

  const { avatar, name } = conversationInfo || {};
  console.log("userPartner", conversationInfo);

  return (
    <>
      <ProfileHeader
        name={name || ""}
        onPrevious={() => {
          onSetStep(prevStep);
        }}
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
            onClick={() => onSetStep(STEP.USER_INFO)}
          />
          <ItemProfile
            Icon={MediaFileIcon}
            title="Media file"
            onClick={() => onSetStep(STEP.MEDIA)}
          />
          <ItemProfile
            Icon={LinkIcon}
            title="Link"
            onClick={() => onSetStep(STEP.LINK)}
          />
          <ItemProfile
            Icon={FileBasicIcon}
            title="File"
            onClick={() => onSetStep(STEP.FILE)}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserLanding;
