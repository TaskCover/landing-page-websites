import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "utils";
import { clientStorage, sessionStorage } from "utils/storage";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "constant/index";
import { User } from "constant/types";

export interface Snackbar {
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  expiredIn?: number;
}

export type SnackbarItem = Snackbar & {
  id: string;
};

export interface UserInfo extends User {
  created_time: string;
  department: string;
  is_active: boolean;
  approve?: boolean;
  updated_time: string;
  date_end_using: string;
  date_start_using: string;
  is_pay_user: boolean;
  id_rocket?: string;
}

export type HeaderConfig = {
  prevPath?: string;
  title?: string;
  searchPlaceholder?: string;
  endpoint?: string;
  key?: string;
};

export enum SignupStep {
  SIGNUP = 1,
  VERIFY,
}

export interface AppState {
  appReady: boolean;
  snackbarList: SnackbarItem[];
  token?: string;
  user?: UserInfo;

  signupStep: SignupStep;
  tokenRegister?: string;

  headerConfig: HeaderConfig;

  isExpandedSidebar: boolean;
}

const initialState: AppState = {
  appReady: false,
  snackbarList: [],

  signupStep: SignupStep.SIGNUP,

  headerConfig: {},

  isExpandedSidebar: true,
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
    updateHeaderConfig: (state, action: PayloadAction<HeaderConfig>) => {
      state.headerConfig = Object.assign(state.headerConfig, action.payload);
    },
    toggleExpandSidebar: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.isExpandedSidebar = action?.payload ?? !state.isExpandedSidebar;
    },
    reset: () => ({ ...initialState, appReady: true }),
  },
});

export const {
  addSnackbar,
  removeSnackbar,
  toggleAppReady,
  updateHeaderConfig,
  toggleExpandSidebar,
  reset,
} = appSlice.actions;

export default appSlice.reducer;
