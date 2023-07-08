import React, { memo, useMemo, useRef } from "react";
import { Box, ButtonBase, MenuItem, MenuList, Stack } from "@mui/material";
import { Status } from "constant/enums";
import PopoverLayout from "./PopoverLayout";
import {
  AN_ERROR_TRY_AGAIN,
  COLOR_STATUS,
  NS_COMMON,
  NS_PROJECT,
  STATUS_OPTIONS,
} from "constant/index";
import { useTranslations } from "next-intl";
import { Text } from "components/shared";
import { useSnackbar } from "store/app/selectors";
import { useTaskDetail } from "store/project/selectors";
import { getMessageErrorByAPI } from "utils/index";
import BlockingIcon from "icons/BlockingIcon";
import PauseCircleIcon from "icons/PauseCircleIcon";
import AttachCircleIcon from "icons/AttachCircleIcon";
import { Dependency, DependencyStatus } from "store/project/actions";

type StatusDependencyProps = {
  // status: Status;
  // dependency: string;
};

const StatusDependency = (props: StatusDependencyProps) => {
  const { taskListId, taskId, onUpdateTask, task, subTaskId } = useTaskDetail();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { onAddSnackbar } = useSnackbar();

  const options = useMemo(
    () => OPTIONS.map((item) => ({ ...item, label: projectT(item.label) })),
    [projectT],
  );

  // const iconSelected = useMemo(() => )

  const onChangeStatus = (newStatus: DependencyStatus) => {
    return async () => {
      try {
        if (!taskListId || !taskId) {
          throw AN_ERROR_TRY_AGAIN;
        }
        // const newDependencies = [...(task?.dependencies ?? [])];
        // newDependencies[index] = {
        //   ...newDependencies[index],
        //   status: newStatus,
        // };
        // await onUpdateTask(
        //   { dependencies: newDependencies },
        //   taskListId,
        //   taskId,
        //   subTaskId,
        // );
        buttonRef?.current?.click();
      } catch (error) {
        onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
      }
    };
  };
  return (
    <PopoverLayout ref={buttonRef} label={<h2>sâs</h2>}>
      <MenuList component={Box} sx={{ pb: 0 }}>
        {options.map((option) => (
          <MenuItem
            component={ButtonBase}
            onClick={onChangeStatus(option.value)}
            sx={defaultSx.item}
            key={option.value}
          >
            <Stack direction="row" alignItems="center" spacing={1} width="100%">
              <Box
                width={16}
                height={16}
                bgcolor={`${COLOR_STATUS[option.value]}.main`}
              />
              <Text variant="body2">{option.label}</Text>
            </Stack>
          </MenuItem>
        ))}
      </MenuList>
    </PopoverLayout>
  );
};

export default memo(StatusDependency);

const OPTIONS = [
  {
    label: "taskDetail.blocking",
    value: DependencyStatus.BLOCKING,
    icon: <BlockingIcon color="error" />,
  },
  {
    label: "taskDetail.waitingOn",
    value: DependencyStatus.WAITING_ON,
    icon: <PauseCircleIcon color="warning" />,
  },
  {
    label: "taskDetail.linkedTo",
    value: DependencyStatus.LINKED_TO,
    icon: <AttachCircleIcon sx={{ color: "grey.400" }} />,
  },
];

const defaultSx = {
  item: {
    fontSize: 14,
    color: "text.primary",
    lineHeight: "22px",
    backgroundColor: "grey.50",
    width: "100%",
    "& > img": {
      mr: 1,
    },
    "&:hover": {
      backgroundColor: "primary.main",
      "& svg": {
        color: "common.white",
      },
    },
  },
};
