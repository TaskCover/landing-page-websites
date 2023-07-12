import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  BodyCreateTimeSheet,
  GetMyTimeSheetQueries,
  createTimeSheet,
  getMyTimeSheet,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { BaseQueries, Option } from "constant/types";
import { getFiltersIgnoreId } from "utils/index";
import { DEFAULT_RANGE_ACTIVITIES } from "./reducer";

export const useGetMyTimeSheet = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, itemStatus } = useAppSelector(
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

  const onCreateTimeSheet = useCallback(
    async (data: Omit<BodyCreateTimeSheet, "id">) => {
      return await dispatch(createTimeSheet(data))
        .unwrap()
        .then(() => {
          dispatch(getMyTimeSheet(DEFAULT_RANGE_ACTIVITIES));
        });
    },
    [dispatch],
  );

  return {
    items,
    status,
    itemStatus,
    error,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetMyTimeSheet,
    onCreateTimeSheet,
  };
};
