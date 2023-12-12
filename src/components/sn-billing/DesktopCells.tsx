import { Link, Stack } from "@mui/material";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";
import { NS_COMMON } from "constant/index";
import { BILLING_DETAIL_PATH, BILLING_INFO_PATH } from "constant/paths";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Billing } from "store/billing/reducer";
import { formatDate, getPath } from "utils/index";

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
        <Link
          underline="none"
          href={getPath(BILLING_INFO_PATH, undefined, { id: item?.id ?? "" })}
          // href={BILLING_DETAIL_PATH}
        >
          <Text
            variant="body2"
            color="text.primary"
            fontWeight={600}
            lineHeight={1.28}
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            {item?.subject}
          </Text>
        </Link>
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
        {item?.budget && item.budget[0]?.name}
        </Stack>
      </BodyCell>
      <BodyCell align="center">{item?.status}</BodyCell>
      <BodyCell align="center">{item?.amount}</BodyCell>
      <BodyCell align="center">{item?.amount_unpaid}</BodyCell>
      <BodyCell align="center">{formatDate(item?.dueDate)}</BodyCell>
    </>
  );
};

export default memo(DesktopCells);
