import React, { memo } from "react";
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

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
};

const Information = (props: Task) => {
  const {
    name,
    status,
    owner,
    start_date,
    end_date,
    estimated_hours,
    created_time,
    description,
  } = props;

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  return (
    <Stack spacing={2} flex={1}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Text variant="h5" color="text.primary">
          {name}
        </Text>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Text variant="caption" color="grey.400">
            {commonT("status")}
          </Text>
          <TextStatus color={COLOR_STATUS[status]} text={TEXT_STATUS[status]} />
        </Stack>
      </Stack>
      <InformationItem label={commonT("assigner")}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={owner?.avatar?.link} />
          <Text variant="body2">{owner?.fullname ?? "--"}</Text>
        </Stack>
      </InformationItem>
      <Stack direction="row" alignItems="center" spacing={2}>
        <InformationItem label={commonT("form.title.startDate")}>
          {formatDate(start_date, undefined, "--")}
        </InformationItem>
        <Divider sx={{ width: 100, borderColor: "grey.300" }} />
        {">"}
        <InformationItem label={commonT("form.title.endDate")}>
          {formatDate(end_date, undefined, "--")}
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
          {formatNumber(estimated_hours)}
        </InformationItem>
        <InformationItem label={projectT("detailTasks.form.title.timeTaken")}>
          {formatNumber()}
        </InformationItem>
      </Stack>
      <InformationItem label={commonT("creationDate")}>
        {formatDate(created_time, "HH:mm - dd/MM/yyyy")}
      </InformationItem>
      <InformationItem label={commonT("form.title.note")} minHeight={150}>
        {!!description && (
          <Box
            sx={{
              fontSize: 14,
            }}
            dangerouslySetInnerHTML={{ __html: description }}
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
