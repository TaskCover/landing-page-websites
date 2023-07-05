import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  CompanyData,
  EmployeeData,
  GetEmployeeListQueries,
  PositionData,
  createEmployee,
  createPosition,
  createProjectType,
  deleteEmployees,
  deletePosition,
  deleteProjectType,
  getCostHistory,
  getEmployeeOptions,
  getEmployees,
  getMyCompany,
  getPositionList,
  getProjectTypeList,
  updateEmployee,
  updateMyCompany,
  updatePosition,
  updateProjectType,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { BaseQueries, Option } from "constant/types";
import Avatar from "components/Avatar";

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const {
    employees: items,
    employeesStatus: status,
    employeesError: error,
    employeesFilters: filters,
  } = useAppSelector((state) => state.company, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.employeesPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetEmployees = useCallback(
    async (queries: GetEmployeeListQueries) => {
      await dispatch(getEmployees(queries));
    },
    [dispatch],
  );

  const onCreateEmployee = useCallback(
    async (data: EmployeeData) => {
      return await dispatch(createEmployee(data)).unwrap();
    },
    [dispatch],
  );

  const onUpdateEmployee = useCallback(
    async (id: string, position: string) => {
      try {
        return await dispatch(updateEmployee({ id, position })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onDeleteEmployees = useCallback(
    async (ids: string[]) => {
      try {
        return await dispatch(deleteEmployees(ids)).unwrap();
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
    onGetEmployees,
    onCreateEmployee,
    onUpdateEmployee,
    onDeleteEmployees,
  };
};

export const useEmployeeOptions = () => {
  const dispatch = useAppDispatch();

  const {
    employeeOptions: items,
    employeeOptionsStatus: status,
    employeeOptionsError: error,
    employeeOptionsFilters: filters = {},
  } = useAppSelector((state) => state.company, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.employeeOptionsPaging,
    shallowEqual,
  );

  const options: Option[] = useMemo(
    () =>
      items.map((item) => ({
        label: item.fullname,
        value: item.id,
        avatar: item?.avatar?.link,
        subText: item.email,
      })),
    [items],
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetOptions = useCallback(
    (queries: GetEmployeeListQueries) => {
      dispatch(getEmployeeOptions(queries));
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

export const usePositions = () => {
  const dispatch = useAppDispatch();
  const {
    positions: items,
    positionsStatus: status,
    positionsError: error,
  } = useAppSelector((state) => state.company, shallowEqual);

  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.positionsPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetPositions = useCallback(
    async (queries: BaseQueries) => {
      await dispatch(getPositionList(queries));
    },
    [dispatch],
  );

  const onCreatePosition = useCallback(
    async (data: PositionData) => {
      return await dispatch(createPosition(data)).unwrap();
    },
    [dispatch],
  );

  const onUpdatePosition = useCallback(
    async (id: string, name: string) => {
      try {
        return await dispatch(updatePosition({ id, name })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onDeletePosition = useCallback(
    async (id: string) => {
      try {
        return await dispatch(deletePosition(id)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  return {
    items,
    status,
    isIdle,
    isFetching,
    error,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetPositions,
    onCreatePosition,
    onUpdatePosition,
    onDeletePosition,
  };
};

export const useProjectTypes = () => {
  const dispatch = useAppDispatch();
  const {
    projectTypes: items,
    projectTypesStatus: status,
    projectTypesError: error,
  } = useAppSelector((state) => state.company, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.positionsPaging,
    shallowEqual,
  );

  const onGetProjectTypes = useCallback(
    async (queries: BaseQueries) => {
      await dispatch(getProjectTypeList(queries));
    },
    [dispatch],
  );

  const onCreateProjectType = useCallback(
    async (data: PositionData) => {
      return await dispatch(createProjectType(data)).unwrap();
    },
    [dispatch],
  );

  const onUpdateProjectType = useCallback(
    async (id: string, name: string) => {
      try {
        return await dispatch(updateProjectType({ id, name })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const onDeleteProjectType = useCallback(
    async (id: string) => {
      try {
        return await dispatch(deleteProjectType(id)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  return {
    items,
    status,
    isIdle,
    isFetching,
    error,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetProjectTypes,
    onCreateProjectType,
    onUpdateProjectType,
    onDeleteProjectType,
  };
};

export const useMyCompany = () => {
  const dispatch = useAppDispatch();
  const {
    myItem: item,
    myItemStatus: status,
    myItemError: error,
  } = useAppSelector((state) => state.company, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const id = useMemo(() => item?.id, [item?.id]);

  const onGetCompany = useCallback(async () => {
    await dispatch(getMyCompany());
  }, [dispatch]);

  const onUpdateMyCompany = useCallback(
    async (data: CompanyData) => {
      try {
        return await dispatch(updateMyCompany(data)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  return {
    id,
    item,
    status,
    isIdle,
    isFetching,
    error,
    onGetCompany,
    onUpdateMyCompany,
  };
};

export const useCostHistory = () => {
  const dispatch = useAppDispatch();
  const {
    costHistories: items,
    costHistoriesStatus: status,
    costHistoriesError: error,
  } = useAppSelector((state) => state.company, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.costHistoriesPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetCostHistory = useCallback(
    async (queries: BaseQueries) => {
      await dispatch(getCostHistory(queries));
    },
    [dispatch],
  );

  return {
    items,
    status,
    error,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetCostHistory,
  };
};
