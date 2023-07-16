import { useChat } from "store/chat/selectors";
import ProfileHeader from "../common/ProfileHeader";
import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Typography } from "@mui/material";

const UserInfomation = () => {
  const { currStep, prevStep, userPartner, onSetStep } = useChat();

  const { avatar } = userPartner || {};
  console.log("userPartner", userPartner);

  return (
    <>
      <ProfileHeader
        name={"Martin Randolph"}
        onPrevious={() => {
          onSetStep(prevStep);
        }}
      />
      <Box textAlign="center" mt={2}>
        <Avatar
          alt="Avatar"
          src={avatar || undefined}
          size={120}
          style={{
            borderRadius: "10px",
          }}
        />
        <Box display="flex" flexDirection="column" gap={2} mt={5} p="1rem">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#666666">Họ tên</Typography>
            <Typography>Martin Randolph</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#666666">Chức vụ</Typography>
            <Typography>Trưởng phòng</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#666666">Số điện thoại</Typography>
            <Typography>Số điện thoại</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#666666">Email</Typography>
            <Typography>lethaihieu@gmail.com@gmail.com</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserInfomation;
