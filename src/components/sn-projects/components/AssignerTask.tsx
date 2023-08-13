import { memo, useEffect, useMemo, useState } from "react";
import { useEmployeeOptions } from "store/company/selectors";

import { AN_ERROR_TRY_AGAIN, NS_COMMON, NS_PROJECT } from "constant/index";
import { useTranslations } from "next-intl";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";

import { useTaskDetail } from "store/project/selectors";
import { Popover, Stack, Typography } from "@mui/material"; // Replace with the correct imports

type AssignerTaskProps = {
  value?: string;
  taskListId: string;
  taskId: string;
  subTaskId?: string;
};

const AssignerTask = (props: AssignerTaskProps) => {
  const { value, taskListId, taskId, subTaskId } = props;

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const {
    options: employeeOptions,
    onGetOptions,
  } = useEmployeeOptions();
  const { onAddSnackbar } = useSnackbar();

  const { onUpdateTask } = useTaskDetail();

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleAssigner = async (owner) => {
    try {
      if (!taskListId || !taskId) {
        throw AN_ERROR_TRY_AGAIN;
      }
      const newData = await onUpdateTask(
        { owner: owner.value },
        taskListId,
        taskId,
        subTaskId,
      );
      if (newData) {
        onAddSnackbar(
          projectT("taskDetail.notification.assignSuccess"),
          "success",
        );
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  const employeeOptionsWithLabel = useMemo(
    () =>
      employeeOptions.map((item) => ({
        ...item,
        label: item.label,
        subText: item.subText,
      })),
    [employeeOptions],
  );
  return (
    <>
      <AssignerLabel onClick={handleClick}>{value}</AssignerLabel>
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
        <div style={{ minWidth: "200px" }}>
          {/* Render your popover content here */}
          {employeeOptionsWithLabel.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                handleAssigner(item);
                handleClose();
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "12px",
                paddingRight: "12px",
                color: "grey.600",
                fontSize: "14px",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </Popover>
    </>
  );
};

export default memo(AssignerTask);

const AssignerLabel = ({ children, onClick, ...rest }) => {
  return (
    <Stack
      component="p"
      direction="row"
      alignItems="center"
      spacing={1.25}
      px={2}
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      {...rest}
    >
      <Typography
        variant="body2"
        component="span"
        overflow="hidden"
        color="grey.400"
      >
        {children || 'Assigner'}
      </Typography>
    </Stack>
  );
};
