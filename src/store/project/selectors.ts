import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  GetProjectListQueries,
  ProjectData,
  createProject,
  getProjectList,
  getProjectTypeList,
  updateProject,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";

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
    async (id: string, data: ProjectData) => {
      try {
        return await dispatch(updateProject({ id, ...data })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  // const onToggleActiveSeason = useCallback(
  //   async (id: string, status: Status) => {
  //     try {
  //       return await dispatch(toggleActiveSeason({ id, status })).unwrap();
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
    onGetProjects,
    onCreateProject,
    onUpdateProject,
  };
};

export const useProjectTypes = () => {
  const dispatch = useAppDispatch();
  const {
    projectTypes: items,
    projectTypesStatus: status,
    projectTypesError: error,
  } = useAppSelector((state) => state.project, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const options = useMemo(
    () =>
      items.map((item) => ({ label: item.name ?? "Unknown", value: item.id })),
    [items],
  );

  const onGetProjectTypes = useCallback(async () => {
    await dispatch(getProjectTypeList());
  }, [dispatch]);

  return {
    items,
    status,
    isIdle,
    isFetching,
    error,
    options,
    onGetProjectTypes,
  };
};
