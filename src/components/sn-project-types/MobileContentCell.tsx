import { memo } from "react";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate, formatNumber } from "utils/index";
import { BodyCell } from "components/Table";
import { Position } from "store/company/reducer";

type MobileContentCellProps = {
  item: Position;
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
        <InformationItem label="Name">{item?.name}</InformationItem>
        <InformationItem label="Creator">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={item?.created_by?.avatar?.link} />
            <Text variant="h6">{item.created_by?.fullname}</Text>
          </Stack>
        </InformationItem>
        <InformationItem label="Creation date">
          {formatDate(item.created_time)}
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
      <Text variant="caption" color="grey.400">
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
