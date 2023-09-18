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
import { useEffect } from "react";

export const useResourceFilter = () => {
  const { end_date, search_key, start_date } = useAppSelector(
    (state) => state.resourcePlanning.bookingAllFilter,
  );
  const dispatch = useDispatch();

  const updateFilter = (filter: IBookingAllFitler) => {
    dispatch(setBookingAllFilter(filter));
  };

  return {
    end_date,
    search_key,
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
  const { bookingAll, bookingAllLoading, bookingAllError, bookingAllFilter } =
    useAppSelector((state) => state.resourcePlanning);
  const { onAddSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const getBookingResource = async (params: IBookingAllFitler) => {
    await dispatch(getBookingAll(params));
  };

  useEffect(() => {
    if (bookingAllError) {
      onAddSnackbar(bookingAllError, "error");
    }
  }, [bookingAllError]);
  return {
    bookingAllFilter,
    bookingAll,
    bookingAllLoading,
    bookingAllError,
    getBookingResource,
  };
};
