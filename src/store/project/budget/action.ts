import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  formatDocResponseToItemResponse,
  refactorRawItemListResponse,
  serverQueries,
} from "utils/index";
import { Endpoint } from "../../../api";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { BaseQueries } from "constant/types";
import { saleClient } from "../../../api/client";

export type TProjectBudget = any;
export type TProjectBudgets = TProjectBudget[];

export type TProjectBudgetCreateParam = {
  project_id: string;
  name: string;
  start_date: string;
  end_date: string;
  owner: string;
};

export type TProjectBudgetListQueries = BaseQueries & {
  sort?: string;
  group_by?: string;
  user_id?: string;
  start_date?: string;
  end_date?: string;
  project_id?: string;
};

export type TProjectBudgetListFilter = Omit<
  TProjectBudgetListQueries,
  "pageIndex" | "pageSize"
>;

export const getProjectBudgetList = createAsyncThunk(
  "project/getProjectBudgetList",
  async (queries: TProjectBudgetListQueries) => {
    queries = { ...queries };

    if (queries?.sort !== "updated_time=-1") {
      queries.sort = "created_time=-1";
    }

    if (queries.pageIndex) {
      queries.pageIndex = parseInt(String(queries.pageIndex)) + 1;
      // I don't know why in the serverQueries function, it's fetching pageIndex - 1.
      // I don't want to modify the logic there because the impact area is too extensive.
      // So, I added 1 here.
    }

    let groupBy: string = "";
    let userId: string = "";
    let startDate: string = "";
    let endDate: string = "";

    if (queries.group_by) {
      groupBy = queries.group_by;
      delete queries.group_by;
    }

    if (queries.user_id) {
      userId = queries.user_id;
      delete queries.user_id;
    }

    if (queries.start_date) {
      startDate = queries.start_date;
      delete queries.start_date;
    }

    if (queries.end_date) {
      endDate = queries.end_date;
      delete queries.end_date;
    }

    const newQueries = serverQueries(queries);

    if (groupBy !== "") {
      newQueries.group_by = groupBy;
    }

    if (userId !== "") {
      newQueries.user_id = userId;
    }

    if (startDate !== "") {
      newQueries.start_date = startDate;
    }

    if (endDate !== "") {
      newQueries.end_date = endDate;
    }

    const response = await saleClient.get(Endpoint.PROJECT_BUDGET, newQueries);

    if (response?.status !== HttpStatusCode.OK) {
      throw AN_ERROR_TRY_AGAIN;
    }

    const data = formatDocResponseToItemResponse(response.data);
    return refactorRawItemListResponse(data);
  },
);

export const createProjectBudget = createAsyncThunk(
  "project/createProjectBudget",
  async (param: TProjectBudgetCreateParam) => {
    const url = Endpoint.PROJECT_BUDGET_CREATE;
    const response = await saleClient.post(url, param);

    if (response?.status !== HttpStatusCode.CREATED) {
      throw AN_ERROR_TRY_AGAIN;
    }

    return response.data;
  },
);
