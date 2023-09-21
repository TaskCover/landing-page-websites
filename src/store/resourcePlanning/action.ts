import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import { RESOURCE_API_URL } from "constant/index";
import { Dispatch } from "react";

export interface IBookingAllFitler {
  search_key: string;
  working_sort: WorkingStatus;
  start_date: string;
  end_date: string;
  position: string;
}
export enum resourceActionType {
  SET_BOOKING_ALL_FILTER = "SET_BOOKING_ALL_FILTER",
  SET_DATE_PICKER = "SET_DATE_PICKER",
  SET_CURRENT_DATE = "SET_CURRENT_DATE",
}

export enum WorkingStatus {
  ALL = "",
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}

export const getBookingAll = createAsyncThunk(
  "resource/getBookingAll",
  async (params: IBookingAllFitler) => {
    try {
      const response = await client.get(
        Endpoint.RESOURCE_PLANNING_LIST,
        params,
        {
          baseURL: RESOURCE_API_URL,
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
