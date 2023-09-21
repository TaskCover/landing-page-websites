import { memo } from "react";
import { BodyCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH } from "constant/index";
import { formatDate, formatNumber } from "utils/index";
import { Position } from "store/company/reducer";
import { Text } from "components/shared";
import Avatar from "components/Avatar";
import { Stack } from "@mui/material";

type DesktopCellsProps = {
  item: Position;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item } = props;
  return (
    <>
      <BodyCell align="left">
        <Text fontWeight={600} fontSize={14}>
          {item?.name}
        </Text>
      </BodyCell>
      <BodyCell
        align="left"
        tooltip={formatDate(item.created_time, DATE_TIME_FORMAT_SLASH)}
      >
        {formatDate(item.created_time)}
      </BodyCell>
      <BodyCell>{formatNumber(item?.total_member_of_position)}</BodyCell>
      <BodyCell>
        {item?.created_by?.id ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={item.created_by?.avatar?.link} />
            <Text variant="h6">{item.created_by?.fullname}</Text>
          </Stack>
        ) : undefined}
      </BodyCell>
    </>
  );
};

export default memo(DesktopCells);
