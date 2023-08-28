import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { ItemListResponse, Paging, User } from "constant/types";
import { Avatar } from "store/chat/type";
import { Comment } from "store/project/reducer";
import { getFiltersFromQueries } from "utils/index";
import { GetSalesListQueries, getSales } from "./actions";

export interface Sales {
  id: string;
  name: string;
  created_time: string;
  updated_time: string;
  created_by: User;
  updated_by: User;
  status: string;
  start_date: string;
  owner: User;
  member: User[];
  description?: string;
  is_active: boolean;
  company: string;
  avatar?: Avatar[];
  tags?: string[];
  currency: string;
  probability: number;
  todo_list: string[];
  stage: string;
  comment: Comment[];
  activity: string[];
}

export interface SaleState {
  sales: Sales[];
  salesStatus: DataStatus;
  salesPaging: Paging;
  salesError?: string;
  salesFilters: Omit<GetSalesListQueries, "pageIndex" | "pageSize">;
}

const initState: SaleState = {
  sales: [],
  salesStatus: DataStatus.IDLE,
  salesPaging: DEFAULT_PAGING,
  salesError: undefined,
  salesFilters: {},
};

const salesSlice = createSlice({
  name: "sales",
  initialState: initState,
  reducers: {
    reset: () => initState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSales.pending, (state, action) => {
      state.salesStatus = DataStatus.LOADING;
      state.salesFilters = getFiltersFromQueries(action.meta.arg);
      state.salesPaging.pageIndex = Number(
        action.meta.arg.pageIndex || DEFAULT_PAGING.pageIndex,
      );
      state.salesPaging.pageSize = Number(
        action.meta.arg.pageSize || DEFAULT_PAGING.pageSize,
      );
    });
    builder.addCase(
      getSales.fulfilled,
      (state, action: PayloadAction<ItemListResponse>) => {
        const { items, ...paging } = action.payload;

        state.sales = items as Sales[];
        state.salesStatus = DataStatus.SUCCEEDED;
        state.salesPaging = Object.assign(state.salesPaging, paging);
      },
    );
    builder.addCase(getSales.rejected, (state, action) => {
      state.salesStatus = DataStatus.FAILED;
      state.salesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
  },
});

export const salesReducer = salesSlice.reducer;