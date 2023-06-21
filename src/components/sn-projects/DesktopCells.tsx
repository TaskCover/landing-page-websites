import { memo } from "react";
import { BodyCell, StatusCell } from "components/Table";
import BookmarkIcon from "icons/BookmarkIcon";
import { Project } from "store/project/reducer";
import { getPath } from "utils/index";
import { PROJECT_INFORMATION_PATH } from "constant/paths";
import Avatar from "components/Avatar";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { TEXT_STATUS, COLOR_STATUS } from "./components/helpers";

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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item.avatar?.link} />
          <Text
            variant="body2"
            color="text.primary"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            {item.name}
          </Text>
        </Stack>
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
