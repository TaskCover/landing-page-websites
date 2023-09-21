import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { IBookingAllFitler, getBookingAll } from "./action";
import {
  IDatePicker,
  setBookingAllFilter,
  setCurrentDate,
  setDatePicker,
} from "./reducer";
import { useSnackbar } from "store/app/selectors";
import { useEffect, useMemo } from "react";
import { DataStatus } from "constant/enums";
import dayjs from "dayjs";

export const useResourceFilter = () => {
  const { end_date, search_key, start_date, position, working_sort } =
    useAppSelector((state) => state.resourcePlanning.bookingAllFilter);
  const dispatch = useDispatch();

  const updateFilter = (filter: IBookingAllFitler) => {
    dispatch(setBookingAllFilter(filter));
  };

  return {
    end_date,
    search_key,
    position,
    working_sort,
    start_date,
    updateFilter,
  };
};

export const useResourceDate = () => {
  const { currentDate, datePicker } = useAppSelector(
    (state) => state.resourcePlanning,
  );
  const { dateRange, selectedDate } = datePicker;

  const dispatch = useAppDispatch();

  const updateDate = (date: IDatePicker) => {
    dispatch(setDatePicker(date));
  };

  const updateCurrentDate = (date: string) => {
    dispatch(setCurrentDate(date));
  };

  return {
    dateRange,
    selectedDate,
    updateDate,
    updateCurrentDate,
    currentDate,
  };
};

export const useGetBookingAll = () => {
  const {
    bookingAll,
    bookingAllLoading,
    bookingAllError,
    bookingAllFilter,
    bookingAllStatus,
  } = useAppSelector((state) => state.resourcePlanning);
  const { onAddSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const getBookingResource = async (params: IBookingAllFitler) => {
    const newParams = {
      ...params,
      start_date: params.start_date ?? dayjs().format("YYYY-MM-DD"),
      end_date: params.end_date ?? dayjs().format("YYYY-MM-DD"),
    };

    await dispatch(getBookingAll(params));
  };

  const isReady = useMemo(
    () => bookingAllStatus === DataStatus.SUCCEEDED,
    [bookingAllStatus],
  );

  const totalHour = useMemo(
    () => bookingAll.reduce((prev, item) => prev + item.total_hour, 0),
    [bookingAll],
  );

  useEffect(() => {
    if (bookingAllError) {
      onAddSnackbar(bookingAllError, "error");
    }
  }, [bookingAllError]);
  return {
    bookingAllFilter,
    totalHour,
    isReady,
    bookingAll,
    bookingAllLoading,
    bookingAllError,
    getBookingResource,
  };
};
