import { Stack } from "@mui/material";
import Link from "components/Link";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";
import { CURRENCY_SYMBOL } from "components/sn-sales/helpers";
import { CURRENCY_CODE } from "constant/enums";
import { NS_COMMON } from "constant/index";
import { BILLING_INFO_PATH } from "constant/paths";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Billing } from "store/billing/reducer";
import { formatDate, formatNumber, getPath } from "utils/index";

type MobileContentCellProps = {
  item?: Billing;
};

type InformationItemProps = {
  label: string;
  children?: string | React.ReactNode;
  href?: string;
};

const MobileContentCell = (props: MobileContentCellProps) => {
  const { item } = props;
  const t = useTranslations(NS_COMMON);
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
          {item?.amount}
        </Stack>
      </BodyCell>
      <BodyCell align="center">{item?.status}</BodyCell>
      <BodyCell align="center">
        {formatNumber(item?.amount, {
          prefix: CURRENCY_SYMBOL[CURRENCY_CODE.USD],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell align="center">
        {formatNumber(item?.amount_unpaid, {
          prefix: CURRENCY_SYMBOL[CURRENCY_CODE.USD],
          numberOfFixed: 2,
        })}
      </BodyCell>
      <BodyCell align="center">{formatDate(item?.dueDate)}</BodyCell>
    </>
  );
};

export default memo(MobileContentCell);

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--", href } = props;

  const renderContent = () => {
    return (
      <>
        {typeof children === "string" ? (
          <Text variant="body2" sx={{ wordBreak: "break-word" }}>
            {children}
          </Text>
        ) : (
          children
        )}
      </>
    );
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Text variant="caption" color="grey.400" width={57}>
        {label}
      </Text>
      {href ? (
        <Link href={href} underline="none">
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </Stack>
  );
};
