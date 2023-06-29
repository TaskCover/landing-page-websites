import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "constant/enums";
import { getPositionOptions, getProjectTypeOptions } from "./actions";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { ItemListResponse, Option, Paging } from "constant/types";
import { Position, ProjectType } from "store/company/reducer";
import { removeDuplicateItem } from "utils/index";

export interface GlobalState {
  positionOptions: Option[];
  positionOptionsStatus: DataStatus;
  positionOptionsPaging: Paging;
  positionOptionsError?: string;

  projectTypeOptions: Option[];
  projectTypeOptionsStatus: DataStatus;
  projectTypeOptionsPaging: Paging;
  projectTypeOptionsError?: string;
}

const initialState: GlobalState = {
  positionOptions: [],
  positionOptionsStatus: DataStatus.IDLE,
  positionOptionsPaging: DEFAULT_PAGING,

  projectTypeOptions: [],
  projectTypeOptionsStatus: DataStatus.IDLE,
  projectTypeOptionsPaging: DEFAULT_PAGING,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPositionOptions.pending, (state, action) => {
        state.positionOptionsStatus = DataStatus.LOADING;
        state.positionOptionsPaging.pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state.positionOptionsPaging.pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;

        if (action.meta.arg.pageIndex === 1) {
          state.positionOptions = [];
        }
      })
      .addCase(
        getPositionOptions.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;

          const newOptions = (items as Position[]).map(
            ({ id: value, name: label }) => ({ value, label }),
          );

          state.positionOptions = removeDuplicateItem(
            state.positionOptions.concat(newOptions),
          );
          state.positionOptionsPaging = Object.assign(
            state.positionOptionsPaging,
            paging,
          );
          state.positionOptionsStatus = DataStatus.SUCCEEDED;
          state.positionOptionsError = undefined;
        },
      )
      .addCase(getPositionOptions.rejected, (state, action) => {
        state.positionOptionsStatus = DataStatus.FAILED;
        state.positionOptionsError =
          action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })

      .addCase(getProjectTypeOptions.pending, (state, action) => {
        state.projectTypeOptionsStatus = DataStatus.LOADING;
        state.projectTypeOptionsPaging.pageIndex =
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex;
        state.projectTypeOptionsPaging.pageSize =
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize;

        if (action.meta.arg.pageIndex === 1) {
          state.projectTypeOptions = [];
        }
      })
      .addCase(
        getProjectTypeOptions.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;

          const newOptions = (items as ProjectType[]).map(
            ({ id: value, name: label }) => ({ value, label }),
          );

          state.projectTypeOptions = removeDuplicateItem(
            state.projectTypeOptions.concat(newOptions),
          );
          state.projectTypeOptionsPaging = Object.assign(
            state.projectTypeOptionsPaging,
            paging,
          );
          state.projectTypeOptionsStatus = DataStatus.SUCCEEDED;
          state.projectTypeOptionsError = undefined;
        },
      )
      .addCase(getProjectTypeOptions.rejected, (state, action) => {
        state.projectTypeOptionsStatus = DataStatus.FAILED;
        state.projectTypeOptionsError =
          action.error?.message ?? AN_ERROR_TRY_AGAIN;
      }),
});

export default globalSlice.reducer;
