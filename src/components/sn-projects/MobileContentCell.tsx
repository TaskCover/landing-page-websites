import { memo } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import TextStatus from "components/TextStatus";
import { COLOR_STATUS, TEXT_STATUS } from "./components/helpers";
import { BodyCell } from "components/Table";
import BookmarkIcon from "icons/BookmarkIcon";
import { Project } from "store/project/reducer";
import { PROJECT_TASKS_PATH } from "constant/paths";
import { getPath } from "utils/index";
import Link from "components/Link";
import Avatar from "components/Avatar";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import ProjectPlaceholderImage from "public/images/img-logo-placeholder.webp";

type MobileContentCellProps = {
  item: Project;
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
    <BodyCell align="left">
      <Stack spacing={2} py={1.5}>
        <InformationItem
          label={t("name")}
          href={getPath(PROJECT_TASKS_PATH, undefined, { id: item.id })}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              size={32}
              src={item.avatar?.link ?? ProjectPlaceholderImage}
            />
            <Text variant="body2" color="text.primary">
              {item.name}
            </Text>
          </Stack>
        </InformationItem>
        <InformationItem label={t("assigner")}>
          {item?.owner?.fullname}
        </InformationItem>

        <InformationItem label={t("status")}>
          {!!item?.status && (
            <TextStatus
              text={TEXT_STATUS[item.status]}
              color={COLOR_STATUS[item.status]}
              width={93}
            />
          )}
        </InformationItem>
        <InformationItem label="">
          <BookmarkIcon color="primary" fontSize="medium" active={item.saved} />
        </InformationItem>
      </Stack>
    </BodyCell>
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
