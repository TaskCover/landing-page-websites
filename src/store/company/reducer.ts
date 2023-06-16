import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getEmployees,
  GetEmployeeListQueries,
  createEmployee,
  updateEmployee,
} from "./actions";
import {
  BaseQueries,
  ItemListResponse,
  Option,
  Paging,
  User,
} from "constant/types";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { getFiltersFromQueries } from "utils/index";

export interface Employee extends User {
  created_time: string;
  department: string;
  is_active: boolean;
  updated_time: string;
  date_end_using: string;
  date_start_using: string;
  is_pay_user: boolean;
}

export interface CompanyState {
  employees: Employee[];
  employeesStatus: DataStatus;
  employeesPaging: Paging;
  employeesError?: string;
  employeesFilters: Omit<GetEmployeeListQueries, "pageIndex" | "pageSize">;

  employeeOptions: Employee[];
  employeeOptionsStatus: DataStatus;
  employeeOptionsPaging: Paging;
  employeeOptionsError?: string;
  employeeOptionsFilters: Omit<
    GetEmployeeListQueries,
    "pageIndex" | "pageSize"
  >;
}

const initialState: CompanyState = {
  employees: [],
  employeesStatus: DataStatus.IDLE,
  employeesPaging: DEFAULT_PAGING,
  employeesFilters: {},

  employeeOptions: [],
  employeeOptionsStatus: DataStatus.IDLE,
  employeeOptionsPaging: DEFAULT_PAGING,
  employeeOptionsFilters: {},
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getEmployees.pending, (state, action) => {
        const prefixKey = action.meta.arg["concat"]
          ? "employeeOptions"
          : "employees";

        state[`${prefixKey}Status`] = DataStatus.LOADING;
        state[`${prefixKey}Filters`] = getFiltersFromQueries(action.meta.arg);

        if (action.meta.arg?.concat && action.meta.arg.pageIndex === 1) {
          state.employeeOptions = [];
        }
        state[`${prefixKey}Paging`].pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state[`${prefixKey}Paging`].pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;
      })
      .addCase(
        getEmployees.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, concat, ...paging } = action.payload;

          if (concat) {
            state.employeeOptions = state.employeeOptions.concat(
              items as Employee[],
            );
          } else {
            state.employees = items as Employee[];
          }

          const prefixKey = concat ? "employeeOptions" : "employees";

          state[`${prefixKey}Status`] = DataStatus.SUCCEEDED;
          state[`${prefixKey}Error`] = undefined;
          state[`${prefixKey}Paging`] = Object.assign(
            state[`${prefixKey}Paging`],
            paging,
          );
        },
      )
      .addCase(getEmployees.rejected, (state, action) => {
        const prefixKey = action.meta.arg["concat"]
          ? "employeeOptions"
          : "employees";

        state[`${prefixKey}Status`] = DataStatus.FAILED;
        state[`${prefixKey}Error`] =
          action.error?.message ?? AN_ERROR_TRY_AGAIN;
        if (!action.meta.arg["concat"]) {
          state.employeesPaging.totalItems = undefined;
          state.employeesPaging.totalPages = undefined;
        }
      })
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees.unshift(action.payload);
          if (state.employeesPaging.totalItems !== undefined) {
            state.employeesPaging.totalItems += 1;
          }
        },
      )
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          const indexUpdated = state.employees.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (indexUpdated !== -1) {
            state.employees[indexUpdated] = Object.assign(
              state.employees[indexUpdated],
              action.payload,
            );
          }
        },
      ),
});

export default companySlice.reducer;
