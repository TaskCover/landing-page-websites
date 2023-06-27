import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode, Status } from "constant/enums";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { BaseQueries } from "constant/types";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import StringFormat from "string-format";
import { Task, TaskList } from "./reducer";

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
  owner?: string;
  date?: string;
  status?: Status;
  project?: string;
  name?: string;
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
  task_list: string;
  task?: string;
  sub_task?: string;
  start_date?: string;
  end_date?: string;
  estimated_hours?: number;
  description?: string;
  owner?: string;
  status?: Status;
};

export type MoveTaskData = {
  task_list_current: string;
  task_current: string[];
  task_list_move: string;
};

export type CommentTaskData = {
  task: string;
  task_list: string;
  content: string;
  attachments?: string[];
};

export type DeleteTaskListsData = {
  project: string;
  tasks_list: string[];
};

export type DeleteTasksData = {
  task_list: string;
  tasks: string[];
};

export type DeleteSubTasksData = {
  task_list: string;
  task: string;
  sub_tasks: string[];
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
    prefixKey,
    project,
    ...queries
  }: GetTasksOfProjectQueries & { prefixKey: "taskOptions" | "tasks" }) => {
    queries = serverQueries(
      queries,
      ["name"],
      undefined,
    ) as GetTasksOfProjectQueries;
    try {
      const response = await client.get(
        StringFormat(Endpoint.PROJECT_TASK_ITEM, { id: project }),
        queries,
      );

      if (response?.status === HttpStatusCode.OK) {
        return { ...refactorRawItemListResponse(response.data), prefixKey };
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

export const updateTaskList = createAsyncThunk(
  "project/updateTaskList",
  async ({ id, name }: { id: string; name: string }) => {
    try {
      const response = await client.put(
        StringFormat(Endpoint.PROJECT_TASK_ITEM, { id }),
        { name },
      );

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data.task;
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
          task: response.data.lastTask as Task,
          subTasks: response.data.subtasks as Task[],
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

export const updateTask = createAsyncThunk(
  "project/updateTask",
  async (data: Partial<TaskData>) => {
    try {
      const url = data?.sub_task ? Endpoint.SUB_TASK : Endpoint.TASK_ITEM;

      const response = await client.put(url, data);

      if (response?.status === HttpStatusCode.CREATED) {
        return {
          task: response.data?.task as Task,
          taskList: response.data?.task_update as TaskList,
          taskId: data.task,
          taskListId: data.task_list,
          subTaskId: data.sub_task,
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
        return true;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const commentTask = createAsyncThunk(
  "project/commentTask",
  async (data: CommentTaskData) => {
    try {
      const response = await client.post(Endpoint.TASK_COMMENT, data);

      if (response?.status === HttpStatusCode.CREATED) {
        return {
          comment: {
            ...response.data.last_comment,
            attachments_down: response.data.attachments_down,
          },
          taskId: data.task,
          taskListId: data.task_list,
        };
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteTaskLists = createAsyncThunk(
  "project/deleteTaskLists",
  async (data: DeleteTaskListsData) => {
    try {
      const response = await client.put(Endpoint.TASK_LIST_INACTIVE, data);

      if (response?.status === HttpStatusCode.OK) {
        return true;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteTasks = createAsyncThunk(
  "project/deleteTasks",
  async (data: DeleteTasksData) => {
    try {
      const response = await client.put(Endpoint.TASKS_INACTIVE, data);

      if (response?.status === HttpStatusCode.OK) {
        return true;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteSubTasks = createAsyncThunk(
  "project/deleteSubTasks",
  async (data: DeleteSubTasksData) => {
    try {
      const response = await client.put(Endpoint.SUB_TASKS_INACTIVE, data);

      if (response?.status === HttpStatusCode.OK) {
        return true;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);
