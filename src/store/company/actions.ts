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

export enum CompanyStatus {
  APPROVE = 1,
  REJECT,
}

export type GetEmployeeListQueries = BaseQueries & {
  search?: string;
  position?: string;
  status?: "true" | "false";
  company?: string;
  date?: string;
};

export type GetCompanyListQueries = BaseQueries & {
  search?: string;
  status?: CompanyStatus;
  date?: "true" | "false";
};

export type EmployeeData = {
  email: string;
  position: string;
};

export type PositionData = {
  name: string;
};

export type ProjectTypeData = {
  name: string;
};

export type CompanyData = {
  name: string;
  address?: string;
  phone?: string;
  tax_code?: string;
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

export const getPositions = createAsyncThunk(
  "company/getPositions",
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

export const createPosition = createAsyncThunk(
  "company/createPosition",
  async (data: PositionData) => {
    try {
      const response = await client.post(Endpoint.POSITIONS, data, {
        baseURL: COMPANY_API_URL,
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

export const updatePosition = createAsyncThunk(
  "company/updatePosition",
  async ({ id, name }: { id: string; name: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.POSITION_ITEM, { id }),
        { name },
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

export const deletePosition = createAsyncThunk(
  "company/deletePosition",
  async (id: string) => {
    try {
      const response = await client.delete(
        StringFormat(Endpoint.POSITION_ITEM, { id }),
        {
          baseURL: COMPANY_API_URL,
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        return id;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getProjectTypeList = createAsyncThunk(
  "project/getProjectTypeList",
  async () => {
    try {
      const response = await client.get(Endpoint.PROJECT_TYPES, undefined, {
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

export const createProjectType = createAsyncThunk(
  "company/createProjectType",
  async (data: ProjectTypeData) => {
    try {
      const response = await client.post(Endpoint.PROJECT_TYPES, data, {
        baseURL: COMPANY_API_URL,
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

export const updateProjectType = createAsyncThunk(
  "company/updateProjectType",
  async ({ id, name }: { id: string; name: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.PROJECT_TYPE_ITEM, { id }),
        { name },
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

export const deleteProjectType = createAsyncThunk(
  "company/deleteProjectType",
  async (id: string) => {
    try {
      const response = await client.delete(
        StringFormat(Endpoint.PROJECT_TYPE_ITEM, { id }),
        {
          baseURL: COMPANY_API_URL,
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        return id;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getCompanyList = createAsyncThunk(
  "company/getCompanyList",
  async ({
    concat,
    ...queries
  }: GetCompanyListQueries & { concat?: boolean }) => {
    queries = serverQueries(queries) as GetCompanyListQueries;

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
  "company/getCompany",
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
  "company/updateCompany",
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

export const getCostHistory = createAsyncThunk(
  "company/getCostHistory",
  async (queries: BaseQueries) => {
    queries = serverQueries(queries) as BaseQueries;

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
