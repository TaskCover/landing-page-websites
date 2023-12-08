import { DataStatus } from "constant/enums";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { GetBillingListQueries, getBillingList } from "./actions";

export const useBillings = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, filters } = useAppSelector(
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
    onGetBillings,
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
