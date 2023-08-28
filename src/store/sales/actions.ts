import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import { AN_ERROR_TRY_AGAIN, AUTH_API_URL, SALE_API_URL } from "constant/index";
import { refactorRawItemListResponse,cleanObject, serverQueries } from "utils/index";
import { HttpStatusCode } from "constant/enums";
import { BaseQueries } from "constant/types";

export interface GetSalesListQueries extends BaseQueries {
  sort?: string;
  company?: string;
}

export const getSales = createAsyncThunk(
  "company/getEmployees",
  async (queries: GetSalesListQueries) => {
    
    const newQueries = cleanObject({
    page: queries.pageIndex ? (queries.pageIndex as number) : undefined,
    size: isNaN(queries.pageSize) ? queries.pageSize : Number(queries.pageSize),
  });
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

        return await refactorRawItemListResponse(formattedData);
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
