import { memo } from "react";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate } from "utils/index";
import TextStatus from "components/TextStatus";
import { COLOR_STATUS, TEXT_STATUS } from "./helpers";
import { BodyCell } from "components/Table";
import { Company, Employee } from "store/company/reducer";

type MobileContentCellProps = {
  item: Employee;
};

type InformationItemProps = {
  label: string;
  children?: string | React.ReactNode;
};

const MobileContentCell = (props: MobileContentCellProps) => {
  const { item } = props;
  return (
    <BodyCell align="left">
      <Stack spacing={2} py={1.5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar size={32} />
          <Text variant="h6">{item.fullname}</Text>
        </Stack>
        <InformationItem label="Email">{item.email}</InformationItem>
        <InformationItem label="Người tạo">{item.fullname}</InformationItem>
        <InformationItem label="Ngày tạo">
          {formatDate(item.created_time)}
        </InformationItem>
        <InformationItem label="Trạng thái">
          <TextStatus
            color={COLOR_STATUS[Number(item.is_active)]}
            text={TEXT_STATUS[Number(item.is_active)]}
          />
        </InformationItem>
      </Stack>
    </BodyCell>
  );
};

export default memo(MobileContentCell);

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--" } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Text variant="caption" color="grey.400" width={57}>
        {label}
      </Text>

      {typeof children === "string" ? (
        <Text variant="body2" noWrap>
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};
