"use client";

import { memo } from "react";
import { Divider, Stack, StackProps } from "@mui/material";
import { Text } from "components/shared";
import { useProject } from "store/project/selectors";
import TextStatus from "components/TextStatus";
import {
  COLOR_STATUS,
  TEXT_STATUS,
} from "components/sn-projects/components/helpers";
import { formatDate, formatNumber } from "utils/index";
import Avatar from "components/Avatar";
import StatusServer from "components/StatusServer";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { useTranslations } from "next-intl";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
};

const InformationProjectPage = () => {
  const { item, isFetching, error } = useProject();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  return (
    <StatusServer isFetching={isFetching} error={error} noData={!item}>
      <Stack p={{ xs: 1, sm: 3 }} spacing={3}>
        <Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Text variant="h4">{item?.name}</Text>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Text variant="caption" color="grey.400">
                {commonT("status")}
              </Text>
              {item?.status ? (
                <TextStatus
                  color={COLOR_STATUS[item.status]}
                  text={TEXT_STATUS[item.status]}
                />
              ) : (
                <Text variant="body2">{"--"}</Text>
              )}
            </Stack>
          </Stack>
          <Text variant="h6" color="grey.400">{`#${item?.id}`}</Text>
        </Stack>

        <InformationItem label={commonT("assigner")}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={item?.owner?.avatar?.link} />
            <Text variant="body2">{item?.owner?.fullname ?? "--"}</Text>
          </Stack>
        </InformationItem>
        <Stack direction="row" alignItems="center" spacing={2}>
          <InformationItem label={commonT("form.title.startDate")}>
            {formatDate(item?.start_date)}
          </InformationItem>
          <Divider sx={{ width: 100, borderColor: "grey.300" }} />
          {">"}
          <InformationItem label={commonT("form.title.endDate")}>
            {formatDate(item?.end_date)}
          </InformationItem>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 2, sm: 5, lg: 10 }}
        >
          <InformationItem
            label={projectT("list.form.title.estimatedWorkingHours")}
            width={135}
          >
            {formatNumber(item?.working_hours)}
          </InformationItem>
          <InformationItem label={projectT("detail.workingHoursActual")}>
            {formatNumber()}
          </InformationItem>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 2, sm: 5, lg: 10 }}
        >
          <InformationItem
            label={projectT("list.form.title.estimatedCost")}
            width={135}
          >
            {formatNumber(item?.expected_cost)}
          </InformationItem>
          <InformationItem label={projectT("detail.costSpent")}>
            {formatNumber()}
          </InformationItem>
        </Stack>
        <InformationItem
          label={commonT("form.title.description")}
          maxWidth={700}
        >
          {item?.description}
        </InformationItem>
      </Stack>
    </StatusServer>
  );
};

export default memo(InformationProjectPage);

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--", ...rest } = props;
  return (
    <Stack spacing={0.5} {...rest}>
      <Text color="grey.400" variant="caption">
        {label}
      </Text>
      {typeof children === "string" ? (
        <Text variant="body2">{children}</Text>
      ) : (
        children
      )}
    </Stack>
  );
};
