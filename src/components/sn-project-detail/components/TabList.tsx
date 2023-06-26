import { memo, useMemo } from "react";
import { Stack, StackProps } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import {
  PROJECT_TASKS_PATH,
  PROJECT_ACTIVITIES_PATH,
  PROJECT_COST_HISTORY_PATH,
  PROJECT_MEMBERS_PATH,
  PROJECT_INFORMATION_PATH,
} from "constant/paths";
import { usePathname } from "next-intl/client";
import {
  EditProject,
  SavedProject,
  StatusProject,
} from "components/sn-project-detail/Information/components";
import { getPath } from "utils/index";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { NS_PROJECT } from "constant/index";

type TabItemProps = {
  href: string;
  label: string;
};

const TabList = () => {
  return (
    <>
      <Stack
        direction={{ md: "row" }}
        alignItems="center"
        borderBottom="1px solid"
        justifyContent="space-between"
        borderColor="grey.100"
        width="100%"
        overflow="auto"
        spacing={4}
        position="sticky"
        top={0}
        bgcolor="common.white"
        zIndex={1}
      >
        <Stack direction="row" alignItems="center">
          {TABS.map((tab) => (
            <TabItem key={tab.label} {...tab} />
          ))}
        </Stack>

        <TabActions display={{ xs: "none", md: "flex" }} />
      </Stack>
      <TabActions display={{ md: "none" }} justifyContent="center" />
    </>
  );
};

export default memo(TabList);

const TabItem = (props: TabItemProps) => {
  const { href, label } = props;

  const projectT = useTranslations(NS_PROJECT);

  const pathname = usePathname();
  const params = useParams();

  const isActiveLink = useMemo(() => {
    const suffixPath = getSuffixPath(pathname);
    const suffixHref = getSuffixPath(href);
    return suffixPath === suffixHref;
  }, [href, pathname]);

  return (
    <Link
      href={getPath(href, undefined, { id: params.id })}
      underline="none"
      sx={{
        minWidth: 120,
        bgcolor: isActiveLink ? "primary.light" : "transparent",
        "&:hover": {
          bgcolor: "primary.light",
        },
        py: { xs: 2, sm: 2.5 },
        px: { xs: 2, sm: 3.5 },
        borderRadius: 1,
      }}
    >
      <Text variant="body2" fontWeight={600} whiteSpace="nowrap">
        {projectT(label)}
      </Text>
    </Link>
  );
};

const TabActions = (props: StackProps) => {
  const pathname = usePathname();

  const isDetailPath = useMemo(() => {
    const suffixPath = getSuffixPath(pathname);
    const suffixDetail = getSuffixPath(PROJECT_INFORMATION_PATH);
    return suffixPath === suffixDetail;
  }, [pathname]);

  if (!isDetailPath) return null;

  return (
    <Stack direction="row" alignItems="center" spacing={3} pr={3} {...props}>
      <StatusProject />
      <SavedProject />
      <EditProject />
    </Stack>
  );
};

const TABS = [
  { label: "tabList.tasks", href: PROJECT_TASKS_PATH },
  { label: "tabList.activities", href: PROJECT_ACTIVITIES_PATH },
  { label: "tabList.costHistory", href: PROJECT_COST_HISTORY_PATH },
  { label: "tabList.members", href: PROJECT_MEMBERS_PATH },
  { label: "tabList.information", href: PROJECT_INFORMATION_PATH },
];

const getSuffixPath = (path: string) => {
  const arrSplit = path.split("/");

  return arrSplit[3];
};
