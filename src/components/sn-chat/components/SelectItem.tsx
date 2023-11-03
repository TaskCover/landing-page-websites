import Box from "@mui/material/Box";
import Avatar from "components/Avatar";
import { Checkbox, ImageList, Typography } from "@mui/material";
import { IChatItemInfo } from "store/chat/type";
import { ChangeEvent, useMemo } from "react";
import CircleUnchecked from "icons/CircleUnchecked";
import CircleCheckedFilled from "icons/CircleCheckedFilled";
import { Button } from "components/shared";
import { Employee } from "store/company/reducer";
import useTheme from "hooks/useTheme";

interface SelectItemProp {
  employeeIdSelected: object;
  employee: Employee;
  onClick?: (event: ChangeEvent<HTMLInputElement>) => void;
  checkbox?: boolean;
  onClickItem?: () => void;
  forwardMess: boolean;
}
const SelectItem = ({
  employeeIdSelected = {},
  employee,
  onClick,
  checkbox,
  onClickItem,
  forwardMess = false,
}: SelectItemProp) => {
  const { fullname, email, avatar } = employee;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
          backgroundColor: isDarkMode ? "#3a3b3c" : "#F7F7FD",
        },
      }}
      p={1}
      onClick={onClickItem}
    >
      {checkbox && (
        <>
          {forwardMess ? (
            <Checkbox
              checked={
                employeeIdSelected?.hasOwnProperty(employee._id) &&
                employeeIdSelected[employee._id] === true
              }
              onChange={onClick}
              {...label}
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
            />
          ) : (
            <Checkbox
              onChange={onClick}
              {...label}
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
            />
          )}
        </>
      )}
      <Avatar
        src={avatar?.link}
        alt="Avatar"
        size={42}
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
