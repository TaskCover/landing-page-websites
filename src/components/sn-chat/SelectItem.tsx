import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Checkbox, ImageList, Typography } from "@mui/material";
import { ChatItemInfo } from "store/chat/type";
import { ChangeEvent, useMemo } from "react";
import CircleUnchecked from "icons/CircleUnchecked";
import CircleCheckedFilled from "icons/CircleCheckedFilled";
import { Button } from "components/shared";
import { Employee } from "store/company/reducer";

interface SelectItemProp {
  employee: Employee;
  onClick: (event: ChangeEvent<HTMLInputElement>) => void;
}
const SelectItem = ({ employee, onClick }: SelectItemProp) => {
  const { fullname, email, avatar } = employee;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: 1,
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#F7F7FD",
        },
      }}
      p={1.5}
    >
      
      <Typography variant="caption" color="#999999">
        <Checkbox
        onChange={onClick}
        {...label}
        icon={<CircleUnchecked />}
        checkedIcon={<CircleCheckedFilled />}
      />
      </Typography>
      <Avatar
        src={avatar?.link}
        alt="Avatar"
        size={56}
        style={{
          borderRadius: "50%",
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
export default SelectItem;