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
      <BodyCell align="left" noWrap></BodyCell>
      <BodyCell tooltip={formatDate(undefined, DATE_TIME_FORMAT_SLASH)}>
        {formatDate()}
      </BodyCell>
      <BodyCell></BodyCell>
    </>
  );
};

export default memo(DesktopCells);
