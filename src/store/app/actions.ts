import { createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN } from "constant/index";

export type SigninData = {
  email: string;
  password: string;
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
