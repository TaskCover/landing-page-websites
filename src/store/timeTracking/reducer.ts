import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { getMyTimeSheet } from "./actions";
import {
  Attachment,
  BaseQueries,
  ItemListResponse,
  Option,
  Paging,
  User,
} from "constant/types";
import { DataStatus, Permission, Status } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import {
  formatDate,
  getFiltersFromQueries,
  removeDuplicateItem,
} from "utils/index";
import { Position } from "store/company/reducer";
import { subDays } from "date-fns";

export interface MyTimeSheet {
  created_time: string;
  day: string;
  duration: number;
  end_time: string;
  id: string;
  note: string;
  position: { id: string; name: string };
  project_id: string;
  start_time: string;
  type: string;
  user_id: string;
  _id: string;
}

export interface TimeTrackingState {
  items: MyTimeSheet[];
  params: object;
  status: DataStatus;
  paging: Paging;
  error?: string;
}
export type GetActivitiesQueries = {
  start_date: string;
  end_date: string;
};

export type PayloadType = {
  meta: { arg: GetActivitiesQueries };
  payload: MyTimeSheet[];
  type: string;
};

export const DEFAULT_RANGE_ACTIVITIES: GetActivitiesQueries = {
  start_date: formatDate(subDays(new Date(), 7).getTime()),
  end_date: formatDate(Date.now()),
};

const initialState: TimeTrackingState = {
  items: [],
  params: {},
  status: DataStatus.IDLE,
  paging: DEFAULT_PAGING,
};

const timeTrackingSlice = createSlice({
  name: "timeTracking",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getMyTimeSheet.pending, (state, action) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        getMyTimeSheet.fulfilled,
        (state, action: PayloadAction<MyTimeSheet[]>) => {
          const items = action.payload;
          state.items = items as MyTimeSheet[];
          state.status = DataStatus.SUCCEEDED;
          state.error = undefined;
        },
      )
      .addCase(getMyTimeSheet.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      }),
});

export const { reset } = timeTrackingSlice.actions;

export default timeTrackingSlice.reducer;
