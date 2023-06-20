import { memo } from "react";
import { BodyCell } from "components/Table";
import { Member } from "store/project/reducer";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate } from "utils/index";
import { DATE_TIME_FORMAT_SLASH } from "constant/index";
import { DeleteUser } from "./components";

type DesktopCellsProps = {
  item: Member;
  order: number;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item, order } = props;
  return (
    <>
      <BodyCell align="center">{order}</BodyCell>
      <BodyCell align="left">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item?.avatar?.link} />
          <Text variant="h6">{item.fullname}</Text>
        </Stack>
      </BodyCell>
      <BodyCell align="left" textProps={{ noWrap: true }} tooltip={item.email}>
        {item.email}
      </BodyCell>
      <BodyCell>{item.position_project?.name}</BodyCell>
      <BodyCell></BodyCell>
      <BodyCell tooltip={formatDate(item.date_in, DATE_TIME_FORMAT_SLASH)}>
        {formatDate(item.date_in)}
      </BodyCell>
      <BodyCell align="left">
        <DeleteUser id={item.id} />
      </BodyCell>
    </>
  );
};

export default memo(DesktopCells);
