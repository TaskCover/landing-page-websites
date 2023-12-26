import { Grow, popoverClasses, Popper, Stack } from "@mui/material";
import { memo, useState } from "react";
import { StatusCell } from "components/Table";
import { COLOR_STATUS } from "../../../../sn-projects/components/helpers";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";

import { Status } from "constant/enums";
import TextStatus from "components/TextStatus";
import { TASK_TEXT_STATUS } from "components/sn-project-detail/Tasks/components";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import DescriptionTask from "./DescriptionTask";

type FormDescription = {
  value?: Status;
  description?: string;
  onHandler: (newValue: string) => void;
};

const FormDescription = (props: FormDescription) => {
  const { value, onHandler, description } = props;
  const [status, setStatus] = useState(description || null);
  const [anchorEl, setAnchorEl] = useState(null);

  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickOutside = () => {
    onClose();
  };

  const ref = useOnClickOutside(handleClickOutside);

  const handleChange = async (newStatus: Status) => {
    onHandler(newStatus);
    setStatus(newStatus);
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
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 0,
        }}
      >
        <TextStatus
          color={COLOR_STATUS[value]}
          text={TASK_TEXT_STATUS[value]}
          width={120}
        />
      </div>

      <Popper
        ref={ref}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "white",
            minWidth: 300,
            maxWidth: 340,
          },
          zIndex: 0,
          backgroundColor: "white",
        }}
        transition
        placement={"bottom-start"}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Stack
              py={2}
              sx={{
                boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.2)",
                border: "1px solid",
                borderTopWidth: 0,
                borderColor: "grey.100",
                borderRadius: 1,
                bgcolor: "background.paper",
              }}
            >
              <DescriptionTask
                onClose={handleClose}
                open={true}
                textEdit={status}
              />
            </Stack>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default memo(FormDescription);
