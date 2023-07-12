import { createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { HttpStatusCode } from "constant/enums";
import { COMPANY_API_URL, AN_ERROR_TRY_AGAIN } from "constant/index";
import { BaseQueries } from "constant/types";
import { serverQueries, refactorRawItemListResponse } from "utils/index";

export const getPositions = async (queries: BaseQueries) => {
  queries = serverQueries(
    { ...queries, is_active: true, sort: "created_time=-1" },
    undefined,
    ["is_active"],
  ) as BaseQueries;

  try {
    const response = await client.get(Endpoint.POSITIONS_ALL, queries, {
      baseURL: COMPANY_API_URL,
    });

    if (response?.status === HttpStatusCode.OK) {
      return refactorRawItemListResponse(response.data);
    }
    throw AN_ERROR_TRY_AGAIN;
  } catch (error) {
    throw error;
  }
};

export const getProjectTypes = async (queries: BaseQueries) => {
  queries = serverQueries(
    { ...queries, is_active: true, sort: "created_time=-1" },
    undefined,
    ["is_active"],
  ) as BaseQueries;

  try {
    const response = await client.get(Endpoint.PROJECT_TYPES_ALL, queries, {
      baseURL: COMPANY_API_URL,
    });

    if (response?.status === HttpStatusCode.OK) {
      return refactorRawItemListResponse(response.data);
    }
    throw AN_ERROR_TRY_AGAIN;
  } catch (error) {
    throw error;
  }
};

export const getPositionOptions = createAsyncThunk(
  "global/getPositionOptions",
  getPositions,
);

export const getProjectTypeOptions = createAsyncThunk(
  "global/getProjectTypeOptions",
  getProjectTypes,
);
