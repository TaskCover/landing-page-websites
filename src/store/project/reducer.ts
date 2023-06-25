import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  commentTask,
  createProject,
  createTask,
  createTaskList,
  getMembersOfProject,
  GetMembersOfProjectQueries,
  getProject,
  getProjectList,
  GetProjectListQueries,
  getTasksOfProject,
  GetTasksOfProjectQueries,
  ProjectStatus,
  updateProject,
  updateTask,
  updateTaskList,
} from "./actions";
import {
  Attachment,
  BaseQueries,
  ItemListResponse,
  Option,
  Paging,
  User,
} from "constant/types";
import { DataStatus, Permission, Status } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING } from "constant/index";
import { getFiltersFromQueries } from "utils/index";
import { Position } from "store/company/reducer";

export interface Member {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  company: string;
  position: Position;
  roles: Permission[];
  position_project: {
    name: string;
    id: string;
  };
  date_in: string;
  avatar?: {
    link: string;
  };
}

export interface Project {
  id: string;
  name: string;
  owner: User & { position: Position };
  members: Member[];
  is_active: boolean;
  saved: boolean;
  company: string;
  status: ProjectStatus;
  updated_by: User;
  updated_time: string;
  type_project: {
    id: string;
    name: string;
  };
  description: string;
  expected_cost: number;
  working_hours: number;
  start_date: string;
  end_date: string;
  avatar?: {
    link?: string;
  };
}

export interface Task {
  id: string;
  name: string;

  owner?: User;
  estimated_hours?: number;
  working_hours?: number;
  status: Status;
  description?: string;
  sub_tasks?: Task[];
  start_date?: string;
  end_date?: string;
  created_time: string;
  comments?: Comment[];
}

export type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
};

export interface Comment {
  id: string;
  attachments: string[];
  content: string;
  created_time: string;
  creator: User;
  activities: Activity[];
  attachments_down: Attachment[];
}
export interface Activity {
  id: string;
  time: string;
  user: User;
  action: string;
  task: Task;
  project: Project;
}

export type TaskDetail = Task & { taskListId: string };

export interface ProjectState {
  items: Project[];
  status: DataStatus;
  paging: Paging;
  error?: string;
  filters: Omit<GetProjectListQueries, "pageIndex" | "pageSize">;

  item?: Project;
  itemStatus: DataStatus;
  itemError?: string;

  members: Member[];
  membersStatus: DataStatus;
  membersPaging: Paging;
  membersError?: string;
  membersFilters: Omit<GetMembersOfProjectQueries, "pageIndex" | "pageSize">;

  tasks: TaskList[];
  tasksStatus: DataStatus;
  tasksPaging: Paging;
  tasksError?: string;
  tasksFilters: Omit<GetTasksOfProjectQueries, "pageIndex" | "pageSize">;

  taskOptions: TaskList[];
  taskOptionsStatus: DataStatus;
  taskOptionsPaging: Paging;
  taskOptionsError?: string;
  taskOptionsFilters: Omit<GetTasksOfProjectQueries, "pageIndex" | "pageSize">;

  task?: TaskDetail;
}

const initialState: ProjectState = {
  items: [],
  status: DataStatus.IDLE,
  paging: DEFAULT_PAGING,
  filters: {},

  itemStatus: DataStatus.IDLE,

  members: [],
  membersStatus: DataStatus.IDLE,
  membersPaging: DEFAULT_PAGING,
  membersFilters: {},

  tasks: [],
  tasksStatus: DataStatus.IDLE,
  tasksPaging: DEFAULT_PAGING,
  tasksFilters: {},

  taskOptions: [],
  taskOptionsStatus: DataStatus.IDLE,
  taskOptionsPaging: DEFAULT_PAGING,
  taskOptionsFilters: {},
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    removeMember: (state, action: PayloadAction<string>) => {
      const indexSelected = state.members.findIndex(
        (member) => member.id === action.payload,
      );

      if (indexSelected !== -1) {
        state.members.splice(indexSelected, 1);
        if (state.membersPaging.totalItems !== undefined) {
          state.membersPaging.totalItems -= 1;
        }
      }
    },
    updateTaskDetail: (
      state,
      action: PayloadAction<TaskDetail | undefined>,
    ) => {
      state.task = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProjectList.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.filters = getFiltersFromQueries(action.meta.arg);
        state.paging.pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state.paging.pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getProjectList.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;
          state.items = items as Project[];
          state.status = DataStatus.SUCCEEDED;
          state.error = undefined;
          state.paging = Object.assign(state.paging, paging);
        },
      )
      .addCase(getProjectList.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.items.unshift(action.payload);
          if (state.items.length > state.paging.pageSize) {
            state.items.pop();
            if (state.paging.totalPages !== undefined) {
              state.paging.totalPages += 1;
            }
          }
          if (state.paging.totalItems !== undefined) {
            state.paging.totalItems += 1;
          }
        },
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const indexUpdated = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (indexUpdated !== -1) {
            state.items[indexUpdated] = Object.assign(
              state.items[indexUpdated],
              action.payload,
            );
          }

          if (state.item?.id === action.payload.id) {
            state.item = action.payload;
          }
        },
      )
      .addCase(getProject.pending, (state) => {
        state.itemStatus = DataStatus.LOADING;
      })
      .addCase(
        getProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.item = action.payload;
          state.itemStatus = DataStatus.SUCCEEDED;
          state.itemError = undefined;
        },
      )
      .addCase(getProject.rejected, (state, action) => {
        state.item = undefined;
        state.itemStatus = DataStatus.FAILED;
        state.itemError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(getMembersOfProject.pending, (state, action) => {
        state.membersStatus = DataStatus.LOADING;
        state.membersFilters = getFiltersFromQueries(action.meta.arg);
        state.membersPaging.pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state.membersPaging.pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getMembersOfProject.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, ...paging } = action.payload;
          state.members = items as Member[];
          state.membersStatus = DataStatus.SUCCEEDED;
          state.membersError = undefined;
          state.membersPaging = Object.assign(state.membersPaging, paging);
        },
      )
      .addCase(getMembersOfProject.rejected, (state, action) => {
        state.members = [];
        state.membersStatus = DataStatus.FAILED;
        state.membersError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      // TASKS
      .addCase(getTasksOfProject.pending, (state, action) => {
        const prefixKey = action.meta.arg["concat"] ? "taskOptions" : "tasks";

        state[`${prefixKey}Status`] = DataStatus.LOADING;
        state[`${prefixKey}Filters`] = getFiltersFromQueries(action.meta.arg);

        if (action.meta.arg?.concat && action.meta.arg.pageIndex === 1) {
          state.taskOptions = [];
        }
        state[`${prefixKey}Paging`].pageIndex = Number(
          action.meta.arg.pageIndex ?? DEFAULT_PAGING.pageIndex,
        );
        state[`${prefixKey}Paging`].pageSize = Number(
          action.meta.arg.pageSize ?? DEFAULT_PAGING.pageSize,
        );
      })
      .addCase(
        getTasksOfProject.fulfilled,
        (state, action: PayloadAction<ItemListResponse>) => {
          const { items, concat, ...paging } = action.payload;

          if (concat) {
            state.taskOptions = state.taskOptions.concat(items as TaskList[]);
          } else {
            state.tasks = items as TaskList[];
          }

          const prefixKey = concat ? "taskOptions" : "tasks";

          state[`${prefixKey}Status`] = DataStatus.SUCCEEDED;
          state[`${prefixKey}Error`] = undefined;
          state[`${prefixKey}Paging`] = Object.assign(
            state[`${prefixKey}Paging`],
            paging,
          );
        },
      )
      .addCase(getTasksOfProject.rejected, (state, action) => {
        const prefixKey = action.meta.arg["concat"] ? "taskOptions" : "tasks";

        state[`${prefixKey}Status`] = DataStatus.FAILED;
        state[`${prefixKey}Error`] =
          action.error?.message ?? AN_ERROR_TRY_AGAIN;
      })
      .addCase(
        createTaskList.fulfilled,
        (state, action: PayloadAction<TaskList>) => {
          state.tasks.push(action.payload);
          if (state.tasksPaging.totalItems !== undefined) {
            state.tasksPaging.totalItems += 1;

            const newPages = Math.ceil(
              (current(state).tasksPaging.totalItems as number) /
                current(state).tasksPaging.pageSize,
            );
            state.tasksPaging.totalPages = newPages;
          }
        },
      )
      .addCase(
        updateTaskList.fulfilled,
        (state, action: PayloadAction<TaskList>) => {
          const indexUpdated = state.tasks.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (indexUpdated !== -1) {
            state.tasks[indexUpdated] = Object.assign(
              state.tasks[indexUpdated],
              action.payload,
            );
          }
        },
      )
      .addCase(
        createTask.fulfilled,
        (
          state,
          action: PayloadAction<{
            task: Task;
            taskId?: string;
            taskListId: string;
          }>,
        ) => {
          const { task, taskId, taskListId } = action.payload;
          const indexTaskList = state.tasks.findIndex(
            (taskListItem) => taskListItem.id === taskListId,
          );
          if (indexTaskList !== -1) {
            if (taskId) {
              // Sub task
              const indexTask = state.tasks[indexTaskList].tasks.findIndex(
                (taskItem) => taskItem.id === taskId,
              );

              if (indexTask !== -1) {
                state.tasks[indexTaskList].tasks[indexTask].sub_tasks?.push(
                  task,
                );
              }
            } else {
              state.tasks[indexTaskList].tasks.push(task);
            }
          }
        },
      )
      .addCase(
        updateTask.fulfilled,
        (
          state,
          action: PayloadAction<{
            task: Task;
            taskId: string;
            taskListId: string;
          }>,
        ) => {
          const { task, taskId, taskListId } = action.payload;
          const indexTaskList = state.tasks.findIndex(
            (taskListItem) => taskListItem.id === taskListId,
          );
          if (indexTaskList !== -1) {
            if (taskId) {
              // Sub task
              const indexTask = state.tasks[indexTaskList].tasks.findIndex(
                (taskItem) => taskItem.id === taskId,
              );

              if (indexTask !== -1) {
                state.tasks[indexTaskList].tasks[indexTask] = Object.assign(
                  state.tasks[indexTaskList].tasks[indexTask],
                  action.payload.task,
                );
              }
            }
          }

          if (state?.task) {
            state.task = Object.assign(state.task, action.payload.task);
          }
        },
      )
      .addCase(
        commentTask.fulfilled,
        (
          state,
          action: PayloadAction<{
            comment: Comment;
            taskId: string;
            taskListId: string;
          }>,
        ) => {
          const { comment, taskId, taskListId } = action.payload;
          const indexTaskList = state.tasks.findIndex(
            (taskListItem) => taskListItem.id === taskListId,
          );
          if (indexTaskList !== -1) {
            if (taskId) {
              // Sub task
              const indexTask = state.tasks[indexTaskList].tasks.findIndex(
                (taskItem) => taskItem.id === taskId,
              );

              if (indexTask !== -1) {
                state.tasks[indexTaskList].tasks[indexTask].comments?.push(
                  comment,
                );
              }
            }
          }

          if (state?.task) {
            state.task.comments?.push(comment);
          }
        },
      ),
});

export const { removeMember, updateTaskDetail, reset } = projectSlice.actions;

export default projectSlice.reducer;
