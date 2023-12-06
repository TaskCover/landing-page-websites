import { memo } from "react";
import { Employee } from "store/company/reducer";
import { BodyCell, StatusCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH, NS_COMPANY, DATE_LOCALE_FORMAT } from "constant/index";
import { formatDate } from "utils/index";
import { TEXT_STATUS, COLOR_STATUS } from "../helpers";
import dayjs from "dayjs";

type DesktopCellsProps = {
  item: Employee;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item } = props;
  return (
    <>
      <BodyCell align="left">{item.fullname}</BodyCell>
      <BodyCell align="left" noWrap>
        {item.email}
      </BodyCell>
      <BodyCell>{item.position?.name}</BodyCell>
      <BodyCell tooltip={dayjs(item.created_time).format(DATE_LOCALE_FORMAT)}>
        {/* {formatDate(item.created_time)} */}
        {dayjs(item.created_time).format(DATE_LOCALE_FORMAT)}
      </BodyCell>
      <BodyCell
        tooltip={dayjs(item.date_end_using).format(DATE_LOCALE_FORMAT)}
      >
        {/* {formatDate(item.date_end_using)} */}
        {dayjs(item.date_end_using).format(DATE_LOCALE_FORMAT)}
      </BodyCell>
      <StatusCell
        namespace={NS_COMPANY}
        text={TEXT_STATUS[item.status]}
        color={COLOR_STATUS[item.status]}
        width={93}
      />
    </>
  );
};

export default memo(DesktopCells);
