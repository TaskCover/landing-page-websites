import { DataStatus, SORT_OPTIONS } from "constant/enums";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  DealData,
  GetSalesListQueries,
  createDeal,
  getSales,
  updateDeal,
} from "./actions";
import moment from "moment";

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
  }, [sales]);

  const totalRevenuePJ = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.revenuePJ, 0);
  }, [sales]);

  const totalTime = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.estimate, 0);
  }, [sales]);

  const onGetSales = useCallback(
    async (queries: GetSalesListQueries) => {
      await dispatch(getSales(queries));
    },
    [dispatch],
  );

  const onCreateDeal = useCallback(
    async (data) => {
      const members = data.members.map((value) => ({ id: value }));
      const description = data.tags.join(",");
      const convertedBody: DealData = {
        currency: data.currency,
        owner: data.owner,
        description: description,
        name: data.dealName,
        members,
        company_id: data.company,
      };
      await dispatch(createDeal(convertedBody)).then(() => {
        let newPageIndex = totalPages || 0;
        if (totalPages && totalItems) {
          newPageIndex =
            totalItems % pageSize === 0 ? totalPages + 1 : totalPages;
        }
        onGetSales({
          ...salesFilters,
          pageIndex: 1,
          pageSize: 10,
          sort: SORT_OPTIONS.DESC,
        });
      });
    },
    [dispatch],
  );
  const onUpdateDeal = useCallback(
    async (data) => {
      const members = data.members?.map((value) => ({ id: value }));
      const description = data.tags?.join(",");
      const convertedBody: DealData = {
        currency: data.currency,
        owner: data.owner,
        description: description,
        name: data.dealName,
        members,
        company_id: data.company,
      };
      await dispatch(updateDeal({ id: data.id, data: convertedBody }));
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
    onUpdateDeal,
    onCreateDeal,
  };
};
