import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, TIME_SHEET_API_URL } from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse } from "utils/index";
//serverQueries
export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PAUSE = "PAUSE",
  CLOSE = "CLOSE",
}

export enum DependencyStatus {
  BLOCKING = "BLOCK",
  WAITING_ON = "WAIT",
  LINKED_TO = "LINK",
}

export type GetMyTimeSheetQueries = {
  start_date: string;
  end_date: string;
};

export const getMyTimeSheet = createAsyncThunk(
  "timeTracking/getMyTimeSheet",
  async (queries: GetMyTimeSheetQueries) => {
    const newQueries = { ...queries };

    try {
      const response = await client.get(Endpoint.MY_TIME_SHEET, newQueries, {
        baseURL: TIME_SHEET_API_URL,
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

// export const getWorkLog = createAsyncThunk(
//   "timeTracking/getWorkLog",
//   async (id: string) => {
//     try {
//       const response = await client.get(
//         StringFormat(Endpoint.WORK_LOG, { id }),
//       );

//       if (response?.status === HttpStatusCode.OK) {
//         return response.data;
//       }
//       throw AN_ERROR_TRY_AGAIN;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export const getCompanyTimeSheet = createAsyncThunk(
//   "timeTracking/getCompanyTimeSheet",
//   async (id: string) => {
//     try {
//       const response = await client.get(
//         StringFormat(Endpoint.COMPANY_TIME_SHEET, { id }),
//       );

//       if (response?.status === HttpStatusCode.OK) {
//         return response.data;
//       }
//       throw AN_ERROR_TRY_AGAIN;
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export const createTimeSheet = createAsyncThunk(
//   "project/createProject",
//   async (data: ProjectData) => {
//     try {
//       const response = await client.post(Endpoint.TIME_SHEET, data);

//       if (response?.status === HttpStatusCode.CREATED) {
//         return response.data;
//       }
//       throw AN_ERROR_TRY_AGAIN;
//     } catch (error) {
//       throw error;
//     }
//   },
// );
