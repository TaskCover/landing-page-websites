import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, COMPANY_API_URL } from "constant/index";

export const getPositions = createAsyncThunk(
  "global/getPositions",
  async () => {
    try {
      const response = await client.get(Endpoint.POSITIONS, undefined, {
        baseURL: COMPANY_API_URL,
      });

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
