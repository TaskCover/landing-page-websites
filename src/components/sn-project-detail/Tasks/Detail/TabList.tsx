import { memo } from "react";
import { Stack, StackProps } from "@mui/material";
import { Text } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_PROJECT } from "constant/index";
import { StatusTask, AssignTask } from "./components";
import { Task } from "store/project/reducer";
import EditTask from "./components/EditTask";
import MoveListIcon from "icons/MoveListIcon";

export enum TabDetail {
  DETAIL = 1,
  HISTORY,
}

type TabItemProps = {
  value: TabDetail;
  label: string;
  activated?: boolean;
} & StackProps;

type TabListProps = {
  value: TabDetail;
  onChange: (newTab: TabDetail) => void;
};

const TabList = (props: TabListProps) => {
  const { value, onChange } = props;

  const onChangeTab = (newTab: TabDetail) => {
    return () => {
      onChange(newTab);
    };
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        overflow="auto"
        spacing={4}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="grey.100"
        px={{ xs: 2, md: 3 }}
      >
        <Stack direction="row" alignItems="center">
          {TABS.map((tab) => (
            <TabItem
              key={tab.label}
              activated={tab.value === value}
              onClick={onChangeTab(tab.value)}
              {...tab}
            />
          ))}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          display={{ xs: "none", md: "flex" }}
        >
          <AssignTask />
          <StatusTask />
          <EditTask />
        </Stack>
      </Stack>
    </>
  );
};

export default memo(TabList);

const TabItem = (props: TabItemProps) => {
  const { activated, label, ...rest } = props;

  const projectT = useTranslations(NS_PROJECT);

  return (
    <Stack
      sx={{
        minWidth: 120,
        borderBottom: "2px solid",
        borderColor: activated ? "primary.main" : "transparent",
        px: { xs: 2, sm: 3.5 },
        py: 1.75,
        height: "100%",
        cursor: "pointer",
        color: activated ? "text.primary" : "grey.400",
      }}
      {...rest}
    >
      <Text
        variant="body2"
        fontWeight={600}
        color="inherit"
        whiteSpace="nowrap"
        lineHeight={1.14}
      >
        {projectT(label)}
      </Text>
    </Stack>
  );
};

// const TabActions = (props: StackProps) => {
//   const pathname = usePathname();

//   const isDetailPath = useMemo(() => {
//     const suffixPath = getSuffixPath(pathname);
//     const suffixDetail = getSuffixPath(PROJECT_INFORMATION_PATH);
//     return suffixPath === suffixDetail;
//   }, [pathname]);

//   if (!isDetailPath) return null;

//   return (
//     <Stack direction="row" alignItems="center" spacing={3} pr={3} {...props}>
//       <StatusProject />
//       <SavedProject />
//       <EditProject />
//     </Stack>
//   );
// };

const TABS = [
  { label: "taskDetail.tabList.detail", value: TabDetail.DETAIL },
  { label: "taskDetail.tabList.history", value: TabDetail.HISTORY },
];
