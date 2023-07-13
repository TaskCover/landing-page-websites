import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  BodyCreateTimeSheet,
  GetMyTimeSheetQueries,
  createTimeSheet,
  deleteTimeSheet,
  getCompanyTimeSheet,
  getMyTimeSheet,
  updateTimeSheet,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { BaseQueries, Option } from "constant/types";
import { getFiltersIgnoreId } from "utils/index";
import { DEFAULT_RANGE_ACTIVITIES } from "./reducer";

export const useGetMyTimeSheet = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    status,
    error,
    itemStatus,
    companyItems,
    statusUpdate,
    statusDelete,
  } = useAppSelector((state) => state.timeTracking, shallowEqual);
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

  const onGetCompanyTimeSheet = useCallback(
    async (queries: GetMyTimeSheetQueries) => {
      await dispatch(getCompanyTimeSheet(queries));
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

  const onUpdateTimeSheet = useCallback(
    async (data: BodyCreateTimeSheet) => {
      try {
        return await dispatch(updateTimeSheet(data))
          .unwrap()
          .then(() => {
            dispatch(getMyTimeSheet(DEFAULT_RANGE_ACTIVITIES));
          });
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onDeleteTimeSheet = useCallback(
    async (data: { id: string }) => {
      try {
        return await dispatch(deleteTimeSheet(data))
          .unwrap()
          .then(() => {
            dispatch(getMyTimeSheet(DEFAULT_RANGE_ACTIVITIES));
          });
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  return {
    items,
    companyItems,
    status,
    itemStatus,
    statusUpdate,
    statusDelete,
    error,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetMyTimeSheet,
    onCreateTimeSheet,
    onGetCompanyTimeSheet,
    onUpdateTimeSheet,
    onDeleteTimeSheet,
  };
};
