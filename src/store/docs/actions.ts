/* eslint-disable @typescript-eslint/no-explicit-any */
import { AN_ERROR_TRY_AGAIN, DOCS_API_URL } from './../../constant/index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import { HttpStatusCode } from "constant/enums";

  export const getDocs = createAsyncThunk(
    "docs/get",
    async ({...queries }: any) => {
      try {
        const response = await client.get(Endpoint.DOCS, queries,
           {
          baseURL: 'http://103.196.145.232:6813/api/v1',
        });

        if (response?.status === HttpStatusCode.OK) {
          return { ...response.data };
        }
        throw AN_ERROR_TRY_AGAIN;
      } catch (error) {
        throw error;
      }
    },
  );