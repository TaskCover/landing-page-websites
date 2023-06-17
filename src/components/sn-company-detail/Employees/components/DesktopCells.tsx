import { memo } from "react";
import { Employee } from "store/company/reducer";
import { BodyCell, StatusCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH } from "constant/index";
import { formatDate } from "utils/index";
import { TEXT_STATUS, COLOR_STATUS } from "./helpers";
import { Text } from "components/shared";
import Avatar from "components/Avatar";
import { Stack } from "@mui/material";

type DesktopCellsProps = {
  item: Employee;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item } = props;
  return (
    <>
      <BodyCell align="left">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar size={32} />
          <Text variant="h6">{item.fullname}</Text>
        </Stack>
      </BodyCell>
      <BodyCell align="left" noWrap>
        {item.email}
      </BodyCell>
      <BodyCell align="left" noWrap>
        {item.fullname}
      </BodyCell>
      <BodyCell tooltip={formatDate(item.created_time, DATE_TIME_FORMAT_SLASH)}>
        {formatDate(item.created_time)}
      </BodyCell>
      <StatusCell
        text={TEXT_STATUS[Number(item.is_active)]}
        color={COLOR_STATUS[Number(item.is_active)]}
        width={93}
      />
    </>
  );
};

export default memo(DesktopCells);
