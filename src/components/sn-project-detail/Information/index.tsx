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
import useBreakpoint from "hooks/useBreakpoint";
import ArrowTriangleIcon from "icons/ArrowTriangleIcon";
import ProjectPlaceholderImage from "public/images/img-logo-placeholder.webp";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
  color?: string;
};

const InformationProjectPage = () => {
  const { item, isFetching, error } = useProject();

  const { isSmSmaller } = useBreakpoint();

  return (
    <StatusServer isFetching={isFetching} error={error} noData={!item}>
      <Stack p={{ xs: 1, sm: 3 }} spacing={3}>
        {isSmSmaller ? <MobileInformation /> : <DesktopInformation />}
      </Stack>
    </StatusServer>
  );
};

export default memo(InformationProjectPage);

const DesktopInformation = () => {
  const { item } = useProject();

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  return (
    <>
      <Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              src={item?.avatar?.link ?? ProjectPlaceholderImage}
              size={40}
            />

            <Stack>
              <Text variant="h4">{item?.name}</Text>
              <Text variant="h6" color="grey.400">{`#${
                item?.number ?? item?.id
              }`}</Text>
            </Stack>
          </Stack>

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
      </Stack>

      <InformationItem label={commonT("assigner")}>
        {item?.owner?.fullname ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={item?.owner?.avatar?.link} />
            <Text variant="body2">{item?.owner?.fullname ?? "--"}</Text>
          </Stack>
        ) : undefined}
      </InformationItem>
      <Stack direction="row" alignItems="center" spacing={2}>
        <InformationItem label={commonT("form.title.startDate")}>
          {formatDate(item?.start_date, undefined, "--")}
        </InformationItem>
        <ArrowTriangleIcon sx={{ width: 100, color: "grey.400" }} />
        <InformationItem label={commonT("form.title.endDate")}>
          {formatDate(item?.end_date, undefined, "--")}
        </InformationItem>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 16.5 }}>
        <InformationItem
          label={projectT("list.form.title.estimatedWorkingHours")}
          width={170}
        >
          {formatNumber(item?.working_hours)}
        </InformationItem>
        <InformationItem
          color="secondary.main"
          label={projectT("detail.workingHoursActual")}
        >
          {formatNumber()}
        </InformationItem>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 16.5 }}>
        <InformationItem
          label={projectT("list.form.title.estimatedCost")}
          width={170}
        >
          {formatNumber(item?.expected_cost)}
        </InformationItem>
        <InformationItem
          color="secondary.main"
          label={projectT("detail.costSpent")}
        >
          {formatNumber()}
        </InformationItem>
      </Stack>
      <InformationItem label={commonT("form.title.description")} maxWidth={700}>
        {item?.description || "--"}
      </InformationItem>
    </>
  );
};

const MobileInformation = () => {
  const { item } = useProject();

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  return (
    <>
      <InformationItem label={projectT("list.projectCode")}>
        {item?.number}
      </InformationItem>
      <InformationItem label={projectT("list.form.title.name")}>
        {item?.name}
      </InformationItem>
      <InformationItem label={commonT("assigner")}>
        {item?.owner?.fullname ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={item?.owner?.avatar?.link} />
            <Text variant="body2">{item?.owner?.fullname ?? "--"}</Text>
          </Stack>
        ) : undefined}
      </InformationItem>
      <InformationItem label={commonT("form.title.startDate")}>
        {formatDate(item?.start_date, undefined, "--")}
      </InformationItem>
      <InformationItem label={commonT("form.title.endDate")}>
        {formatDate(item?.end_date, undefined, "--")}
      </InformationItem>
      <InformationItem label={projectT("list.form.title.estimatedCost")}>
        {formatNumber(item?.expected_cost)}
      </InformationItem>
      <InformationItem
        color="secondary.main"
        label={projectT("detail.costSpent")}
      >
        {formatNumber()}
      </InformationItem>
      <InformationItem
        label={projectT("list.form.title.estimatedWorkingHours")}
      >
        {formatNumber(item?.working_hours)}
      </InformationItem>
      <InformationItem
        color="secondary.main"
        label={projectT("detail.workingHoursActual")}
      >
        {formatNumber()}
      </InformationItem>
      <InformationItem label={commonT("status")}>
        {item?.status ? (
          <TextStatus
            color={COLOR_STATUS[item.status]}
            text={TEXT_STATUS[item.status]}
          />
        ) : (
          <Text variant="body2">{"--"}</Text>
        )}
      </InformationItem>
    </>
  );
};

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--", color = "text.primary", ...rest } = props;
  const { isSmSmaller } = useBreakpoint();
  return (
    <Stack
      direction={{ xs: "row", sm: "column" }}
      spacing={{ xs: 3, sm: 0.5 }}
      {...rest}
    >
      <Text
        color="grey.400"
        lineHeight={1.33}
        variant={{ xs: "h6", sm: "caption" }}
        width={170}
        minWidth={170}
      >
        {label}
      </Text>
      {typeof children === "string" ? (
        <Text
          variant="body2"
          lineHeight={1.57}
          color={color}
          sx={{ wordBreak: "break-all" }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};
