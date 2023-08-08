import { memo, useCallback, useState } from "react";
import { BodyCell, StatusCell } from "components/Table";
import { Project } from "store/project/reducer";
import { getPath } from "utils/index";
import { PROJECT_TASKS_PATH } from "constant/paths";
import Avatar from "components/Avatar";
import { Stack, Theme, selectClasses } from "@mui/material";
import { Text } from "components/shared";
import { TEXT_STATUS, COLOR_STATUS, Member } from "./components/helpers";
import ProjectPlaceholderImage from "public/images/img-logo-placeholder.webp";
import { Saved, SelectStatus, SelectMembers, Assigner } from "./components";

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
        href={getPath(PROJECT_TASKS_PATH, undefined, { id: item.id })}
        align="left"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            size={32}
            src={item.avatar?.link ?? ProjectPlaceholderImage}
          />
          <Text
            variant="body2"
            color="text.primary"
            fontWeight={600}
            lineHeight={1.28}
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            {item.name}
          </Text>
        </Stack>
      </BodyCell>
      {item.owner ? (
        <BodyCell align="left">
          <Assigner value={item?.owner?.fullname} id={item.id} />
        </BodyCell>
      ) : (
        <BodyCell align="left" />
      )}
      {item.status ? (
        <SelectStatus value={item.status} id={item.id} />
      ) : (
        <BodyCell />
      )}
      <BodyCell align="center">
        <Saved id={item.id} value={item.saved} />
      </BodyCell>
    </>
  );
};

export default memo(DesktopCells);
