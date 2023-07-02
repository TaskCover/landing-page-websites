import { memo } from "react";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate } from "utils/index";
import TextStatus from "components/TextStatus";
import { BodyCell } from "components/Table";
import { Employee } from "store/company/reducer";
import {
  COLOR_STATUS,
  TEXT_STATUS,
  WAITING_STATUS,
} from "./components/helpers";
import { NS_COMMON, NS_MANAGER } from "constant/index";
import { useTranslations } from "next-intl";

type MobileContentCellProps = {
  item: Employee;
};

type InformationItemProps = {
  label: string;
  children?: string | React.ReactNode;
};

const MobileContentCell = (props: MobileContentCellProps) => {
  const { item } = props;
  const commonT = useTranslations(NS_COMMON);
  const managerT = useTranslations(NS_MANAGER);
  return (
    <BodyCell align="left">
      <Stack spacing={2} py={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar size={32} src={item?.avatar?.link} />
          <Text variant="h6">{item.fullname}</Text>
        </Stack>
        <InformationItem label="Email">{item.email}</InformationItem>
        <InformationItem label={commonT("creator")}>
          {item.fullname}
        </InformationItem>
        <InformationItem label={commonT("creationDate")}>
          {formatDate(item.created_time)}
        </InformationItem>
        <InformationItem label={commonT("status")}>
          <TextStatus
            color={COLOR_STATUS[Number(item.status)]}
            text={TEXT_STATUS[Number(item.status)]}
          />
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
      <Text variant="caption" color="grey.400" width={57}>
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
