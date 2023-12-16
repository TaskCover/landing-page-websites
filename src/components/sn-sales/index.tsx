"use client";

import FixedLayout from "components/FixedLayout";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_COMMON, NS_SALES, SHORT_TIME_FORMAT } from "constant/index";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SaleItem from "./SaleItem";
import Pagination from "components/Pagination";
import { SALE_STAGE } from "constant/enums";
import SaleListAction from "./SaleListAction";
import { Box, Stack, TableCell, TableSortLabel } from "@mui/material";
import { Text } from "components/shared";
import {
  cleanObject,
  formatCurrency,
  formatDate,
  formatNumber,
  getComparator,
  getPath,
  sortedRowInformation,
  stringifyURLSearchParams,
} from "utils/index";
import { useSales } from "store/sales/selectors";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";
import { formatEstimateTime } from "../../utils/index";
import { useFetchEmployeeOptions } from "./hooks/useGetEmployeeOptions";
import { getCompany } from "store/manager/actions";
import HeaderSortCell from "components/Table/HeaderSortCell";
import SortProvider, {
  SortContextProps,
  sortContext,
} from "./context/useSortContext";

const SalesPage = () => {
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);
  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const {
    sales,
    isIdle,
    isFetching,
    totalItems,
    salesError,
    onGetSales,
    totalRevenue,
    totalRevenuePJ,
    salesFilters,
    totalTime,
    pageIndex,
    pageSize,
    totalPages,
  } = useSales();

  const { orderBy, orderDirection, setOrderBy, setOrderDirection } = useContext(
    sortContext,
  ) as SortContextProps;
  const [shouldLoad, setShouldLoad] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (queries: { [key: string]: any }) => {
    let newQueries = { ...query, ...queries };
    newQueries = cleanObject(newQueries);
    const queryString = stringifyURLSearchParams(newQueries);
    push(`${pathname}${queryString}`);

    onGetSales(newQueries);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const onChangeSize = (newSize) => {
    setShouldLoad(true);
    onChangeQueries({ ...salesFilters, pageSize: newSize, pageIndex: 1 });
  };

  const onChangePage = (newPage) => {
    setShouldLoad(true);
    onChangeQueries({ ...salesFilters, pageSize, pageIndex: newPage });
  };

  useEffect(() => {
    if (!isReady) return;
    setShouldLoad(true);
    onGetSales();
  }, [isReady, initQuery, onGetSales]);

  const itemList = useMemo(() => {
    return sortedRowInformation(sales, getComparator(orderDirection, orderBy));
  }, [sales, orderDirection, orderBy]);

  const headerList: CellProps[] = useMemo(
    () => [
      {
        name: "name",
        value: commonT("name"),
        align: "left",
        width: "20%",
        minWidth: 160,
        sort: true,
      },
      {
        name: "status",
        value: salesT("list.table.stage"),
        align: "center",
        width: "10%",
        minWidth: 160,
        sort: true,
      },
      {
        name: "owner.fullname",
        value: salesT("list.table.owner"),
        align: "left",
        width: "10%",
        sort: true,
        minWidth: 130,
      },
      {
        name: "revenue",
        value: salesT("list.table.revenue"),
        align: "right",
        sort: true,
        component: (props) => (
          <Stack {...props} alignItems="flex-end">
            <Text variant="h6" color="grey.400">
              {salesT("list.table.revenue")}
            </Text>
            <Text variant="h6">
              {formatCurrency(totalRevenue, {
                prefix: "$",
                numberOfFixed: 2,
              })}
            </Text>
          </Stack>
        ),
        minWidth: 100,
        width: "11%",
      },
      {
        name: "revenuePJ",
        value: salesT("list.table.pjRevenue"),
        align: "right",
        sort: true,
        component: (props) => {
          return (
            <Stack {...props} alignItems="flex-end">
              <Text variant="h6" color="grey.400">
                {salesT("list.table.pjRevenue")}
              </Text>
              <Text variant="h6">
                {formatCurrency(totalRevenuePJ, {
                  prefix: "$",
                  numberOfFixed: 2,
                })}
              </Text>
            </Stack>
          );
        },
        minWidth: 100,
        width: "15%",
      },
      {
        name: "estimate",
        value: salesT("list.table.time"),
        align: "right",
        component: (props) => (
          <Stack {...props} alignItems="flex-end">
            <Text variant="h6" color="grey.400">
              {salesT("list.table.time")}
            </Text>
            <Text variant="h6">
              {formatNumber(totalTime, { numberOfFixed: 0 })}h
            </Text>
          </Stack>
        ),
        minWidth: 100,
        width: "8%",
      },
      {
        name: "probability",
        value: salesT("list.table.probability"),
        align: "right",
        width: "10%",
        minWidth: 100,
        sort: true,
      },
      {
        name: "updated_time",
        value: salesT("list.table.lastActivity"),
        align: "left",
        width: "10%",
        minWidth: 100,
        sort: true,
      },
    ],
    [commonT, salesT, totalRevenue, totalRevenuePJ, totalTime],
  );

  useFetchEmployeeOptions();
  return (
    <>
      <FixedLayout
        maxHeight={920}
        maxWidth={{
          xs: 1120,
          xl: 1450,
        }}
      >
        <SaleListAction />
        <TableLayout
          handleRequestSort={handleRequestSort}
          orderDirection={orderDirection}
          orderBy={orderBy}
          maxHeight={860}
          headerList={headerList}
          noData={!isIdle && totalItems === 0}
          minWidth={1020}
          px={2}
          pending={isFetching && shouldLoad}
          headerProps={{
            sx: { px: { xs: 2, md: 2 }, overflow: "auto" },
          }}
          error={salesError as string}
        >
          {itemList.map((item, index) => (
            <SaleItem
              key={`Sale-item-${index}`}
              item={item}
              setShouldLoad={setShouldLoad}
            />
          ))}
        </TableLayout>
        <Pagination
          onChangePage={onChangePage}
          onChangeSize={onChangeSize}
          pageSize={pageSize}
          containerProps={{ px: { md: 3 }, py: 1 }}
          totalItems={totalItems}
          totalPages={totalPages}
          page={pageIndex}
        />
      </FixedLayout>
    </>
  );
};

export default SalesPage;
