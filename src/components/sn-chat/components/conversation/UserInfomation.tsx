import { useChat } from "store/chat/selectors";
import ProfileHeader from "../common/ProfileHeader";
import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { SxProps, Typography } from "@mui/material";
import { STEP } from "store/chat/type";
import { useAuth } from "store/app/selectors";
import { useEffect } from "react";
import { DataStatus } from "constant/enums";

const UserInfomation = () => {
  const {
    conversationInfo,
    partnerInfo,
    partnerInfoStatus,
    onSetStep,
    onGetUserInfo,
  } = useChat();
  const { avatar, name, partnerUsername } = conversationInfo || {};
  useEffect(() => {
    if (partnerUsername) {
      onGetUserInfo(partnerUsername);
    }
  }, [onGetUserInfo, partnerUsername]);

  const styleFormItem: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& :first-of-type": {
      whiteSpace: "nowrap",
    },
    "& :last-of-type": {
      textAlign: "end",
    },
  };

  return (
    <>
      <ProfileHeader
        name={name || ""}
        onPrevious={() => {
          onSetStep(STEP.VIEW_DETAIL_USER);
        }}
      />
      <Box textAlign="center" mt={2}>
        {partnerInfoStatus === DataStatus.LOADING ||
        partnerInfoStatus === DataStatus.FAILED ? (
          <>Loading...</>
        ) : (
          <>
            <Avatar
              alt="Avatar"
              src={avatar || undefined}
              size={120}
              style={{
                borderRadius: "10px",
                border: "1px solid #efefef",
              }}
            />
            <Box display="flex" flexDirection="column" gap={2} mt={5} p="1rem">
              <Box sx={styleFormItem}>
                <Typography color="#666666">Họ tên</Typography>
                <Typography>{partnerInfo?.fullname}</Typography>
              </Box>
              <Box sx={styleFormItem}>
                <Typography color="#666666">Chức vụ</Typography>
                <Typography>{partnerInfo?.position.name}</Typography>
              </Box>
              <Box sx={styleFormItem}>
                <Typography color="#666666">Số điện thoại</Typography>
                <Typography>{partnerInfo?.phone}</Typography>
              </Box>
              <Box sx={styleFormItem}>
                <Typography color="#666666">Email</Typography>
                <Typography>{partnerInfo?.email}</Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default UserInfomation;
