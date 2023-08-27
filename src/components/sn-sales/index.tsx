"use client";

import FixedLayout from "components/FixedLayout";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_COMMON, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import SaleItem from "./SaleItem";
import Pagination from "components/Pagination";
import { SALE_STAGE } from "constant/enums";
import SaleListAction from "./SaleListAction";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { formatNumber } from "utils/index";

const dummy: Record<string, string | number>[] = [
  {
    name: "Test",
    stage: SALE_STAGE.LEAD,
    owner: "Test",
    pjRevenue: 1,
    revenue: 0,
    time: new Date().toDateString(),
    probability: 40,
    lastActivity: new Date().toDateString(),
  },
];

const SalesPage = () => {
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const onChangeSize = () => {
    console.log("change size");
  };
  const onChangePage = () => {
    console.log("change page");
  };
  const headerList: CellProps[] = useMemo(
    () => [
      {
        value: commonT("name"),
        minWidth: 150,
        align: "left",
      },
      {
        value: salesT("list.table.stage"),
      },
      {
        value: salesT("list.table.owner"),
        align: "left",
      },
      {
        value: salesT("list.table.revenue"),
        align: "right",
        component: (props) => (
          <Stack {...props} alignItems="flex-end">
            <Text variant="h6" color="grey.400">
              {salesT("list.table.revenue")}
            </Text>
            <Text variant="h6">{formatNumber(100, { prefix: "$" })}</Text>
          </Stack>
        ),
      },
      {
        value: salesT("list.table.pjRevenue"),
        align: "right",
      },
      {
        value: salesT("list.table.time"),
        align: "right",
      },
      {
        value: salesT("list.table.probability"),
      },
      {
        value: salesT("list.table.lastActivity"),
      },
    ],
    [commonT, salesT],
  );

  return (
    <>
      <FixedLayout>
        <SaleListAction />
        <TableLayout
          headerList={headerList}
          noData={dummy.length === 0}
          px={{ xs: 0, md: 2 }}
        >
          {dummy.map((item, index) => (
            <SaleItem key={`Sale-item-${index}`} item={item} />
          ))}
        </TableLayout>
        <Pagination
          onChangePage={onChangePage}
          onChangeSize={onChangeSize}
          pageSize={dummy.length}
          containerProps={{ px: { md: 3 }, py: 1 }}
          totalItems={dummy.length}
          totalPages={dummy.length}
          page={1}
        />
      </FixedLayout>
    </>
  );
};

export default SalesPage;
