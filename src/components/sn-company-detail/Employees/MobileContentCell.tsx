import { memo } from "react";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate } from "utils/index";
import TextStatus from "components/TextStatus";
import { BodyCell } from "components/Table";
import { Employee } from "store/company/reducer";
import {
  COLOR_STATUS,
  TEXT_STATUS,
  WAITING_STATUS,
} from "./components/helpers";

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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item?.avatar?.link} />
          <Text variant="h6">{item.fullname}</Text>
        </Stack>
        <InformationItem label="Email">{item.email}</InformationItem>
        <InformationItem label="Creator">{item.fullname}</InformationItem>
        <InformationItem label="Creation date">
          {formatDate(item.created_time)}
        </InformationItem>
        <InformationItem label="Status">
          <TextStatus
            color={
              item.is_pay_user === null
                ? WAITING_STATUS.COLOR
                : COLOR_STATUS[Number(item.is_pay_user)]
            }
            text={
              item.is_pay_user === null
                ? WAITING_STATUS.TEXT
                : TEXT_STATUS[Number(item.is_pay_user)]
            }
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
