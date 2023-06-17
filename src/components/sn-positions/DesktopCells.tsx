import { memo } from "react";
import { BodyCell } from "components/Table";
import { DATE_TIME_FORMAT_SLASH } from "constant/index";
import { formatDate } from "utils/index";
import { Position } from "store/company/reducer";

type DesktopCellsProps = {
  item: Position;
  order: number;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item, order } = props;
  return (
    <>
      <BodyCell>{order}</BodyCell>
      <BodyCell align="left">{item?.name}</BodyCell>
      <BodyCell align="left" noWrap>
        {item.created_by?.fullname}
      </BodyCell>
      <BodyCell tooltip={formatDate(item.created_time, DATE_TIME_FORMAT_SLASH)}>
        {formatDate(item.created_time)}
      </BodyCell>
      <BodyCell></BodyCell>
    </>
  );
};

export default memo(DesktopCells);
