import { DataStatus } from "constant/enums";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  GetBillingListQueries,
  GetBudgetListQueries,
  createBilling,
  getBillingDetail,
  getBillingList,
  getBudgetDetail,
  getBudgetList,
  getServiceBudget,
} from "./actions";
import { Service } from "./reducer";

export const useBillings = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, filters, item, createStatus } = useAppSelector(
    (state) => state.billing,
    shallowEqual,
  );
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.billing.paging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetBillings = useCallback(
    async (queries: GetBillingListQueries) => {
      await dispatch(getBillingList(queries));
    },
    [dispatch],
  );

  const onCreateBilling = useCallback(
    async (data: any) => {
      return await dispatch(createBilling(data)).unwrap();
    },
    [dispatch],
  );

  const onGetBilling = useCallback(
    async (id: string) => {
      return await dispatch(getBillingDetail(id));
    },
    [dispatch],
  );

  //   const onUpdateProject = useCallback(
  //     async (id: string, data: Partial<ProjectData>) => {
  //       try {
  //         return await dispatch(updateProject({ id, ...data })).unwrap();
  //       } catch (error) {
  //         throw error;
  //       }
  //     },
  //     [dispatch],
  //   );

  return {
    items,
    item,
    status,
    error,
    filters,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    createStatus,
    onGetBillings,
    onCreateBilling,
    onGetBilling,
  };
};

export const useBudgets = () => {
  const dispatch = useAppDispatch();
  const { budgets, status, error, filters, budgetDetail } = useAppSelector(
    (state) => state.billing,
    shallowEqual,
  );
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.billing.paging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetBudgets = useCallback(
    async (queries: GetBudgetListQueries) => {
      await dispatch(getBudgetList(queries));
    },
    [dispatch],
  );

  const onGetBudgetDetail = useCallback(
    async (id: string) => {
      await dispatch(getBudgetDetail(id));
    },
    [dispatch],
  );

  //   const onCreateProject = useCallback(
  //     async (data: ProjectData) => {
  //       return await dispatch(createProject(data)).unwrap();
  //     },
  //     [dispatch],
  //   );

  //   const onUpdateProject = useCallback(
  //     async (id: string, data: Partial<ProjectData>) => {
  //       try {
  //         return await dispatch(updateProject({ id, ...data })).unwrap();
  //       } catch (error) {
  //         throw error;
  //       }
  //     },
  //     [dispatch],
  //   );

  return {
    budgets,
    status,
    error,
    filters,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    budgetDetail,
    onGetBudgets,
    onGetBudgetDetail,
  };
};
let arrService: Service[] = [];
let sumAmount: number = 0;
export const useServiceBudgets = () => {
  const dispatch = useAppDispatch();

  const { serviceBudgets, status, error, filters } = useAppSelector(
    (state) => state.billing,
    shallowEqual,
  );

  const onGetServiceBudgets = useCallback(
    async (id: string) => {
      await dispatch(getServiceBudget(id));
    },
    [dispatch],
  );

  serviceBudgets?.map((item) => {
    if (item.services && item.services?.length > 0) {
      if (arrService && arrService?.length === 0) {
        arrService.push(...item.services);
      }
      // else {
      //   arrService = [...arrService, ...item.services];
      // }
    }
  });

  arrService.forEach((item) => {
    sumAmount += item.price;
  });

  //   const onUpdateProject = useCallback(
  //     async (id: string, data: Partial<ProjectData>) => {
  //       try {
  //         return await dispatch(updateProject({ id, ...data })).unwrap();
  //       } catch (error) {
  //         throw error;
  //       }
  //     },
  //     [dispatch],
  //   );

  return {
    arrService,
    sumAmount,
    onGetServiceBudgets,
  };
};
// export const useProject = () => {
//   const dispatch = useAppDispatch();
//   const {
//     item,
//     itemStatus: status,
//     itemError: error,
//   } = useAppSelector((state) => state.project, shallowEqual);

//   const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
//   const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

//   const onGetProject = useCallback(
//     async (id: string) => {
//       await dispatch(getProject(id));
//     },
//     [dispatch],
//   );

//   return {
//     item,
//     status,
//     error,
//     isIdle,
//     isFetching,
//     onGetProject,
//   };
// };
