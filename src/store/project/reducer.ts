import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProject,
  getProject,
  getProjectList,
  GetProjectListQueries,
  getProjectTypeList,
  ProjectStatus,
  updateProject,
} from "./actions";
import { ItemListResponse, Option, Paging, User } from "constant/types";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { getFiltersFromQueries } from "utils/index";
import { Position } from "store/global/reducer";

export interface Member {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  company: string;
  position: Position;
  roles: string[];
  position_project: {
    name: string;
    id: string;
  };
  date_in: string;
}

export interface Project {
  id: string;
  name: string;
  owner: User & { position: Position };
  members: Member[];
  is_active: boolean;
  saved: boolean;
  company: string;
  status: ProjectStatus;
  updated_by: User;
  updated_time: string;
  type_project: {
    id: string;
    name: string;
  };
  description: string;
  expected_cost: number;
  working_hours: number;
  start_date: string;
  end_date: string;
}

export interface ProjectType {
  id: string;
  name: string;
}

export interface ProjectState {
  items: Project[];
  status: DataStatus;
  paging: Paging;
  error?: string;
  filters: Omit<GetProjectListQueries, "pageIndex" | "pageSize">;

  item?: Project;
  itemStatus: DataStatus;
  itemError?: string;

  projectTypes: ProjectType[];
  projectTypesStatus: DataStatus;
  projectTypesError?: string;
}

const initialState: ProjectState = {
  items: [],
  status: DataStatus.IDLE,
  paging: DEFAULT_PAGING,
  filters: {},

  itemStatus: DataStatus.IDLE,

  projectTypes: [],
  projectTypesStatus: DataStatus.IDLE,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getProjectList.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.filters = getFiltersFromQueries(action.meta.arg);
        state.paging.pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state.paging.pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;
      })
      .addCase(
        getProjectList.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;
          state.items = items as Project[];
          state.status = DataStatus.SUCCEEDED;
          state.error = undefined;
          state.paging = Object.assign(state.paging, paging);
        },
      )
      .addCase(getProjectList.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error?.message ?? AN_ERROR_TRY_AGAIN;
        state.paging.totalItems = undefined;
        state.paging.totalPages = undefined;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.items.unshift(action.payload);
          if (state.paging.totalItems !== undefined) {
            state.paging.totalItems += 1;
          }
        },
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const indexUpdated = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (indexUpdated !== -1) {
            state.items[indexUpdated] = Object.assign(
              state.items[indexUpdated],
              action.payload,
            );
          }

          if (state.item?.id === action.payload.id) {
            state.item = action.payload;
          }
        },
      )
      .addCase(getProjectTypeList.pending, (state) => {
        state.projectTypesStatus = DataStatus.LOADING;
      })
      .addCase(
        getProjectTypeList.fulfilled,
        (state, action: PayloadAction<ProjectType[]>) => {
          state.projectTypes = action.payload;
          state.projectTypesStatus = DataStatus.SUCCEEDED;
          state.projectTypesError = undefined;
        },
      )
      .addCase(getProjectTypeList.rejected, (state, action) => {
        state.projectTypes = [];
        state.projectTypesStatus = DataStatus.FAILED;
        state.projectTypesError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getProject.pending, (state) => {
        state.itemStatus = DataStatus.LOADING;
      })
      .addCase(
        getProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.item = action.payload;
          state.itemStatus = DataStatus.SUCCEEDED;
          state.itemError = undefined;
        },
      )
      .addCase(getProject.rejected, (state, action) => {
        state.item = undefined;
        state.itemStatus = DataStatus.FAILED;
        state.itemError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      }),
});

export default projectSlice.reducer;
