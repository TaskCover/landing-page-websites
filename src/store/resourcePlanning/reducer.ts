import { createSlice } from "@reduxjs/toolkit";
import {
  IBookingAllFitler,
  createBookingResource,
  getBookingAll,
  getMyBookingResource,
  resourceActionType,
} from "./action";
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
  bookingAllError: string;
  bookingAllStatus: DataStatus;

  myBooking: IBookingItem[];
  myBookingError: string;
  myBookingFilter: IBookingAllFitler;
  myBookingStatus: DataStatus;
}

const initialState: ResoucrPlanningState = {
  bookingAllFilter: DEFAULT_BOOKING_ALL_FILTER,
  datePicker: {
    dateRange: [],
    selectedDate: null,
  },
  currentDate: dayjs().toString(),

  bookingAll: [],
  bookingAllStatus: DataStatus.IDLE,
  bookingAllError: "",

  myBooking: [],
  myBookingStatus: DataStatus.IDLE,
  myBookingFilter: DEFAULT_BOOKING_ALL_FILTER,
  myBookingError: "",
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
        state.bookingAllStatus = DataStatus.LOADING;
      })
      .addCase(getBookingAll.fulfilled, (state, action) => {
        state.bookingAllFilter = action.meta.arg;
        state.bookingAll = action.payload;
        state.bookingAllStatus = DataStatus.SUCCEEDED;
      })
      .addCase(getBookingAll.rejected, (state, action) => {
        state.bookingAllError = action.error.message || "";
        state.bookingAllStatus = DataStatus.FAILED;
      })
      .addCase(getMyBookingResource.pending, (state) => {
        state.myBookingStatus = DataStatus.LOADING;
      })
      .addCase(getMyBookingResource.fulfilled, (state, action) => {
        state.myBooking = action.payload;
        state.myBookingStatus = DataStatus.SUCCEEDED;
      })
      .addCase(getMyBookingResource.rejected, (state, action) => {
        state.myBookingError = action.error.message || "";
        state.myBookingStatus = DataStatus.FAILED;
      })
      .addCase(createBookingResource.fulfilled, (state, action) => {
        if (state.bookingAll) {
          state.bookingAll.push(action.payload);
        }
      })
      .addCase(createBookingResource.rejected, (state, action) => {
        state.bookingAllError = action.error.message || "";
        state.bookingAllStatus = DataStatus.FAILED;
      });
  },
});

export const resourcePlanningReducer = resourcePlanningSlice.reducer;
export const { setBookingAllFilter, setCurrentDate, setDatePicker } =
  resourcePlanningSlice.actions;
