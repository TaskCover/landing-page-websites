import { memo } from "react";
import { Box, Divider, Stack, StackProps } from "@mui/material";
import { Task } from "store/project/reducer";
import { Text } from "components/shared";
import { useTranslations } from "next-intl";
import {
  COLOR_STATUS,
  NS_COMMON,
  NS_PROJECT,
  TEXT_STATUS,
} from "constant/index";
import TextStatus from "components/TextStatus";
import Avatar from "components/Avatar";
import { formatDate, formatNumber } from "utils/index";
import { useTaskDetail } from "store/project/selectors";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
};

const Information = () => {
  const { task } = useTaskDetail();

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  if (!task) return null;

  return (
    <Stack spacing={2} flex={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Text
          variant="h5"
          color="text.primary"
          sx={{ wordBreak: "break-word" }}
        >
          {task.name}
        </Text>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Text variant="caption" color="grey.400">
            {commonT("status")}
          </Text>
          <TextStatus
            color={COLOR_STATUS[task.status]}
            text={TEXT_STATUS[task.status]}
          />
        </Stack>
      </Stack>
      <InformationItem label={commonT("assigner")}>
        {!!task?.owner?.id ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={task.owner?.avatar?.link} />
            <Stack>
              <Text variant="body2">{task.owner?.fullname ?? "--"}</Text>
              <Text variant="body2" color="grey.400">
                {task.owner?.email}
              </Text>
            </Stack>
          </Stack>
        ) : (
          "--"
        )}
      </InformationItem>
      <Stack direction="row" alignItems="center" spacing={2}>
        <InformationItem label={commonT("form.title.startDate")}>
          {formatDate(task?.start_date, undefined, "--")}
        </InformationItem>
        <Divider sx={{ width: 100, borderColor: "grey.300" }} />
        {">"}
        <InformationItem label={commonT("form.title.endDate")}>
          {formatDate(task?.end_date, undefined, "--")}
        </InformationItem>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 2, sm: 5, lg: 10 }}
      >
        <InformationItem
          label={projectT("detailTasks.form.title.expectCompletionTime")}
        >
          {formatNumber(task?.estimated_hours)}
        </InformationItem>
        <InformationItem label={projectT("detailTasks.form.title.timeTaken")}>
          {formatNumber(task?.time_execution)}
        </InformationItem>
      </Stack>
      <InformationItem label={commonT("creationDate")}>
        {formatDate(task.created_time, "HH:mm - dd/MM/yyyy")}
      </InformationItem>
      <InformationItem label={commonT("form.title.note")} minHeight={150}>
        {!!task?.description && (
          <Box
            sx={{
              fontSize: 14,
              "& *": {
                wordBreak: "break-all",
              },
            }}
            className="html"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        )}
      </InformationItem>
    </Stack>
  );
};

export default memo(Information);

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--", ...rest } = props;
  return (
    <Stack spacing={0.5} {...rest}>
      <Text color="grey.400" variant="caption">
        {label}
      </Text>
      {typeof children === "string" ? (
        <Text variant="body2" color="text.primary">
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};
