import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import { AN_ERROR_TRY_AGAIN, AUTH_API_URL, SALE_API_URL } from "constant/index";
import {
  refactorRawItemListResponse,
  cleanObject,
  serverQueries,
} from "utils/index";
import { HttpStatusCode } from "constant/enums";
import { BaseQueries } from "constant/types";

export interface GetSalesListQueries extends BaseQueries {
  sort?: string;
  search_key?: string;
  company?: string;
}

export interface DealData {
  name: string;
  company_id?: string;
  description?: string;
  currency: string;
  owner: string;
  members?: Record<string, string>[];
}

export const getSales = createAsyncThunk(
  "sales/getSales",
  async (queries: GetSalesListQueries) => {
    const newQueries = cleanObject({
      search_key: queries.search_key || undefined,
      company: queries.company || undefined,
      page: queries.pageIndex ? (queries.pageIndex as number) : undefined,
      size: isNaN(queries.pageSize)
        ? queries.pageSize
        : Number(queries.pageSize),
    }) as GetSalesListQueries;

    try {
      const response = await client.get(Endpoint.SALES_LIST, newQueries, {
        baseURL: SALE_API_URL,
      });
      if (response?.status === HttpStatusCode.OK) {
        const { data } = response;
        const formattedData = {
          total: data.totalDocs,
          total_page: data.totalPages,
          page: data.page - 1,
          data: data.docs,
        };

        return refactorRawItemListResponse(formattedData);
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const createDeal = createAsyncThunk(
  "sales/createDeal",
  async (data: DealData) => {
    try {
      const response = await client.post(Endpoint.CREATE_DEAL, data, {
        baseURL: SALE_API_URL,
      });
      if (response?.status === HttpStatusCode.CREATED) {
        const { data } = response;
        return data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  }
)