import { DataStatus } from "constant/enums";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { GetSalesListQueries, getSales } from "./actions";

export const useSales = () => {
  const dispatch = useAppDispatch();
  const { sales, salesFilters, salesError, salesStatus } = useAppSelector(
    (state) => state.sales,
    shallowEqual,
  );
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.sales.salesPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => salesStatus === DataStatus.IDLE, [salesStatus]);
  const isFetching = useMemo(
    () => salesStatus === DataStatus.LOADING,
    [salesStatus],
  );

  const totalRevenue = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.revenue, 0);
  }, [pageIndex, pageSize, totalItems, totalPages]);

  const totalRevenuePJ = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.revenuePJ, 0);
  }, [pageIndex, pageSize, totalItems, totalPages]);

  const totalTime = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.estimate, 0);
  }, [pageIndex, pageSize, totalItems, totalPages]);

  const onGetSales = useCallback(
    async (queries: GetSalesListQueries) => {
      await dispatch(getSales(queries));
    },
    [dispatch],
  );

  return {
    sales,
    salesFilters,
    salesError,
    totalRevenue,
    totalRevenuePJ,
    totalTime,
    salesStatus,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    isIdle,
    isFetching,
    onGetSales,
  };
};
