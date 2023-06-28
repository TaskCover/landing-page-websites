"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import { StatisticItem } from "./components";
import MoneyReceiveIcon from "icons/MoneyReceiveIcon";
import WalletMoneyIcon from "icons/WalletMoneyIcon";
import Bag2Icon from "icons/Bag2Icon";
import useTheme from "hooks/useTheme";

type StatisticsProps = {};

const Statistics = (props: StatisticsProps) => {
  const { isDarkMode } = useTheme();
  return (
    <Stack
      display="grid"
      gap={3}
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      borderRadius={4}
      boxShadow={isDarkMode ? "none" : "0px 10px 60px rgba(226, 236, 249, 0.5)"}
      bgcolor="background.paper"
      pt={4.375}
      pb={3.5}
      px={6}
    >
      <StatisticItem
        color="success"
        label="Earning"
        icon={<MoneyReceiveIcon />}
        value={1980}
        percent={23}
        increment
      />
      <StatisticItem
        color="primary"
        label="Balance"
        icon={<WalletMoneyIcon />}
        value={1980}
        percent={23}
      />
      <StatisticItem
        color="error"
        label="Total Sales"
        icon={<Bag2Icon />}
        value={1980}
        percent={23}
        increment
      />
    </Stack>
  );
};

export default memo(Statistics);
