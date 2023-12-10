import { Link, Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";
import { NS_COMMON } from "constant/index";
import { BILLING_DETAIL_PATH, BILLING_INFO_PATH } from "constant/paths";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Billing, Budgets } from "store/billing/reducer";
import { formatDate, getPath } from "utils/index";

type DesktopCellsProps = {
  item?: Budgets;
  order: number;
};

const DesktopCells = (props: DesktopCellsProps) => {
  const { item, order } = props;
  const commonT = useTranslations(NS_COMMON);

  return (
    <>
      <BodyCell align="left">
        {/* <Link
          underline="none"
          href={getPath(BILLING_DETAIL_PATH, undefined, {})}
        > */}
        <Text
          variant="body2"
          color="text.primary"
          fontWeight={600}
          lineHeight={1.28}
          sx={{ "&:hover": { color: "primary.main" } }}
        >
          {item?.name}
        </Text>
        {/* </Link> */}
      </BodyCell>

      <BodyCell align="left" sx={{ paddingLeft: 0 }}>
        <Stack direction={"row"} gap={2} spacing={2} alignItems={"center"}>
          <Avatar size={40} src={item?.project?.avatar[0]?.link} />
          {item?.project.name}
        </Stack>
      </BodyCell>

      <BodyCell
        // href={getPath(PROJECT_TASKS_PATH, undefined, { id: item?.id })}
        align="left"
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {""}
        </Stack>
      </BodyCell>
      <BodyCell align="center">{item?.revenue}</BodyCell>
      <BodyCell align="center">
        {item?.revenuePJ}
        {/* <Saved id={item.id} value={item.saved} /> */}
      </BodyCell>
    </>
  );
};

export default memo(DesktopCells);
