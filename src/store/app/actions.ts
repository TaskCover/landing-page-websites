import { createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, AN_ERROR_TRY_RELOAD_PAGE } from "constant/index";
import { State } from "store/configureStore";

export type SigninData = {
  email: string;
  password: string;
};

export type SignupData = {
  email: string;
  password: string;
  phone?: string;
  fullname: string;
};

export type ResetPasswordData = {
  token: string;
  password: string;
};

export type UpdateUserInfoData = {
  phone: string;
  fullname: string;
};

export type ChangePasswordData = {
  old_password: string;
  new_password: string;
};

export const signin = createAsyncThunk(
  "app/signin",
  async (data: SigninData) => {
    try {
      const response = await client.post(Endpoint.SIGNIN, data);

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const signup = createAsyncThunk(
  "app/signup",
  async (data: SignupData) => {
    try {
      const response = await client.post(Endpoint.SIGNUP, data);

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const signupVerify = createAsyncThunk(
  "app/signupVerify",
  async (code: string, { getState }) => {
    try {
      const state = getState() as State;
      const tokenRegister = state.app.tokenRegister;
      if (!tokenRegister) {
        throw AN_ERROR_TRY_RELOAD_PAGE;
      }
      const response = await client.post(
        Endpoint.VERIFY,
        { code },
        {
          headers: {
            tokenRegister,
          },
        },
      );

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const forgot = createAsyncThunk("app/forgot", async (email: string) => {
  try {
    const response = await client.post(Endpoint.FORGOT_PASSWORD, { email });

    if (response?.status === HttpStatusCode.OK) {
      return response.data;
    }
    throw AN_ERROR_TRY_AGAIN;
  } catch (error) {
    throw error;
  }
});

export const resetPassword = createAsyncThunk(
  "app/resetPassword",
  async ({ password, token }: ResetPasswordData) => {
    try {
      const response = await client.post(
        Endpoint.FORGOT_PASSWORD,
        { password },
        {
          headers: {
            "reset-password-token": token,
          },
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  "app/updateUserInfo",
  async (data: UpdateUserInfoData) => {
    try {
      const response = await client.post(Endpoint.PROFILE, data);

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const changePassword = createAsyncThunk(
  "app/changePassword",
  async (data: ChangePasswordData) => {
    try {
      const response = await client.post(Endpoint.CHANGE_PASSWORD, data);

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
