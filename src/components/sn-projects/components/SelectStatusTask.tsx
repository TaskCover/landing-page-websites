import { memo, useState } from "react";
import { StatusCell } from "components/Table";
import { COLOR_STATUS } from "./helpers";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";

import { Status } from "constant/enums";
import TextStatus from "components/TextStatus";
import { TASK_TEXT_STATUS } from "components/sn-project-detail/Tasks/components";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        onClick={handleStatusCellClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}>
        <TextStatus
          color={COLOR_STATUS[value]}
          text={TASK_TEXT_STATUS[value]}
          width={120}
        />
        <KeyboardArrowDownIcon />
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
              sx={{
                '& td': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }}
            >
              <StatusCell
                text={TASK_TEXT_STATUS[statusValue]}
                color={COLOR_STATUS[statusValue]}
                width={120}
              />
            </MenuItem>
          );
        })}
      </Popover>
    </div>
  );
};

export default memo(SelectStatusTask);
