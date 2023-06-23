import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode, Status } from "constant/enums";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import StringFormat from "string-format";

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PAUSE = "PAUSE",
  CLOSE = "CLOSE",
}

export type GetProjectListQueries = BaseQueries & {
  saved?: boolean;
  sort?: string;
  status?: ProjectStatus;
};

export type GetMembersOfProjectQueries = BaseQueries & {
  email?: string;
  id?: string;
};

export type GetTasksOfProjectQueries = BaseQueries & {
  assigner?: string;
  start_date?: string;
  status?: Status;
  project?: string;
};

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
  avatar?: string[];
};

export type TaskListData = {
  name: string;
  project: string;
};

export type TaskData = {
  name: string;
  task?: string;
  task_list: string;
  start_date: string;
  end_date: string;
  estimated_hours: number;
  description?: string;
  owner: string;
};

export type MoveTaskData = {
  task_list_current: string;
  task_current: string;
  task_list_move: string;
};

export const getProjectList = createAsyncThunk(
  "project/getProjectList",
  async (queries: GetProjectListQueries) => {
    queries = serverQueries(
      queries,
      ["name"],
      ["saved"],
    ) as GetProjectListQueries;

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
  async ({ id, ...queries }: GetMembersOfProjectQueries & { id: string }) => {
    queries = serverQueries(queries, ["email"]) as BaseQueries;

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

export const getTasksOfProject = createAsyncThunk(
  "project/getTasksOfProject",
  async ({
    concat,
    ...queries
  }: GetTasksOfProjectQueries & { concat?: boolean }) => {
    queries = serverQueries(queries) as GetTasksOfProjectQueries;

    try {
      const response = await client.get(Endpoint.PROJECT_TASKS, queries);

      if (response?.status === HttpStatusCode.OK) {
        return { ...refactorRawItemListResponse(response.data), concat };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const createTaskList = createAsyncThunk(
  "project/createTaskList",
  async (data: TaskListData) => {
    try {
      const response = await client.post(Endpoint.PROJECT_TASKS, data);

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const createTask = createAsyncThunk(
  "project/createTask",
  async (data: TaskData) => {
    try {
      const url = data?.task ? Endpoint.SUB_TASKS : Endpoint.TASKS;
      const response = await client.post(url, data);

      if (response?.status === HttpStatusCode.CREATED) {
        return {
          task: data?.task ? response.data.subtask : response.data.lastTask,
          taskId: data?.task,
          taskListId: data.task_list,
        };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const moveTask = createAsyncThunk(
  "project/moveTask",
  async (data: MoveTaskData) => {
    try {
      const response = await client.post(Endpoint.TASK_MOVE, data);

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
