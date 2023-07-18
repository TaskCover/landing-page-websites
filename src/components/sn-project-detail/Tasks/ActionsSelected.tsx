import { memo, useMemo } from "react";
import { Stack, Theme, selectClasses } from "@mui/material";
import { IconButton, Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT, STATUS_OPTIONS } from "constant/index";
import { formatNumber, getMessageErrorByAPI } from "utils/index";
import { AssignerFilter, MoreList, Selected } from "./components";
import { Date, Dropdown } from "components/Filters";
import { useSnackbar } from "store/app/selectors";
import { useTaskDetail } from "store/project/selectors";
import { TaskData } from "store/project/actions";
import CloseIcon from "icons/CloseIcon";
import useTheme from "hooks/useTheme";

type ActionsSelectedProps = {
  selectedList: Selected[];
  onReset: () => void;
};

const ActionsSelected = (props: ActionsSelectedProps) => {
  const { selectedList, onReset } = props;
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);
  const { onUpdateTask } = useTaskDetail();

  const { onAddSnackbar } = useSnackbar();

  const { isDarkMode } = useTheme();

  const statusOptions = useMemo(
    () =>
      STATUS_OPTIONS.map((item) => ({ ...item, label: commonT(item.label) })),
    [commonT],
  );

  const onChange = (name: string, value) => {
    onUpdateTasks({ [name]: value }, name);
  };

  const onUpdateTasks = async (data: Partial<TaskData>, name: string) => {
    try {
      const selectedTasks = selectedList.filter((item) => item?.taskId);
      for (const item of selectedTasks) {
        await onUpdateTask(
          data,
          item.taskListId as string,
          item.taskId as string,
          item?.subTaskId,
        );
      }
      onAddSnackbar(
        projectT("detailTasks.notification.actionTaskSuccess", {
          label: projectT(`detailTasks.keys.${name}`),
        }),
        "success",
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor={isDarkMode ? "background.default" : "primary.light"}
      px={3}
      py={{ xs: 1, md: 0.75 }}
      position="sticky"
      top={{ xs: 60, sm: 61 }}
      zIndex={1}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {!!selectedList.length && (
          <>
            <Text variant="h6" color="grey.400">
              {projectT("detailTasks.selectedCount", {
                value: formatNumber(selectedList.length),
              })}
            </Text>
            <IconButton
              noPadding
              onClick={onReset}
              tooltip={projectT("detailTasks.resetSelected")}
            >
              <CloseIcon sx={{ color: "grey.400", fontSize: 18 }} />
            </IconButton>
          </>
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 1, md: 1.5, xl: 3 }}
        justifyContent="flex-end"
        flexWrap="wrap"
        rowGap={1}
      >
        <AssignerFilter
          onChange={onChange}
          placeholder={projectT("detailTasks.assignee")}
          hasAvatar
          name="owner"
          disabled={!selectedList.length}
          rootSx={{
            "& >svg": { fontSize: 16 },
            px: "0px!important",
            [`& .${selectClasses.outlined}`]: {
              pr: "0!important",
              mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                `${spacing(4)}!important`,
              "& .sub": {
                display: "none",
              },
            },
          }}
        />
        <Date
          label={commonT("form.title.startDate")}
          name="start_date"
          onChange={onChange}
          disabled={!selectedList.length}
          iconProps={{
            sx: {
              fontSize: 16,
            },
          }}
        />
        <Date
          label={commonT("form.title.dueDate")}
          name="end_date"
          onChange={onChange}
          disabled={!selectedList.length}
          iconProps={{
            sx: {
              fontSize: 16,
            },
          }}
        />
        <Dropdown
          placeholder={commonT("status")}
          options={statusOptions}
          name="status"
          onChange={onChange}
          disabled={!selectedList.length}
          rootSx={{
            "& >svg": { fontSize: 16 },
            px: "0px!important",
            [`& .${selectClasses.outlined}`]: {
              pr: "0!important",
              mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                `${spacing(4)}!important`,
              "& .sub": {
                display: "none",
              },
            },
          }}
        />
        <MoreList {...props} />
      </Stack>
    </Stack>
  );
};

export default memo(ActionsSelected);