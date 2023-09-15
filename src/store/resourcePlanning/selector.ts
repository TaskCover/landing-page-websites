import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppSelector } from "store/hooks";
import { IBookingAllFitler } from "./action";
import {
  IDatePicker,
  setBookingAllFilter,
  setCurrentDate,
  setDatePicker,
} from "./reducer";

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

  const dispatch = useDispatch();

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
