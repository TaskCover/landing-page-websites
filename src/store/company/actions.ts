import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, AUTH_API_URL } from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import StringFormat from "string-format";

export type GetEmployeeListQueries = BaseQueries & {
  search?: string;
  position?: string;
  status?: "true" | "false";
};

export type EmployeeData = {
  email: string;
  position: string;
};

export const getEmployees = createAsyncThunk(
  "company/getEmployees",
  async ({
    concat,
    ...queries
  }: GetEmployeeListQueries & { concat?: boolean }) => {
    queries = serverQueries(queries) as GetEmployeeListQueries;

    try {
      const response = await client.get(Endpoint.USERS, queries, {
        baseURL: AUTH_API_URL,
      });

      if (response?.status === HttpStatusCode.OK) {
        return { ...refactorRawItemListResponse(response.data), concat };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const createEmployee = createAsyncThunk(
  "company/createEmployee",
  async (data: EmployeeData) => {
    try {
      const response = await client.post(Endpoint.USERS, data, {
        baseURL: AUTH_API_URL,
      });

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "company/updateEmployee",
  async ({ id, position }: { id: string; position: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.USER_ITEM, { id }),
        { position },
        {
          baseURL: AUTH_API_URL,
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
