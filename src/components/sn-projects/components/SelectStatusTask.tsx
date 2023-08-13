import { memo, useState } from "react";
import { StatusCell } from "components/Table";
import { COLOR_STATUS } from "./helpers";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";

import { Status } from "constant/enums";
import TextStatus from "components/TextStatus";
import { TASK_TEXT_STATUS } from "components/sn-project-detail/Tasks/components";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

type SelectStatusTaskProps = {
  value: Status;
  onHandler: (newValue: string) => void
};

const SelectStatusTask = (props: SelectStatusTaskProps) => {
  const { value, onHandler } = props;
  const [status, setStatus] = useState(value || Status.ACTIVE);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = async (newStatus: Status) => {
    onHandler(newStatus)
    setStatus(newStatus)
  };

  const handleStatusCellClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        onClick={handleStatusCellClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}>
        <TextStatus
          color={COLOR_STATUS[status]}
          text={TASK_TEXT_STATUS[status]}
          width={110}
        />
        <ArrowDropDownIcon />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {Object.keys(Status).map((statusKey) => {
          const statusValue = Status[statusKey] as Status;
          return (
            <MenuItem
              key={statusValue}
              value={statusValue}
              onClick={() => {
                handleChange(statusValue);
                handleClose();
              }}
            >
              <StatusCell
                text={TASK_TEXT_STATUS[statusValue]}
                color={COLOR_STATUS[statusValue]}
                width={90}
              />
            </MenuItem>
          );
        })}
      </Popover>
    </>
  );
};

export default memo(SelectStatusTask);
