import { Stack } from "@mui/material";
import Avatar from "components/Avatar";
import Link from "components/Link";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";
import { NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Billing, Budgets } from "store/billing/reducer";
import { formatDate } from "utils/index";

type MobileContentCellProps = {
  item?: Budgets;
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
