"use client";
import useTheme from "hooks/useTheme";
import Link from "components/Link";
import { DATE_FORMAT_SLASH, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";
import { getPath } from "utils/index";
import { Stack, Tab, Tabs } from "@mui/material";
import { Date } from "components/Filters";
import moment from "moment";
import { useSaleDetail } from "store/sales/selectors";

export enum SALES_DETAIL_TAB {
  FEED = "feed",
  SERVICE = "service",
}
const TABS = [
  {
    label: "detail.tab.feed",
    value: SALES_DETAIL_TAB.FEED,
  },
  {
    label: "detail.tab.service",
    value: SALES_DETAIL_TAB.SERVICE,
  },
];

type TabItemProps = {
  href?: string;
  label: string;
  isActive: boolean;
  value: SALES_DETAIL_TAB;
};

type TabListProps = {
  value: SALES_DETAIL_TAB;
  onChange: (e: React.SyntheticEvent, newTab: SALES_DETAIL_TAB) => void;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `  -tabpanel-${index}`,
  };
}

const TabItem = (props: TabItemProps) => {
  const { saleDetail } = useSaleDetail();
  const { href = "", value, label, isActive, ...rest } = props;
  const salesT = useTranslations(NS_SALES);
  const { isDarkMode, palette } = useTheme();

  return (
    <Tab
      href={href}
      value={value}
      label={salesT(label)}
      {...rest}
      sx={{
        minWidth: 120,
        height: 40,
        bgcolor: isActive
          ? isDarkMode
            ? "grey.50"
            : "primary.light"
          : "transparent",
        "&:hover": {
          bgcolor: isDarkMode ? "grey.50" : "primary.light",
        },
        px: { xs: 2, sm: 3.5 },
        borderRadius: 1,
        color: isDarkMode ? palette.text.secondary : palette.grey[300],
        "&.Mui-selected": {
          color: isDarkMode ? palette.text.secondary : palette.text?.primary,
        },
      }}
    />
  );
};

const TabList = ({ value, onChange }: TabListProps) => {
  const onChangeDate = (value) => {
    console.log(value);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBottom: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <Tabs
        value={value}
        onChange={onChange}
        TabIndicatorProps={{
          sx: {
            bgcolor: "transparent",
          },
        }}
      >
        {TABS.map((tab) => (
          <TabItem
            value={tab.value}
            label={tab.label}
            isActive={tab.value === value}
            key={`sale-detail-tab-${tab.value}`}
          />
        ))}
      </Tabs>
      <Stack>
        <Date
          label="Start Date"
          name="start_date"
          format={DATE_FORMAT_SLASH}
          onChange={(name, newDate) => onChangeDate}
        />
      </Stack>
    </Stack>
  );
};

export default memo(TabList);
