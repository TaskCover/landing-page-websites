import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import StringFormat from "string-format";

export type GetProjectListQueries = BaseQueries & {
  saved?: boolean;
  latest?: boolean;
  status?: string;
};

export type ProjectData = {
  name: string;
  owner: string;
  start_date: string;
  end_date: string;
  expected_cost: number;
  working_hours: number;
  description: string;
  members: {
    id: string;
    position: string;
  }[];
  type_project: string;
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
  async ({ id, ...data }: ProjectData & { id: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.PROJECT_ITEM, { id }),
        data,
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
