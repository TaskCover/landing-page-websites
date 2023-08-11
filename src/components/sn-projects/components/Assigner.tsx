import { memo, useEffect, useMemo, useState } from "react";
import { useEmployeeOptions } from "store/company/selectors";

import { NS_COMMON, NS_PROJECT } from "constant/index";
import { useTranslations } from "next-intl";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI, getPath } from "utils/index";

import { useProjects } from "store/project/selectors";
import { useParams } from "next/navigation";
import { DEFAULT_PAGING } from "constant/index";
import { Popover, Stack, Typography } from "@mui/material"; // Replace with the correct imports
import { BodyCell } from "components/Table";
import useQueryParams from "hooks/useQueryParams";

type AssignerProps = {
  value?: string;
  id: string;
};

const Assigner = (props: AssignerProps) => {
  const { value, id } = props;

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);
  const { initQuery, isReady, query } = useQueryParams();

  const {
    options: employeeOptions,
    onGetOptions,
    isFetching,
    filters,
    pageSize,
    pageIndex,
    totalPages,
  } = useEmployeeOptions();
  const { onUpdateProject, onGetProjects } = useProjects();
  const { onAddSnackbar } = useSnackbar();

  const { id: projectId } = useParams() as { id: string };

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleAssigner = async (newAssigner) => {
    try {
      await onUpdateProject(id, { owner: newAssigner.value });
      onGetProjects({ ...DEFAULT_PAGING, ...initQuery });
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
        id={id}
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

export default memo(Assigner);

const AssignerLabel = ({ children, onClick, ...rest }) => {
  if (!children) return <BodyCell />;
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
        {children}
      </Typography>
    </Stack>
  );
};
