import { createSlice } from "@reduxjs/toolkit";
import { IBookingAllFitler, getBookingAll, resourceActionType } from "./action";
import dayjs from "dayjs";
import { Position } from "store/company/reducer";
import { Project } from "store/project/reducer";
import { DEFAULT_BOOKING_ALL_FILTER } from "components/sn-resource-planing/hepler";
import { DataStatus } from "constant/enums";

export interface IDatePicker {
  dateRange: Date[];
  selectedDate: Date | null;
}

export interface IBookingItem {
  id: string;
  booking_type: string;
  project_id?: string;
  position?: Partial<Position>;
  start_date: string;
  end_date: string;
  allocation: number;
  allocation_type: string;
  total_hour: number;
  note: string;
  user_id: string;
  created_time: string;
  project?: Partial<Project>;
}

export interface IBookingListItem {
  id: string;
  fullname: string;
  company: string;
  bookings: IBookingItem[];
  total_hour: number;
}
interface ResoucrPlanningState {
  datePicker: IDatePicker;
  currentDate: string;

  bookingAllFilter: IBookingAllFitler;
  bookingAll: IBookingListItem[];
  bookingAllLoading: boolean;
  bookingAllError: string;
  bookingAllStatus: DataStatus;
}

const initialState: ResoucrPlanningState = {
  bookingAllFilter: DEFAULT_BOOKING_ALL_FILTER,
  datePicker: {
    dateRange: [],
    selectedDate: null,
  },
  currentDate: dayjs().toString(),

  bookingAll: [],
  bookingAllLoading: false,
  bookingAllStatus: DataStatus.IDLE,
  bookingAllError: "",
};

export const resourcePlanningSlice = createSlice({
  initialState,
  name: "resourcePlanning",
  reducers: {
    setBookingAllFilter: (state, action) => {
      state.bookingAllFilter = action.payload;
    },
    setDatePicker: (state, action) => {
      state.datePicker = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingAll.pending, (state) => {
        state.bookingAllLoading = true;
        state.bookingAllStatus = DataStatus.LOADING;
      })
      .addCase(getBookingAll.fulfilled, (state, action) => {
        state.bookingAllFilter = action.meta.arg;
        state.bookingAllLoading = false;
        state.bookingAll = action.payload;
        state.bookingAllStatus = DataStatus.SUCCEEDED;
      })
      .addCase(getBookingAll.rejected, (state, action) => {
        state.bookingAllLoading = false;
        state.bookingAllError = action.error.message || "";
        state.bookingAllStatus = DataStatus.FAILED;
      });
  },
});

export const resourcePlanningReducer = resourcePlanningSlice.reducer;
export const { setBookingAllFilter, setCurrentDate, setDatePicker } =
  resourcePlanningSlice.actions;
