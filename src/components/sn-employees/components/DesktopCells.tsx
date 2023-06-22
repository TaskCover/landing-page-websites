import { memo } from "react";
import { Employee } from "store/company/reducer";
import { BodyCell, StatusCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH, NS_COMPANY } from "constant/index";
import { formatDate } from "utils/index";
import { TEXT_STATUS, COLOR_STATUS } from "../helpers";

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
      <BodyCell tooltip={formatDate(item.created_time, DATE_TIME_FORMAT_SLASH)}>
        {formatDate(item.created_time)}
      </BodyCell>
      <BodyCell
        tooltip={formatDate(item.date_end_using, DATE_TIME_FORMAT_SLASH)}
      >
        {formatDate(item.date_end_using)}
      </BodyCell>
      <StatusCell
        namespace={NS_COMPANY}
        text={TEXT_STATUS[Number(item.is_pay_user)]}
        color={COLOR_STATUS[Number(item.is_pay_user)]}
        width={93}
      />
    </>
  );
};

export default memo(DesktopCells);
