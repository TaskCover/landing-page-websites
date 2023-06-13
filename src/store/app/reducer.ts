import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "utils";
import { resetPassword, signin, signup, signupVerify } from "./actions";
import { clientStorage } from "utils/storage";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  USER_INFO_STORAGE_KEY,
} from "constant/index";

export interface Snackbar {
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  expiredIn?: number;
}

export type SnackbarItem = Snackbar & {
  id: string;
};

export interface UserInfo {
  company: string;
  created_time: string;
  department: string;
  email: string;
  fullname: string;
  id: string;
  is_active: boolean;
  phone: string;
  position: {
    id: string;
    name: string;
  };
  updated_time: string;
  date_end_using: string;
  date_start_using: string;
  is_pay_user: boolean;
  roles: string[];
}

export enum SignupStep {
  SIGNUP = 1,
  VERIFY,
  JOIN_WORKSPACE,
}

export interface AppState {
  appReady: boolean;
  snackbarList: SnackbarItem[];
  token?: string;
  user?: UserInfo;

  signupStep: SignupStep;
  tokenRegister?: string;
}

const initialState: AppState = {
  appReady: false,
  snackbarList: [],

  signupStep: SignupStep.SIGNUP,
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
    updateAuth: (
      state,
      action: PayloadAction<{
        accessToken?: string | null;
        user?: UserInfo | null;
      }>,
    ) => {
      const { accessToken, user } = action.payload;
      state.token = accessToken || undefined;
      state.user = user || undefined;
    },
    clearAuth: (state) => {
      state.token = undefined;
      state.user = undefined;

      clientStorage.remove(ACCESS_TOKEN_STORAGE_KEY);
      clientStorage.remove(REFRESH_TOKEN_STORAGE_KEY);
      clientStorage.remove(USER_INFO_STORAGE_KEY);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        signin.fulfilled,
        (
          state,
          action: PayloadAction<
            UserInfo & { accessToken: string; refreshToken: string }
          >,
        ) => {
          const { accessToken, refreshToken, ...userInfo } = action.payload;

          clientStorage.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
          clientStorage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
          clientStorage.set(USER_INFO_STORAGE_KEY, userInfo);

          state.token = accessToken;
          state.user = userInfo;
        },
      )
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ registerToken: string }>) => {
          state.signupStep = SignupStep.VERIFY;
          state.tokenRegister = action.payload.registerToken;
        },
      )
      .addCase(signupVerify.fulfilled, (state) => {
        state.signupStep = SignupStep.SIGNUP;
        state.tokenRegister = undefined;
      }),
});

export const {
  addSnackbar,
  removeSnackbar,
  toggleAppReady,
  clearAuth,
  updateAuth,
} = appSlice.actions;

export default appSlice.reducer;
