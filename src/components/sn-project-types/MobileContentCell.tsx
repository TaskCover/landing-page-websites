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
        <InformationItem label="Tên chức vụ">{item?.name}</InformationItem>
        <InformationItem label="Người tạo">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar size={32} />
            <Text variant="h6"></Text>
          </Stack>
        </InformationItem>
        <InformationItem label="Ngày tạo">{formatDate()}</InformationItem>
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
