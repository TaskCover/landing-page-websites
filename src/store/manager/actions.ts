import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import {
  AN_ERROR_TRY_AGAIN,
  AUTH_API_URL,
  COMPANY_API_URL,
} from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import StringFormat from "string-format";
import { PaymentStatus } from "components/sn-employees/helpers";

export enum CompanyStatus {
  REJECT,
  APPROVE,
}

export type CompanyData = {
  name: string;
  address?: string;
  phone?: string;
  tax_code?: string;
};

export type GetEmployeeListQueries = BaseQueries & {
  email?: string;
  is_pay_user?: boolean;
  company?: string;
  date?: string;
};

export type GetCompanyListQueries = BaseQueries & {
  email?: string;
  is_pay_company?: boolean;
  date?: string;
};

export type GetStatementHistoryQueries = BaseQueries & {
  start?: string;
  end?: string;
};

export const getEmployeesOfCompany = createAsyncThunk(
  "manager/getEmployeesOfCompany",
  async ({ ...queries }: GetEmployeeListQueries) => {
    queries = serverQueries(
      { ...queries, sort: "created_time=-1" },
      ["email"],
      ["is_pay_user"],
    ) as GetEmployeeListQueries;

    try {
      const response = await client.get(Endpoint.USERS, queries, {
        baseURL: AUTH_API_URL,
      });

      if (response?.status === HttpStatusCode.OK) {
        return refactorRawItemListResponse(response.data);
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getCompanyList = createAsyncThunk(
  "manager/getCompanyList",
  async ({
    concat,
    ...queries
  }: GetCompanyListQueries & { concat?: boolean }) => {
    queries = serverQueries(
      { ...queries, sort: "created_time=-1" },
      ["email"],
      ["is_pay_company"],
    ) as GetCompanyListQueries;

    try {
      const response = await client.get(Endpoint.COMPANIES, queries, {
        baseURL: COMPANY_API_URL,
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

export const getCompany = createAsyncThunk(
  "manager/getCompany",
  async (id: string) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.COMPANY_ITEM, { id }),
        undefined,
        {
          baseURL: COMPANY_API_URL,
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

export const updateCompany = createAsyncThunk(
  "manager/updateCompany",
  async ({ id, ...data }: CompanyData & { id: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.COMPANY_ITEM, { id }),
        data,
        {
          baseURL: COMPANY_API_URL,
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

export const getStatementHistory = createAsyncThunk(
  "manager/getStatementHistory",
  async (queries: GetStatementHistoryQueries) => {
    queries = serverQueries(queries) as GetStatementHistoryQueries;

    try {
      const response = await client.get(Endpoint.COST_HISTORY, queries, {
        baseURL: COMPANY_API_URL,
      });

      if (response?.status === HttpStatusCode.OK) {
        return refactorRawItemListResponse(response.data);
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const companyApproveOrReject = createAsyncThunk(
  "manager/companyApproveOrReject",
  async ({ type, ids }: { type: CompanyStatus; ids: string[] }) => {
    const url =
      type === CompanyStatus.APPROVE
        ? Endpoint.COMPANIES_APPROVE
        : Endpoint.COMPANIES_REJECT;

    try {
      const response = await client.put(
        url,
        { ids },
        {
          baseURL: COMPANY_API_URL,
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        return ids;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const employeeApproveOrReject = createAsyncThunk(
  "manager/employeeApproveOrReject",
  async ({ type, ids }: { type: PaymentStatus; ids: string[] }) => {
    const url =
      type === PaymentStatus.PAID
        ? Endpoint.USERS_APPROVE
        : Endpoint.USERS_REJECT;

    try {
      const response = await client.put(
        url,
        { ids },
        {
          baseURL: AUTH_API_URL,
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        return ids;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);