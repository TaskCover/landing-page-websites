import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  BookingData,
  IBookingAllFitler,
  createBookingResource,
  getBookingAll,
  getMyBookingResource,
  updateBookingResource,
} from "./action";
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
import { useTranslations } from "next-intl";
import { NS_RESOURCE_PLANNING } from "constant/index";

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

export const useBookingAll = () => {
  const { bookingAll, bookingAllError, bookingAllFilter, bookingAllStatus } =
    useAppSelector((state) => state.resourcePlanning);
  const { onAddSnackbar } = useSnackbar();
  const resourceT = useTranslations(NS_RESOURCE_PLANNING);
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
  const createBooking = async (data: BookingData) => {
    await dispatch(createBookingResource(data))
      .then(async () => {
        await getBookingResource(bookingAllFilter);
        onAddSnackbar(resourceT("form.createSuccess"), "success");
      })
      .catch((err) => {
        onAddSnackbar(resourceT("form.createFailed"), "error");
      });
  };

  const updateBooking = async (data: BookingData, id: string) => {
    await dispatch(
      updateBookingResource({
        ...data,
        id,
      }),
    )
      .then(async () => {
        await getBookingResource(bookingAllFilter);
        onAddSnackbar(resourceT("form.updateSuccess"), "success");
      })
      .catch((err) => {
        onAddSnackbar(resourceT("form.updateFailed"), "error");
      });
  };
  useEffect(() => {
    if (bookingAllError) {
      onAddSnackbar(bookingAllError, "error");
    }
  }, [bookingAllError]);
  return {
    bookingAllFilter,
    totalHour,
    createBooking,
    isReady,
    updateBooking,
    bookingAll,
    bookingAllError,
    getBookingResource,
  };
};

export const useMyBooking = () => {
  const { myBooking, myBookingError, myBookingStatus, myBookingFilter } =
    useAppSelector((state) => state.resourcePlanning);
  const { onAddSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const isReady = useMemo(
    () => myBookingStatus === DataStatus.SUCCEEDED,
    [myBookingStatus],
  );

  const getMyBooking = async (params: IBookingAllFitler) => {
    await dispatch(getMyBookingResource(params));
  };

  useEffect(() => {
    if (myBookingError) {
      onAddSnackbar(myBookingError, "error");
    }
  }, [myBookingError]);

  return {
    myBooking,
    myBookingError,
    myBookingFilter,
    isReady,
    getMyBooking,
  };
};