import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  getMyTimeSheet,
  createTimeSheet,
  BodyCreateTimeSheet,
  getCompanyTimeSheet,
  updateTimeSheet,
  deleteTimeSheet,
  getWorkLog,
  pinTimeSheet,
  GetMyTimeSheetQueries,
  getSameWorker,
} from "./actions";
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
import dayjs from "dayjs";

export interface MyTimeSheet {
  created_time?: string;
  day?: string;
  duration?: number;
  end_time?: string;
  id?: string;
  note?: string;
  position?: { id: string; name: string };
  project_id?: string;
  start_time?: string;
  type?: string;
  user_id?: string;
  _id?: string;
}

export interface WorkLogItem {
  id: string;
  created_time: string;
  user_id: string;
  task_id: string;
  task_list_id: string;
  task_name: string;
  task_number: string;
  project_id: string;
  action: string;
}

export interface WorkLogResponse {
  page?: number;
  total?: number;
  total_page?: number;
  data?: WorkLogItem[];
}
export interface CompanyTimeSheet {
  id: string;
  fullname: string;
  company: string;
  avatar: {
    object: string;
    name: string;
    link: string;
  };
  email: string;
  position: string;
  timesheet: MyTimeSheet[];
}
export interface ISameWorker {
  id?: string;
  fullname?: string;
  company?: string;
  avatar?: {
    object?: string;
    name?: string;
    link?: string;
  };
  email?: string;
  position?: {
    id?: string;
    name?: string;
  };
}
export interface TimeTrackingState {
  items: MyTimeSheet[];
  timeSheet: MyTimeSheet;
  params: GetMyTimeSheetQueries;
  status: DataStatus;
  itemStatus: DataStatus;
  statusDelete: DataStatus;
  paging: Paging;
  error?: string;

  companyItems: CompanyTimeSheet[];
  companyStatus: DataStatus;
  statusUpdate: DataStatus;

  workLog: WorkLogResponse;
  sameWorker: ISameWorker[];
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
const today = dayjs().add(1, "day"); // Ngày hiện tại + 1 ngày (ngày mai)
const startOfWeek = today.startOf("week").add(0, "day"); // Ngày bắt đầu tuần (chủ nhật)
const endOfWeek = today.startOf("week").add(6, "day"); // Ngày kết thúc tuần (thứ 2)

const defaultStartDate = startOfWeek.format("YYYY-MM-DD");
const defaultEndDate = endOfWeek.format("YYYY-MM-DD");

export const DEFAULT_RANGE_ACTIVITIES: GetActivitiesQueries = {
  start_date: defaultStartDate,
  end_date: defaultEndDate,
};

const initialState: TimeTrackingState = {
  items: [],
  timeSheet: {},
  params: DEFAULT_RANGE_ACTIVITIES,
  itemStatus: DataStatus.IDLE,
  statusDelete: DataStatus.IDLE,
  status: DataStatus.IDLE,
  paging: DEFAULT_PAGING,

  companyItems: [],
  companyStatus: DataStatus.IDLE,
  statusUpdate: DataStatus.IDLE,

  workLog: {},
  sameWorker: [],
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
        //console.log("BodyPinTimeSheet", action);
        state.params = action.meta.arg;
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
      })
      .addCase(
        createTimeSheet.fulfilled,
        (state, action: PayloadAction<BodyCreateTimeSheet>) => {
          state.itemStatus = DataStatus.SUCCEEDED;

          state.error = undefined;
        },
      )
      .addCase(getCompanyTimeSheet.pending, (state, action) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        getCompanyTimeSheet.fulfilled,
        (state, action: PayloadAction<CompanyTimeSheet[]>) => {
          const items = action.payload;
          state.companyItems = items as CompanyTimeSheet[];
          state.companyStatus = DataStatus.SUCCEEDED;
          state.error = undefined;
        },
      )
      .addCase(getCompanyTimeSheet.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })

      .addCase(
        updateTimeSheet.fulfilled,
        (state, action: PayloadAction<MyTimeSheet>) => {
          state.statusUpdate = DataStatus.SUCCEEDED;
          state.timeSheet = action.payload;
        },
      )
      .addCase(
        deleteTimeSheet.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.statusDelete = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getWorkLog.pending, (state, action) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        getWorkLog.fulfilled,
        (state, action: PayloadAction<WorkLogResponse>) => {
          const items = action.payload;
          state.workLog = items as WorkLogResponse;
          state.status = DataStatus.SUCCEEDED;
          state.error = undefined;
        },
      )
      .addCase(getWorkLog.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(pinTimeSheet.fulfilled, (state, _) => {
        state.status = DataStatus.SUCCEEDED;
      }),
  // .addCase(
  //   getSameWorker.fulfilled,
  //   (state, action: PayloadAction<ISameWorker[]>) => {
  //     const items = action.payload;
  //     state.sameWorker = items as ISameWorker[];
  //   },
  // ),
});

export const { reset } = timeTrackingSlice.actions;

export default timeTrackingSlice.reducer;
