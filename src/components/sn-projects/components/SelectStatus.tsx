import { memo, useMemo, useState } from "react";
import { useProjects } from "store/project/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { StatusCell } from "components/Table";
import { COLOR_STATUS, TEXT_STATUS, STATUS_OPTIONS } from "./helpers";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import useQueryParams from "hooks/useQueryParams";
import { DEFAULT_PAGING } from "constant/index";

import { ProjectStatus } from "store/project/actions";
import { Button, Typography, Select } from "@mui/material";

type SelectStatusProps = {
  value?: ProjectStatus;
  id: string;
};

const SelectStatus = (props: SelectStatusProps) => {
  const { value, id } = props;
  const { onUpdateProject, onGetProjects } = useProjects();
  const { onAddSnackbar } = useSnackbar();
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);
  const [status, setStatus] = useState(value || ProjectStatus.ACTIVE);
  const { initQuery, isReady, query } = useQueryParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const onToggleStatus = async (newStatus) => {
    try {
      await onUpdateProject(id, { status: newStatus });
      setStatus(newStatus);
      onGetProjects({ ...DEFAULT_PAGING, ...initQuery });
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const handleChange = (event) => {
    const newStatus = event.target.value;
    onToggleStatus(newStatus);
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
      <StatusCell
        text={TEXT_STATUS[status]}
        color={COLOR_STATUS[status]}
        width={93}
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
        <MenuItem
          value={ProjectStatus.ACTIVE}
          onClick={() => {
            handleChange({ target: { value: ProjectStatus.ACTIVE } });
            handleClose();
          }}
        >
          <StatusCell
            text={TEXT_STATUS[ProjectStatus.ACTIVE]}
            color={COLOR_STATUS[ProjectStatus.ACTIVE]}
            width={90}
          />
        </MenuItem>
        <MenuItem
          value={ProjectStatus.PAUSE}
          onClick={() => {
            handleChange({ target: { value: ProjectStatus.PAUSE } });
            handleClose();
          }}
        >
          <StatusCell
            text={TEXT_STATUS[ProjectStatus.PAUSE]}
            color={COLOR_STATUS[ProjectStatus.PAUSE]}
            width={90}
          />
        </MenuItem>
        <MenuItem
          value={ProjectStatus.CLOSE}
          onClick={() => {
            handleChange({ target: { value: ProjectStatus.CLOSE } });
            handleClose();
          }}
        >
          <StatusCell
            text={TEXT_STATUS[ProjectStatus.CLOSE]}
            color={COLOR_STATUS[ProjectStatus.CLOSE]}
            width={90}
          />
        </MenuItem>
      </Popover>
    </>
  );
};

export default memo(SelectStatus);
