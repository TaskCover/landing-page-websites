import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getEmployees,
  GetEmployeeListQueries,
  createEmployee,
  updateEmployee,
  createPosition,
  updatePosition,
  getProjectTypeList,
  createProjectType,
  updateProjectType,
  deleteProjectType,
  deletePosition,
  updateMyCompany,
  getCostHistory,
  getPositionList,
  getMyCompany,
  deleteEmployees,
  getEmployeeOptions,
} from "./actions";
import { ItemListResponse, Paging, User } from "constant/types";
import { DataStatus, PayStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { getFiltersFromQueries, removeDuplicateItem } from "utils/index";

export interface Employee extends User {
  _id: string;
  created_time: string;
  department: string;
  is_active: boolean;
  updated_time: string;
  date_end_using: string;
  date_start_using: string;
  status: PayStatus;
  approve?: boolean;
  username?: string;
  id_rocket?: string;
}

export interface SearchChatText {
  avatar: string;
  fullname: string;
  matchedText: string;
  messageId: string;
  offset: number;
  roomId: string;
  ts: string;
  userId: string;
}

export interface Position {
  id: string;
  name: string;
  created_time: string;
  created_by: User;
  total_member_of_position?: number;
}

export interface CostHistory {
  id: string;
  time: string;
  payer: string;
  receiver: string;
  value: number;
}

export interface ProjectType {
  id: string;
  name: string;
  created_time: string;
  created_by: User;
}

export interface Company {
  id: string;
  code: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  is_active: boolean;

  created_time: string;
  number_of_user: number;
  total_member?: number;
  total_project?: number;
  total_position?: number;
  date_end_using: string;
  date_start_using: string;
  is_approve?: boolean | null;
  is_pay_company: boolean | null;
  tax_code: string;

  owner?: User;

  status: PayStatus;

  account_paid?: {
    total_paid: number;
    total_un_paid: number;
    total_account: number;
  };
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

  positions: Position[];
  positionsStatus: DataStatus;
  positionsError?: string;
  positionsPaging: Paging;

  projectTypes: ProjectType[];
  projectTypesStatus: DataStatus;
  projectTypesError?: string;
  projectTypesPaging: Paging;

  myItem?: Company;
  myItemStatus: DataStatus;
  myItemError?: string;

  costHistories: CostHistory[];
  costHistoriesStatus: DataStatus;
  costHistoriesPaging: Paging;
  costHistoriesError?: string;
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

  positions: [],
  positionsStatus: DataStatus.IDLE,
  positionsPaging: DEFAULT_PAGING,

  projectTypes: [],
  projectTypesStatus: DataStatus.IDLE,
  projectTypesPaging: DEFAULT_PAGING,

  myItemStatus: DataStatus.IDLE,

  costHistories: [],
  costHistoriesStatus: DataStatus.IDLE,
  costHistoriesPaging: DEFAULT_PAGING,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    reset: () => initialState,
  },
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
        state[`${prefixKey}Paging`].pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state[`${prefixKey}Paging`].pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getEmployees.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, concat, ...paging } = action.payload;

          if (concat) {
            state.employeeOptions = removeDuplicateItem(
              state.employeeOptions.concat(items as Employee[]),
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
      })
      .addCase(getEmployeeOptions.pending, (state, action) => {
        state.employeeOptionsStatus = DataStatus.LOADING;
        state.employeeOptionsFilters = getFiltersFromQueries(action.meta.arg);

        if (action.meta.arg.pageIndex === 1) {
          state.employeeOptions = [];
        }
        state.employeeOptionsPaging.pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state.employeeOptionsPaging.pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getEmployeeOptions.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;

          state.employeeOptions = removeDuplicateItem(
            state.employeeOptions.concat(items as Employee[]),
          );

          state.employeeOptionsStatus = DataStatus.SUCCEEDED;
          state.employeeOptionsError = undefined;
          state.employeeOptionsPaging = Object.assign(
            state.employeeOptionsPaging,
            paging,
          );
        },
      )
      .addCase(getEmployeeOptions.rejected, (state, action) => {
        state.employeeOptionsStatus = DataStatus.FAILED;
        state.employeeOptionsError =
          action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.employees.unshift(action.payload);

          if (state.employees.length > state.employeesPaging.pageSize) {
            state.employees.pop();
            if (state.employeesPaging.totalPages !== undefined) {
              state.employeesPaging.totalPages += 1;
            }
          }

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
      )
      .addCase(
        deleteEmployees.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.employees = state.employees.filter(
            (item) => !action.payload.includes(item.id),
          );

          if (state.employeesPaging.totalItems !== undefined) {
            state.employeesPaging.totalItems -= action.payload.length;
          }
        },
      )
      // POSITIONS
      .addCase(getPositionList.pending, (state, action) => {
        state.positionsStatus = DataStatus.LOADING;
        state.positionsPaging.pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state.positionsPaging.pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getPositionList.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;

          state.positions = items as Position[];
          state.positionsPaging = Object.assign(state.positionsPaging, paging);
          state.positionsStatus = DataStatus.SUCCEEDED;
          state.positionsError = undefined;
        },
      )
      .addCase(getPositionList.rejected, (state, action) => {
        state.positions = [];
        state.positionsStatus = DataStatus.FAILED;
        state.positionsError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(
        createPosition.fulfilled,
        (state, action: PayloadAction<Position>) => {
          state.positions.unshift({
            ...action.payload,
            total_member_of_position: 0,
          });
          if (state.positions.length > state.positionsPaging.pageSize) {
            state.positions.pop();
            if (state.positionsPaging.totalPages !== undefined) {
              state.positionsPaging.totalPages += 1;
            }
          }

          if (state.positionsPaging.totalItems !== undefined) {
            state.positionsPaging.totalItems += 1;
          }
        },
      )
      .addCase(
        updatePosition.fulfilled,
        (state, action: PayloadAction<Position>) => {
          const indexUpdated = state.positions.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (indexUpdated !== -1) {
            state.positions[indexUpdated] = Object.assign(
              state.positions[indexUpdated],
              action.payload,
            );
          }
        },
      )
      .addCase(
        deletePosition.fulfilled,
        (state, action: PayloadAction<string>) => {
          const indexDeleted = state.positions.findIndex(
            (item) => item.id === action.payload,
          );
          if (indexDeleted !== -1) {
            state.positions.splice(indexDeleted, 1);
          }
        },
      )

      .addCase(getProjectTypeList.pending, (state, action) => {
        state.projectTypesStatus = DataStatus.LOADING;
        state.projectTypesPaging.pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state.projectTypesPaging.pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getProjectTypeList.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;

          state.projectTypes = items as ProjectType[];
          state.projectTypesPaging = Object.assign(
            state.projectTypesPaging,
            paging,
          );
          state.projectTypesStatus = DataStatus.SUCCEEDED;
          state.projectTypesError = undefined;
        },
      )
      .addCase(getProjectTypeList.rejected, (state, action) => {
        state.projectTypes = [];
        state.projectTypesStatus = DataStatus.FAILED;
        state.projectTypesError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(
        createProjectType.fulfilled,
        (state, action: PayloadAction<ProjectType>) => {
          state.projectTypes.unshift(action.payload);
          if (state.projectTypes.length > state.projectTypesPaging.pageSize) {
            state.projectTypes.pop();
            if (state.projectTypesPaging.totalPages !== undefined) {
              state.projectTypesPaging.totalPages += 1;
            }
          }

          if (state.projectTypesPaging.totalItems !== undefined) {
            state.projectTypesPaging.totalItems += 1;
          }
        },
      )
      .addCase(
        updateProjectType.fulfilled,
        (state, action: PayloadAction<ProjectType>) => {
          const indexUpdated = state.projectTypes.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (indexUpdated !== -1) {
            state.projectTypes[indexUpdated] = Object.assign(
              state.projectTypes[indexUpdated],
              action.payload,
            );
          }
        },
      )
      .addCase(
        deleteProjectType.fulfilled,
        (state, action: PayloadAction<string>) => {
          const indexDeleted = state.projectTypes.findIndex(
            (item) => item.id === action.payload,
          );
          if (indexDeleted !== -1) {
            state.projectTypes.splice(indexDeleted, 1);
          }
        },
      )

      .addCase(getMyCompany.pending, (state) => {
        state.myItemStatus = DataStatus.LOADING;
      })
      .addCase(
        getMyCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.myItem = action.payload;
          state.myItemStatus = DataStatus.SUCCEEDED;
          state.myItemError = undefined;
        },
      )
      .addCase(getMyCompany.rejected, (state, action) => {
        state.myItem = undefined;
        state.myItemStatus = DataStatus.FAILED;
        state.myItemError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })

      .addCase(
        updateMyCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          if (state?.myItem?.id === action.payload.id) {
            state.myItem = Object.assign(state.myItem, action.payload);
          }
        },
      )

      .addCase(getCostHistory.pending, (state, action) => {
        state.costHistoriesStatus = DataStatus.LOADING;

        state.costHistoriesPaging.pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state.costHistoriesPaging.pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getCostHistory.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;
          state.costHistories = items as CostHistory[];
          state.costHistoriesStatus = DataStatus.SUCCEEDED;
          state.costHistoriesError = undefined;
          state.costHistoriesPaging = Object.assign(
            state.costHistoriesPaging,
            paging,
          );
        },
      )
      .addCase(getCostHistory.rejected, (state, action) => {
        state.costHistories = [];
        state.costHistoriesStatus = DataStatus.FAILED;
        state.costHistoriesError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      }),
});

export const { reset } = companySlice.actions;

export default companySlice.reducer;
