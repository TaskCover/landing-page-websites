import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
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
      for (const item of selectedList) {
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
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="primary.light"
      px={3}
      py={2}
      position="sticky"
      top={60}
      zIndex={1}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
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
      </Stack>

      <Stack direction="row" alignItems="center" spacing={3}>
        <AssignerFilter
          onChange={onChange}
          placeholder={projectT("detailTasks.assignee")}
          hasAvatar
        />
        <Date
          label={commonT("form.title.startDate")}
          name="start_date"
          onChange={onChange}
        />
        <Date
          label={commonT("form.title.dueDate")}
          name="end_date"
          onChange={onChange}
        />
        <Dropdown
          placeholder={commonT("status")}
          options={statusOptions}
          name="status"
          onChange={onChange}
        />
        <MoreList {...props} />
      </Stack>
    </Stack>
  );
};

export default memo(ActionsSelected);
