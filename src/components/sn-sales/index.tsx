"use client";

import FixedLayout from "components/FixedLayout";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_COMMON, NS_SALES, SHORT_TIME_FORMAT } from "constant/index";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import SaleItem from "./SaleItem";
import Pagination from "components/Pagination";
import { SALE_STAGE } from "constant/enums";
import SaleListAction from "./SaleListAction";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { formatDate, formatNumber } from "utils/index";
import { HEADER_HEIGHT } from "layouts/Header";

const dummy: Record<string, string | number>[] = [
  {
    avatar: "http://103.196.145.232:9000/sass/f964e6e0-3915-11ee-acfe-cb6461893096-fd6dfdc657627721?response-content-disposition=attachment%3B%20filename%3D%221.jpg%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20230828%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230828T093207Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6fe888fce2acdc6759253d6615ecd283b9f449ef394ff9ee62c242a0880d6631"
    ,name: "Test",
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
        align: "left",
        width: "15%",
      },
      {
        value: salesT("list.table.stage"),
        width: "15%",
      },
      {
        value: salesT("list.table.owner"),
        align: "left",
        width: "10%",
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
        width: "10%",
      },
      {
        value: salesT("list.table.pjRevenue"),
        align: "right",
        component: (props) => (
          <Stack {...props} alignItems="flex-end">
            <Text variant="h6" color="grey.400">
              {salesT("list.table.pjRevenue")}
            </Text>
            <Text variant="h6">{formatNumber(100, { prefix: "$" })}</Text>
          </Stack>
        ),
        width: "10%",
      },
      {
        value: salesT("list.table.time"),
        align: "right",
        component: (props) => (
          <Stack {...props} alignItems="flex-end">
            <Text variant="h6" color="grey.400">
              {salesT("list.table.time")}
            </Text>
            <Text variant="h6">
              {formatDate(new Date().toDateString(), SHORT_TIME_FORMAT)}h
            </Text>
          </Stack>
        ),
        width: "10%",
      },
      {
        value: salesT("list.table.probability"),
        align: "right",
        width: "10%",
      },
      {
        value: salesT("list.table.lastActivity"),
        align: "left",
        width: "10%",
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
          minWidth={820}
          px={2}
              headerProps={{
            sx: { px: { xs: 2, md: 2 } },
          }}
        >
          {dummy.map((item, index) => (
            <SaleItem key={`Sale-item-${index}`} item={item} />
          ))}
        </TableLayout>
        <Pagination
          onChangePage={onChangePage}
          onChangeSize={onChangeSize}
          pageSize={10}
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
