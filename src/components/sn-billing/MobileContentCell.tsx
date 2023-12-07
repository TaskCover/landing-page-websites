import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { formatDate } from "utils/index";
import { BodyCell } from "components/Table";
import { Project } from "store/project/reducer";
import { PROJECT_TASKS_PATH } from "constant/paths";
import { getPath } from "utils/index";
import Link from "components/Link";
import Avatar from "components/Avatar";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import ProjectPlaceholderImage from "public/images/img-logo-placeholder.webp";
import { Saved, SelectStatus } from "./components";
import { Billing } from "store/billing/reducer";

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
