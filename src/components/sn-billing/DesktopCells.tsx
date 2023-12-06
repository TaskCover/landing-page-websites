import { memo } from "react";
import { BodyCell } from "components/Table";
import { Project } from "store/project/reducer";
import { getPath } from "utils/index";
import { PROJECT_TASKS_PATH } from "constant/paths";
import { formatDate } from "utils/index";
import Avatar from "components/Avatar";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import ProjectPlaceholderImage from "public/images/img-logo-placeholder.webp";
import { Saved, SelectStatus, Assigner } from "./components";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { Billing } from "store/billing/reducer";

type DesktopCellsProps = {
  item?: Billing;
  order: number;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item, order } = props;
  const commonT = useTranslations(NS_COMMON);

  return (
    <>
      {/* <BodyCell align="center">{order}</BodyCell> */}
      <BodyCell align="left">
        <Text
          variant="body2"
          color="text.primary"
          fontWeight={600}
          lineHeight={1.28}
          sx={{ "&:hover": { color: "primary.main" } }}
        >
          {item?.subject}
        </Text>
      </BodyCell>

      <BodyCell align="left" sx={{ paddingLeft: 0 }}>
        {item?.invoiceNumber}
      </BodyCell>
      <BodyCell align="left">{formatDate(item?.date)}</BodyCell>

      <BodyCell
        // href={getPath(PROJECT_TASKS_PATH, undefined, { id: item?.id })}
        align="left"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {item?.amount}
        </Stack>
      </BodyCell>
      <BodyCell align="center">{item?.status}</BodyCell>
      <BodyCell align="center">
        {/* <Saved id={item.id} value={item.saved} /> */}
      </BodyCell>
      <BodyCell align="center">
        {/* <Saved id={item.id} value={item.saved} /> */}
      </BodyCell>
      <BodyCell align="center">{formatDate(item?.dueDate)}</BodyCell>
    </>
  );
};

export default memo(DesktopCells);
