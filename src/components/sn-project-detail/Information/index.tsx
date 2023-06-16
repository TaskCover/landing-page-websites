"use client";

import { memo } from "react";
import { Divider, Stack, StackProps } from "@mui/material";
import { Text } from "components/shared";
import { useProject } from "store/project/selectors";
import TextStatus from "components/TextStatus";
import { COLOR_STATUS, TEXT_STATUS } from "components/sn-projects/helpers";
import { formatDate, formatNumber } from "utils/index";
import { DATE_FORMAT_SLASH } from "constant/index";
import Avatar from "components/Avatar";

type InformationItemProps = StackProps & {
  label: string;
  children?: string | number | React.ReactNode;
};

const InformationProjectPage = () => {
  const { item } = useProject();

  if (!item) return null;

  return (
    <Stack p={3} spacing={3}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Text variant="h4">{item.name}</Text>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Text variant="caption" color="grey.400">
            Trạng thái
          </Text>
          {item.status ? (
            <TextStatus
              color={COLOR_STATUS[item.status]}
              text={TEXT_STATUS[item.status]}
            />
          ) : (
            <Text variant="body2">{"--"}</Text>
          )}
        </Stack>
      </Stack>
      <Text variant="h6" color="grey.400">{`#${item.id}`}</Text>
      <InformationItem label="Người phụ trách">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} />
          <Text variant="body2">{item.owner?.fullname ?? "--"}</Text>
        </Stack>
      </InformationItem>
      <Stack direction="row" alignItems="center" spacing={2}>
        <InformationItem label="Ngày bắt đầu">
          {formatDate(item.start_date)}
        </InformationItem>
        <Divider sx={{ width: 100, borderColor: "grey.300" }} />
        {">"}
        <InformationItem label="Ngày kết thúc">
          {formatDate(item.start_date)}
        </InformationItem>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 2, sm: 5, lg: 10 }}
      >
        <InformationItem label="Số giờ làm việc (dự kiến)" width={135}>
          {formatNumber(item.working_hours)}
        </InformationItem>
        <InformationItem label="Số giờ làm việc (thực tế)">
          {formatNumber()}
        </InformationItem>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 2, sm: 5, lg: 10 }}
      >
        <InformationItem label="Chi phí dự kiến" width={135}>
          {formatNumber(item.expected_cost)}
        </InformationItem>
        <InformationItem label="Chi phí đã chi trả">
          {formatNumber()}
        </InformationItem>
      </Stack>
      <InformationItem label="Mô tả">{item.description}</InformationItem>
    </Stack>
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
