import { memo } from "react";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate, formatNumber } from "utils/index";
import { BodyCell } from "components/Table";
import { Position } from "store/company/reducer";
import { NS_COMMON, NS_COMPANY } from "constant/index";
import { useTranslations } from "next-intl";

type MobileContentCellProps = {
  item: Position;
};

type InformationItemProps = {
  label: string;
  children?: string | React.ReactNode;
};

const MobileContentCell = (props: MobileContentCellProps) => {
  const { item } = props;
  const commonT = useTranslations(NS_COMMON);
  const companyT = useTranslations(NS_COMPANY);

  return (
    <BodyCell align="left">
      <Stack spacing={2} py={1.5}>
        <InformationItem label={commonT("name")}>{item?.name}</InformationItem>
        <InformationItem label={commonT("creator")}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar size={32} src={item.created_by?.avatar?.link} />
            <Text variant="h6">{item.created_by?.fullname}</Text>
          </Stack>
        </InformationItem>
        <InformationItem label={commonT("creationDate")}>
          {formatDate(item.created_time)}
        </InformationItem>
        <InformationItem label={companyT("positions.numberOfEmployees")}>
          {formatNumber()}
        </InformationItem>
      </Stack>
    </BodyCell>
  );
};

export default memo(MobileContentCell);

const InformationItem = (props: InformationItemProps) => {
  const { label, children = "--" } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Text variant="caption" color="grey.400">
        {label}
      </Text>

      {typeof children === "string" ? (
        <Text variant="body2" noWrap>
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  );
};
