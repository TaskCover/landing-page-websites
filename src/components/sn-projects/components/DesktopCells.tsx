import { memo } from "react";
import { BodyCell, StatusCell } from "components/Table";
import { TEXT_STATUS, COLOR_STATUS } from "../helpers";
import BookmarkIcon from "icons/BookmarkIcon";
import { Project } from "store/project/reducer";
import { getPath } from "utils/index";
import { PROJECT_INFORMATION_PATH } from "constant/paths";

type DesktopCellsProps = {
  item: Project;
  order: number;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item, order } = props;
  return (
    <>
      <BodyCell align="center">{order}</BodyCell>
      <BodyCell
        href={getPath(PROJECT_INFORMATION_PATH, undefined, { id: item.id })}
        align="left"
      >
        {item.name}
      </BodyCell>
      <BodyCell align="left">{item?.owner?.fullname}</BodyCell>
      {item.status ? (
        <StatusCell
          text={TEXT_STATUS[item.status]}
          color={COLOR_STATUS[item.status]}
          width={93}
        />
      ) : (
        <BodyCell />
      )}

      <BodyCell align="center">
        <BookmarkIcon color="primary" fontSize="medium" active={item.saved} />
      </BodyCell>
    </>
  );
};

export default memo(DesktopCells);
