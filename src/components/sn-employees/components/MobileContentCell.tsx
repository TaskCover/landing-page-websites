import { memo } from "react";
import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { formatDate } from "utils/index";
import TextStatus from "components/TextStatus";
import { COLOR_STATUS, TEXT_STATUS } from "../helpers";
import { BodyCell } from "components/Table";
import { Employee } from "store/company/reducer";
import { NS_COMPANY, NS_COMMON } from "constant/index";
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
  const companyT = useTranslations(NS_COMPANY);
  const commonT = useTranslations(NS_COMMON);

  return (
    <BodyCell align="left">
      <Stack spacing={2} py={1.5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar size={32} />
          <Text variant="h6">{item.fullname}</Text>
        </Stack>
        <InformationItem label="Email">{item.email}</InformationItem>
        <InformationItem label={commonT("position")}>
          {item?.position?.name}
        </InformationItem>
        <InformationItem label={commonT("creationDate")}>
          {formatDate(item.created_time)}
        </InformationItem>
        <InformationItem label={commonT("status")}>
          <TextStatus
            namespace={NS_COMPANY}
            color={COLOR_STATUS[item.status]}
            text={TEXT_STATUS[item.status]}
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
