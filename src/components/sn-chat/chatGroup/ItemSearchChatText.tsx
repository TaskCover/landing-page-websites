import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { Button } from "components/shared";
import { Employee } from "store/company/reducer";
import useTheme from "hooks/useTheme";

interface ItemSearchChatTextProp {
  employee: Employee;
  onClick?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickItem?: () => void;
}
const ItemSearchChatText = ({
  employee,
  onClick,
  onClickItem,
}: ItemSearchChatTextProp) => {
  const { fullname, email, avatar } = employee;
  const { isDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: 1,
        // cursor: "pointer",
        ":hover": {
          backgroundColor: isDarkMode ? "#3a3b3c" : "#F7F7FD"        },
      }}
      p={1}
      onClick={onClickItem}
    >
      <Avatar
        src={avatar?.link}
        alt="Avatar"
        size={42}
        style={{
          borderRadius: "10px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="inherit" fontWeight="bold">
          {fullname}
        </Typography>
        <Typography variant="caption" color="#999999">
          {email}
        </Typography>
      </Box>
    </Box>
  );
};
export default ItemSearchChatText;
