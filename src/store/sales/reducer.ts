import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { ItemListResponse, Paging, User } from "constant/types";
import { Avatar } from "store/chat/type";
import { Comment } from "store/project/reducer";
import { getFiltersFromQueries } from "utils/index";
import {
  GetSalesListQueries,
  createComment,
  createDeal,
  createServiceSection,
  createTodo,
  deleteTodo,
  getDetailDeal,
  getSales,
  getServices,
  updateDeal,
  updatePriority,
  updateServiceSection,
  updateTodo,
} from "./actions";
import build from "next/dist/build";

export interface Todo {
  id: string;
  name: string;
  is_done: boolean;
  priority: number;
  expiration_date: string;
  owner: string;
}
export interface SalesComment extends Omit<Comment, "creator"> {
  creator: {
    body: User;
  };
}
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
  members: User[];
  description?: string;
  is_active: boolean;
  company: string;
  avatar?: Avatar[];
  tags?: string[];
  currency: string;
  probability: number;
  todo_list: Todo[];
  stage: string;
  comments: SalesComment[];
  revenue: number;
  revenuePJ: number;
  todoItem: Todo;
  estimate: number;
  activity: string[];
}

export interface Service {
  id: string;
  name: string;
  desc: string;
  serviceType: string;
  billType: string;
  unit: string;
  estimate: number;
  qty: number;
  price: number;
  discount: number;
  markup: 1;
  tolBudget: number;
  createdAt: string;
  updatedAt: string;
  creator: string;
}

export interface ServiceSection {
  id: string;
  start_date: string;
  service: Service[];
  createdAt: string;
  updatedAt: string;
  creator: string;
  deal: string;
}

export interface SaleState {
  sales: Sales[];
  salesStatus: DataStatus;
  salesPaging: Paging;
  salesError?: string;
  salesFilters: Omit<GetSalesListQueries, "pageIndex" | "pageSize">;

  saleDetail: Sales | null;
  saleDetailStatus: DataStatus;
  saleDetailError?: string;

  salesTodo: Todo | null;
  salesTodoStatus: DataStatus;
  salesTodoError?: string;

  comments: SalesComment[];
  commentsStatus: DataStatus;
  commentsError?: string;

  serviceSectionList: ServiceSection[];
  serviceSection: ServiceSection | null;
  servicesStatus: DataStatus;
  servicesError?: string;
}

const initState: SaleState = {
  sales: [],
  salesStatus: DataStatus.IDLE,
  salesPaging: DEFAULT_PAGING,
  salesError: undefined,
  salesFilters: {
    sort: "-1",
  },

  saleDetail: null,
  saleDetailStatus: DataStatus.IDLE,
  saleDetailError: undefined,

  salesTodo: null,
  salesTodoStatus: DataStatus.IDLE,
  salesTodoError: undefined,

  comments: [],
  commentsStatus: DataStatus.IDLE,
  commentsError: undefined,

  serviceSectionList: [],
  serviceSection: null,
  servicesStatus: DataStatus.IDLE,
  servicesError: undefined,
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
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.sales.unshift(action.payload);
      if (state.sales.length > state.salesPaging.pageSize) {
        state.sales.pop();
        if (
          state.salesPaging.totalPages != undefined &&
          state.salesPaging.totalPages <
            (state.salesPaging.totalItems || 0) / state.salesPaging.pageSize
        ) {
          state.salesPaging.totalPages += 1;
        }
      }
      if (state.salesPaging.totalItems !== undefined) {
        state.salesPaging.totalItems += 1;
      }
    });
    builder.addCase(updateDeal.fulfilled, (state, action) => {
      const index = state.sales.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.sales[index] = Object.assign(state.sales[index], action.payload);
      }
    });
    builder.addCase(updateDeal.rejected, (state, action) => {
      state.salesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.salesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(getDetailDeal.pending, (state, action) => {
      state.salesStatus = DataStatus.LOADING;
    });
    builder.addCase(getDetailDeal.fulfilled, (state, action) => {
      state.saleDetail = action.payload;
      state.salesStatus = DataStatus.SUCCEEDED;
    });
    builder.addCase(getDetailDeal.rejected, (state, action) => {
      state.salesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(createTodo.pending, (state, action) => {
      state.salesTodoStatus = DataStatus.LOADING;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      if (state.saleDetail) {
        state.saleDetail.todo_list = action.payload.deal_update.todo_list;
      }
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.salesTodoError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      if (state.saleDetail) {
        state.saleDetail.todo_list = action.payload.deal_update.todo_list;
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.salesTodoError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      if (state.saleDetail) {
        state.saleDetail.todo_list = action.payload.deal_update.todo_list;
      }
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.salesTodoError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      if (state.saleDetail) {
        state.saleDetail.todo_list = action.payload.deal_update.todo_list;
      }
    });
    builder.addCase(getServices.pending, (state, action) => {
      state.servicesStatus = DataStatus.LOADING;
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.serviceSectionList = action.payload.sections;
      state.servicesStatus = DataStatus.SUCCEEDED;
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.servicesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
    });
    builder.addCase(updateServiceSection.fulfilled, (state, action) => {
      state.serviceSection = action.payload.service;
      state.servicesStatus = DataStatus.SUCCEEDED;
    });
    builder.addCase(updateServiceSection.rejected, (state, action) => {
      state.servicesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
      state.servicesStatus = DataStatus.FAILED;
    });
    builder.addCase(createServiceSection.fulfilled, (state, action) => {
      state.servicesStatus = action.payload;
    });
    builder.addCase(createServiceSection.rejected, (state, action) => {
      state.servicesError = action.error.message ?? AN_ERROR_TRY_AGAIN;
      state.servicesStatus = DataStatus.FAILED;
    });
  },
});

export const salesReducer = salesSlice.reducer;
