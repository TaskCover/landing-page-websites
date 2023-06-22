import { memo } from "react";
import { Employee } from "store/company/reducer";
import { BodyCell, StatusCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH, NS_MANAGER } from "constant/index";
import { formatDate } from "utils/index";
import {
  TEXT_STATUS,
  COLOR_STATUS,
  WAITING_STATUS,
} from "./components/helpers";
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item?.avatar?.link} />
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
        text={
          item.is_pay_user === null
            ? WAITING_STATUS.TEXT
            : TEXT_STATUS[Number(item.is_pay_user)]
        }
        color={
          item.is_pay_user === null
            ? WAITING_STATUS.TEXT
            : COLOR_STATUS[Number(item.is_pay_user)]
        }
        width={93}
      />
    </>
  );
};

export default memo(DesktopCells);
