import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "utils";
import { signin } from "./actions";
import { AlertColor } from "@mui/material";

export interface Snackbar {
  message: string;
  severity?: AlertColor;
  expiredIn?: number;
}

export type SnackbarItem = Snackbar & {
  id: string;
};

export interface AppState {
  appReady: boolean;
  snackbarList: SnackbarItem[];
  token?: string;
}

const initialState: AppState = {
  appReady: false,
  snackbarList: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<Snackbar>) => {
      state.snackbarList.push({
        id: uuid(),
        ...action.payload,
      });
    },
    removeSnackbar: (state, action: PayloadAction<string>) => {
      const indexDeleted = state.snackbarList.findIndex(
        (item) => item.id === action.payload,
      );
      if (indexDeleted !== -1) {
        state.snackbarList.splice(indexDeleted, 1);
      }
    },
    toggleAppReady: (state, action: PayloadAction<boolean | undefined>) => {
      state.appReady = action?.payload ?? !state.appReady;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(signin.fulfilled, (state, action) => {
      //
    }),
});

export const { addSnackbar, removeSnackbar, toggleAppReady } = appSlice.actions;

export default appSlice.reducer;
