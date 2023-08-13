import { memo, useState } from "react";
import { useTaskDetail } from "store/project/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { AN_ERROR_TRY_AGAIN, NS_COMMON, NS_PROJECT } from "constant/index";
import { StatusCell } from "components/Table";
import { COLOR_STATUS } from "./helpers";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";

import { Status } from "constant/enums";
import TextStatus from "components/TextStatus";
import { TASK_TEXT_STATUS } from "components/sn-project-detail/Tasks/components";

type SelectStatusTaskProps = {
  value: Status;
  taskListId: string;
  taskId: string;
  subTaskId?: string;
};

const SelectStatusTask = (props: SelectStatusTaskProps) => {
  const { value, taskListId, taskId, subTaskId } = props;
  const { onAddSnackbar } = useSnackbar();
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);
  const [status, setStatus] = useState(value || Status.ACTIVE);
  const [anchorEl, setAnchorEl] = useState(null);
  const { onUpdateTask } = useTaskDetail();

  const handleChange = async (newStatus: Status) => {
    try {
      if (!newStatus || !taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newData = await onUpdateTask(
        { status: newStatus },
        taskListId,
        taskId,
        subTaskId,
      );
      if (newData) {
        onAddSnackbar(
          projectT("detail.notification.changeStatusSuccess"),
          "success",
        );
        setStatus(newStatus)
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
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
      <TextStatus
        color={COLOR_STATUS[status]}
        text={TASK_TEXT_STATUS[status]}
        width={110}
        onClick={handleStatusCellClick}
        style={{ cursor: "pointer" }}
      />

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
