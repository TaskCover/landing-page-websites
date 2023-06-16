import React, { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import {
  PROJECT_TASKS_PATH,
  PROJECT_ACTIVITIES_PATH,
  PROJECT_COST_HISTORY_PATH,
  PROJECT_MEMBERS_PATH,
  PROJECT_INFORMATION_PATH,
} from "constant/paths";
import { usePathname } from "next/navigation";
import {
  EditProject,
  SavedProject,
  StatusProject,
} from "components/sn-project-detail/Information/components";

type TabItemProps = {
  href: string;
  label: string;
};

const TabList = () => {
  const pathname = usePathname();

  const isDetailPath = useMemo(() => {
    const suffixPath = getSuffixPath(pathname);
    const suffixDetail = getSuffixPath(PROJECT_INFORMATION_PATH);
    return suffixPath === suffixDetail;
  }, [pathname]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      borderBottom="1px solid"
      justifyContent="space-between"
      borderColor="grey.100"
      width="100%"
    >
      <Stack direction="row" alignItems="center">
        {TABS.map((tab) => (
          <TabItem key={tab.label} {...tab} />
        ))}
      </Stack>

      {isDetailPath && (
        <Stack direction="row" alignItems="center" spacing={3} pr={3}>
          <StatusProject />
          <SavedProject />
          <EditProject />
        </Stack>
      )}
    </Stack>
  );
};

export default memo(TabList);

const TabItem = (props: TabItemProps) => {
  const { href, label } = props;

  const pathname = usePathname();

  const isActiveLink = useMemo(() => {
    const suffixPath = getSuffixPath(pathname);
    const suffixHref = getSuffixPath(href);
    return suffixPath === suffixHref;
  }, [href, pathname]);

  return (
    <Link
      href={href}
      underline="none"
      sx={{
        minWidth: 120,
        bgcolor: isActiveLink ? "primary.light" : "transparent",
        "&:hover": {
          bgcolor: "primary.light",
        },
        py: 2.5,
        px: 3.5,
        borderRadius: 1,
      }}
    >
      <Text variant="body2" fontWeight={600}>
        {label}
      </Text>
    </Link>
  );
};

const TABS = [
  { label: "Công việc", href: PROJECT_TASKS_PATH },
  { label: "Hoạt dộng", href: PROJECT_ACTIVITIES_PATH },
  { label: "Chi phí", href: PROJECT_COST_HISTORY_PATH },
  { label: "Thành viên", href: PROJECT_MEMBERS_PATH },
  { label: "Thông tin", href: PROJECT_INFORMATION_PATH },
];

const getSuffixPath = (path: string) => {
  const arrSplit = path.split("/");

  return arrSplit[3];
};
