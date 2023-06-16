import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, COMPANY_API_URL } from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import StringFormat from "string-format";

export type GetProjectListQueries = BaseQueries & {
  saved?: boolean;
  latest?: boolean;
  status?: string;
};

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PAUSE = "PAUSE",
  CLOSE = "CLOSE",
}

export type ProjectData = {
  name: string;
  owner: string;
  start_date: string;
  end_date: string;
  expected_cost?: number;
  working_hours?: number;
  description: string;
  members?: {
    id: string;
    position: string;
  }[];
  type_project: string;
  status?: ProjectStatus;
  saved?: boolean;
};

export const getProjectList = createAsyncThunk(
  "project/getProjectList",
  async (queries: GetProjectListQueries) => {
    queries = serverQueries(queries) as GetProjectListQueries;

    try {
      const response = await client.get(Endpoint.PROJECTS, queries);

      if (response?.status === HttpStatusCode.OK) {
        return refactorRawItemListResponse(response.data);
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getProject = createAsyncThunk(
  "project/getProject",
  async (id: string) => {
    try {
      const response = await client.get(
        StringFormat(Endpoint.PROJECT_ITEM, { id }),
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

export const createProject = createAsyncThunk(
  "project/createProject",
  async (data: ProjectData) => {
    try {
      const response = await client.post(Endpoint.PROJECTS, data);

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, ...data }: Partial<ProjectData> & { id: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.PROJECT_ITEM, { id }),
        data,
      );

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const getMembersOfProject = createAsyncThunk(
  "project/getMembersOfProject",
  async ({ id, ...queries }: BaseQueries & { id: string }) => {
    queries = serverQueries(queries) as BaseQueries;

    try {
      const response = await client.get(
        StringFormat(Endpoint.PROJECT_MEMBERS, { id }),
        queries,
      );

      if (response?.status === HttpStatusCode.OK) {
        return refactorRawItemListResponse(response.data);
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
