import { useAppDispatch, useAppSelector } from "store/hooks";
import { GetMyTimeSheetQueries, getMyTimeSheet } from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { BaseQueries, Option } from "constant/types";
import { getFiltersIgnoreId } from "utils/index";

export const useGetMyTimeSheet = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(
    (state) => state.timeTracking,
    shallowEqual,
  );
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.timeTracking.paging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetMyTimeSheet = useCallback(
    async (queries: GetMyTimeSheetQueries) => {
      await dispatch(getMyTimeSheet(queries));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetMyTimeSheet,
  };
};
