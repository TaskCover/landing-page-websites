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
  getCompany,
  updateCompany,
  getCostHistory,
  getCompanyList,
  GetCompanyListQueries,
  getPositionList,
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

export interface Position {
  id: string;
  name: string;
  created_time: string;
  created_by: User;
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
  date_end_using: string;
  date_start_using: string;
  is_approve: boolean;
  is_pay_company: boolean;
  tax_code: string;
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

  item?: Company;
  itemStatus: DataStatus;
  itemError?: string;

  costHistories: CostHistory[];
  costHistoriesStatus: DataStatus;
  costHistoriesPaging: Paging;
  costHistoriesError?: string;

  items: Company[];
  itemsStatus: DataStatus;
  itemsPaging: Paging;
  itemsError?: string;
  itemsFilters: Omit<GetCompanyListQueries, "pageIndex" | "pageSize">;

  itemOptions: Option[];
  itemOptionsStatus: DataStatus;
  itemOptionsPaging: Paging;
  itemOptionsError?: string;
  itemOptionsFilters: Omit<BaseQueries, "pageIndex" | "pageSize">;
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

  itemStatus: DataStatus.IDLE,

  costHistories: [],
  costHistoriesStatus: DataStatus.IDLE,
  costHistoriesPaging: DEFAULT_PAGING,

  items: [],
  itemsStatus: DataStatus.IDLE,
  itemsPaging: DEFAULT_PAGING,
  itemsFilters: {},

  itemOptions: [],
  itemOptionsStatus: DataStatus.IDLE,
  itemOptionsPaging: DEFAULT_PAGING,
  itemOptionsFilters: {},
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
      )

      .addCase(getPositionList.pending, (state, action) => {
        state.positionsStatus = DataStatus.LOADING;
        state.positionsPaging.pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state.positionsPaging.pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;
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
          state.positions.unshift(action.payload);
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
        state.projectTypesPaging.pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state.projectTypesPaging.pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;
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

      .addCase(getCompany.pending, (state) => {
        state.itemStatus = DataStatus.LOADING;
      })
      .addCase(
        getCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.item = action.payload;
          state.itemStatus = DataStatus.SUCCEEDED;
          state.itemError = undefined;
        },
      )
      .addCase(getCompany.rejected, (state, action) => {
        state.item = undefined;
        state.itemStatus = DataStatus.FAILED;
        state.itemError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(
        updateCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          if (state?.item?.id === action.payload.id) {
            state.item = action.payload;
          }
        },
      )

      .addCase(getCostHistory.pending, (state, action) => {
        state.costHistoriesStatus = DataStatus.LOADING;

        state.costHistoriesPaging.pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state.costHistoriesPaging.pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;
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
        state.item = undefined;
        state.costHistoriesStatus = DataStatus.FAILED;
        state.costHistoriesError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getCompanyList.pending, (state, action) => {
        const prefixKey = action.meta.arg["concat"] ? "itemOptions" : "items";

        state[`${prefixKey}Status`] = DataStatus.LOADING;
        state[`${prefixKey}Filters`] = getFiltersFromQueries(action.meta.arg);

        if (action.meta.arg?.concat && action.meta.arg.pageIndex === 1) {
          state.itemOptions = [];
        }
        state[`${prefixKey}Paging`].pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state[`${prefixKey}Paging`].pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;
      })
      .addCase(
        getCompanyList.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, concat, ...paging } = action.payload;

          if (concat) {
            const newOptions = (items as Company[]).map((item) => ({
              label: item.name,
              value: item.id,
            }));
            state.itemOptions = state.itemOptions.concat(newOptions);
          } else {
            state.items = items as Company[];
          }

          const prefixKey = concat ? "itemOptions" : "items";

          state[`${prefixKey}Status`] = DataStatus.SUCCEEDED;
          state[`${prefixKey}Error`] = undefined;
          state[`${prefixKey}Paging`] = Object.assign(
            state[`${prefixKey}Paging`],
            paging,
          );
        },
      )
      .addCase(getCompanyList.rejected, (state, action) => {
        const prefixKey = action.meta.arg["concat"] ? "itemOptions" : "items";

        state[`${prefixKey}Status`] = DataStatus.FAILED;
        state[`${prefixKey}Error`] =
          action.error?.message ?? AN_ERROR_TRY_AGAIN;
      }),
});

export default companySlice.reducer;
