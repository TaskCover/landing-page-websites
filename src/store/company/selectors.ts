import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  EmployeeData,
  GetEmployeeListQueries,
  PositionData,
  createEmployee,
  createPosition,
  getEmployees,
  getPositions,
  updateEmployee,
  updatePosition,
} from "./actions";
import { DataStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";

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

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const options = useMemo(
    () =>
      items.map((item) => ({ label: item.name ?? "Unknown", value: item.id })),
    [items],
  );

  const onGetPositions = useCallback(async () => {
    await dispatch(getPositions());
  }, [dispatch]);

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

  return {
    items,
    status,
    isIdle,
    isFetching,
    error,
    options,
    onGetPositions,
    onCreatePosition,
    onUpdatePosition,
  };
};
