import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  CompanyData,
  CompanyStatus,
  EmployeeData,
  GetCompanyListQueries,
  GetEmployeeListQueries,
  GetStatementHistoryQueries,
  PositionData,
  approveOrReject,
  createEmployee,
  createPosition,
  createProjectType,
  deletePosition,
  deleteProjectType,
  getCompany,
  getCompanyList,
  getCostHistory,
  getEmployees,
  getMyCompany,
  getPositionList,
  getProjectTypeList,
  getStatementHistory,
  updateCompany,
  updateEmployee,
  updatePosition,
  updateProjectType,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { BaseQueries } from "constant/types";

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

  const options = useMemo(
    () =>
      items.map((item) => ({
        label: item.fullname,
        value: item.id,
      })),
    [items],
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetOptions = useCallback(
    (queries: GetEmployeeListQueries) => {
      dispatch(getEmployees({ concat: true, ...queries }));
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

export const useCompany = () => {
  const dispatch = useAppDispatch();
  const {
    item,
    itemStatus: status,
    itemError: error,
  } = useAppSelector((state) => state.company, shallowEqual);

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetCompany = useCallback(
    async (id: string) => {
      await dispatch(getCompany(id));
    },
    [dispatch],
  );

  const onUpdateCompany = useCallback(
    async (id: string, data: CompanyData) => {
      try {
        return await dispatch(updateCompany({ id, ...data })).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  return {
    item,
    status,
    isIdle,
    isFetching,
    error,
    onGetCompany,
    onUpdateCompany,
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

  return {
    id,
    item,
    status,
    isIdle,
    isFetching,
    error,
    onGetCompany,
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

export const useCompanies = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    itemsStatus: status,
    itemsError: error,
    itemsFilters: filters,
    itemsStatistic: statistic,
  } = useAppSelector((state) => state.company, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.itemsPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetCompanies = useCallback(
    async (queries: GetCompanyListQueries) => {
      await dispatch(getCompanyList(queries));
    },
    [dispatch],
  );

  const onApproveOrReject = async (ids, type: CompanyStatus) => {
    try {
      return await dispatch(approveOrReject({ ids, type })).unwrap();
    } catch (error) {
      throw error;
    }
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
    statistic,
    onGetCompanies,
    onApproveOrReject,
  };
};

export const useCompanyOptions = () => {
  const dispatch = useAppDispatch();

  const {
    itemOptions: options,
    itemOptionsStatus: status,
    itemOptionsError: error,
    itemOptionsFilters: filters = {},
  } = useAppSelector((state) => state.company, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.itemOptionsPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetOptions = useCallback(
    (queries: GetCompanyListQueries) => {
      dispatch(getCompanyList({ concat: true, ...queries }));
    },
    [dispatch],
  );

  return {
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

export const useStatementHistory = () => {
  const dispatch = useAppDispatch();
  const {
    statementHistories: items,
    statementHistoriesStatus: status,
    statementHistoriesError: error,
    statementHistoriesFilters: filters,
  } = useAppSelector((state) => state.company, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.company.statementHistoriesPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetStatementHistory = useCallback(
    async (queries: GetStatementHistoryQueries) => {
      await dispatch(getStatementHistory(queries));
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
    filters,
    onGetStatementHistory,
  };
};
