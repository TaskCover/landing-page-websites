import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  GetProjectListQueries,
  GetTasksOfProjectQueries,
  ProjectData,
  TaskData,
  TaskListData,
  createProject,
  createTask,
  createTaskList,
  getMembersOfProject,
  getProject,
  getProjectList,
  getTasksOfProject,
  moveTask,
  updateProject,
  updateTaskList,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { BaseQueries } from "constant/types";
import { getFiltersIgnoreId } from "utils/index";
import { removeMember } from "./reducer";
import { string } from "yup";

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, filters } = useAppSelector(
    (state) => state.project,
    shallowEqual,
  );
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.project.paging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetProjects = useCallback(
    async (queries: GetProjectListQueries) => {
      await dispatch(getProjectList(queries));
    },
    [dispatch],
  );

  const onCreateProject = useCallback(
    async (data: ProjectData) => {
      return await dispatch(createProject(data)).unwrap();
    },
    [dispatch],
  );

  const onUpdateProject = useCallback(
    async (id: string, data: Partial<ProjectData>) => {
      try {
        return await dispatch(updateProject({ id, ...data })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    filters,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetProjects,
    onCreateProject,
    onUpdateProject,
  };
};

export const useProject = () => {
  const dispatch = useAppDispatch();
  const {
    item,
    itemStatus: status,
    itemError: error,
  } = useAppSelector((state) => state.project, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetProject = useCallback(
    async (id: string) => {
      await dispatch(getProject(id));
    },
    [dispatch],
  );

  return {
    item,
    status,
    error,
    isIdle,
    isFetching,
    onGetProject,
  };
};

export const useMembersOfProject = () => {
  const dispatch = useAppDispatch();
  const {
    members: items,
    membersStatus: status,
    membersError: error,
    membersFilters: storeFilters,
  } = useAppSelector((state) => state.project, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.project.membersPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const filters = useMemo(
    () => getFiltersIgnoreId(storeFilters),
    [storeFilters],
  );

  const onGetMembersOfProject = useCallback(
    async (id: string, queries: BaseQueries) => {
      await dispatch(getMembersOfProject({ ...queries, id }));
    },
    [dispatch],
  );

  const onDeleteMember = (id: string) => {
    dispatch(removeMember(id));
  };

  return {
    items,
    status,
    error,
    filters,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    id: storeFilters?.id,
    onGetMembersOfProject,
    onDeleteMember,
  };
};

export const useTasksOfProject = () => {
  const dispatch = useAppDispatch();
  const {
    tasks: items,
    tasksStatus: status,
    tasksError: error,
    tasksFilters: storeFilters,
  } = useAppSelector((state) => state.project, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.project.tasksPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const filters = useMemo(
    () => getFiltersIgnoreId(storeFilters, "project"),
    [storeFilters],
  );

  const onGetTasksOfProject = useCallback(
    async (id: string, queries: GetTasksOfProjectQueries) => {
      await dispatch(getTasksOfProject({ ...queries, project: id }));
    },
    [dispatch],
  );

  const onCreateTaskList = useCallback(
    async (data: TaskListData) => {
      try {
        return await dispatch(createTaskList(data)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onCreateTask = useCallback(
    async (data: TaskData, taskList: string, taskId?: string) => {
      try {
        return await dispatch(
          createTask({ ...data, task_list: taskList, task: taskId }),
        ).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onUpdateTaskList = useCallback(
    async (id: string, name: string) => {
      try {
        return await dispatch(updateTaskList({ name, id })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onMoveTask = async (
    oldTaskListId: string,
    taskListId: string,
    taskId: string,
  ) => {
    try {
      return await dispatch(
        moveTask({
          task_list_current: oldTaskListId,
          task_list_move: taskListId,
          task_current: taskId,
        }),
      ).unwrap();
    } catch (error) {
      throw error;
    }
  };

  // const onUpdateEmployee = useCallback(
  //   async (id: string, position: string) => {
  //     try {
  //       return await dispatch(updateEmployee({ id, position })).unwrap();
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   [dispatch],
  // );

  // const onDeleteEmployees = useCallback(
  //   async (ids: string[]) => {
  //     try {
  //       return await dispatch(deleteEmployees(ids)).unwrap();
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   [dispatch],
  // );

  return {
    items,
    status,
    error,
    filters,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    id: storeFilters?.project,
    onGetTasksOfProject,
    onCreateTaskList,
    onUpdateTaskList,
    onCreateTask,
    onMoveTask,
    // onCreateEmployee,
    // onUpdateEmployee,
    // onDeleteEmployees,
  };
};

export const useTaskOptions = () => {
  const dispatch = useAppDispatch();

  const {
    taskOptions: items,
    taskOptionsStatus: status,
    taskOptionsError: error,
    taskOptionsFilters: filters = {},
  } = useAppSelector((state) => state.project, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.project.taskOptionsPaging,
    shallowEqual,
  );

  const options = useMemo(
    () =>
      items.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [items],
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetOptions = useCallback(
    (queries: GetTasksOfProjectQueries) => {
      dispatch(getTasksOfProject({ concat: true, ...queries }));
    },
    [dispatch],
  );

  return {
    items,
    options,
    status,
    error,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    filters,
    onGetOptions,
  };
};
