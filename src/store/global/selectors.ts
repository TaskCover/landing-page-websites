import { useAppDispatch, useAppSelector } from "store/hooks";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { getPositions } from "./actions";

export const usePositions = () => {
  const dispatch = useAppDispatch();
  const {
    positions: items,
    positionsStatus: status,
    positionsError: error,
  } = useAppSelector((state) => state.global, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const options = useMemo(
    () =>
      items.map((item) => ({ label: item.name ?? "Unknown", value: item.id })),
    [items],
  );

  const onGetPositions = useCallback(async () => {
    await dispatch(getPositions());
  }, [dispatch]);

  return {
    items,
    status,
    isIdle,
    isFetching,
    error,
    options,
    onGetPositions,
  };
};
