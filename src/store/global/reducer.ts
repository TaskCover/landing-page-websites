import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "constant/enums";
import { getFiltersFromQueries } from "utils/index";
import { getPositions } from "./actions";
import { AN_ERROR_TRY_AGAIN } from "constant/index";

export interface Position {
  id: string;
  name?: string;
}

export interface GlobalState {
  positions: Position[];
  positionsStatus: DataStatus;
  positionsError?: string;
}

const initialState: GlobalState = {
  positions: [],
  positionsStatus: DataStatus.IDLE,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPositions.pending, (state) => {
        state.positionsStatus = DataStatus.LOADING;
      })
      .addCase(
        getPositions.fulfilled,
        (state, action: PayloadAction<Position[]>) => {
          state.positions = action.payload;
          state.positionsStatus = DataStatus.SUCCEEDED;
          state.positionsError = undefined;
        },
      )
      .addCase(getPositions.rejected, (state, action) => {
        state.positions = [];
        state.positionsStatus = DataStatus.FAILED;
        state.positionsError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      }),
});

export default globalSlice.reducer;
