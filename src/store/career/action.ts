import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, CAREER_API_URL } from "constant/index";
import { BaseQueries_Feedback } from "constant/types";
import StringFormat from "string-format";
import { serverQueries } from "utils/index";
import { CareergDataForm } from "./type";

export enum CareerStatus {
  PUBLISHED,
  DRAFT // NHA
}

export enum SearchStatus {
  IS_OPENING = "true",
  IS_CLOSED = "false" // NHA
}

export type CareerData = {
  id?: string
  title?: string;
  description?: string;
  location?: string;
  start_time?: string;
  end_time?: string;
  numberOfHires?: number;
  is_opening?: boolean;
  slug?: string
  detail?: string;
}

export type GetCareerListQueries = BaseQueries_Feedback & {
  searchKey?: string;
  isOpening?: string;
};

//Get list Feedback
export const getAllCareer = createAsyncThunk(
  "/getAllCareer",
  async ({ ...queries }: GetCareerListQueries) => {
    try {
      console.log(queries);
      // Sử dụng fetch để gọi API và truyền tham số searchKey vào URL
      const response = await client.get(Endpoint.CAREER, queries, { baseURL: CAREER_API_URL });

      if (response?.status === HttpStatusCode.OK) {
        // console.log(response);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const postCareer = createAsyncThunk("postCareer",
  async (career: CareergDataForm) => {
    try {
      const response = await client.post(Endpoint.CAREER, career, { baseURL: CAREER_API_URL });

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  }
);
