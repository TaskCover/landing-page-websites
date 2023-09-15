import { createSlice } from "@reduxjs/toolkit";
import { resourceActionType } from "./action";
import dayjs from "dayjs";

export interface IBookingAllFitler {
  start_date: string;
  end_date: string;
  search_key: string;
}

export interface IDatePicker {
  dateRange: Date[];
  selectedDate: Date | null;
}

interface ResoucrPlanningState {
  bookingAllFilter: IBookingAllFitler;
  datePicker: IDatePicker;
  currentDate: string;
}

const initialState: ResoucrPlanningState = {
  bookingAllFilter: {
    start_date: "",
    end_date: "",
    search_key: "",
  },
  datePicker: {
    dateRange: [],
    selectedDate: null,
  },
  currentDate: dayjs().toString(),
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
});

export const resourcePlanningReducer = resourcePlanningSlice.reducer;
export const { setBookingAllFilter, setCurrentDate, setDatePicker } =
  resourcePlanningSlice.actions;
