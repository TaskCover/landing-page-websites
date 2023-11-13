import { DataStatus } from "constant/enums";
import { useCallback, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CareerData, GetCareerListQueries, getAllCareer, postCareer } from "./action";
import { CareergDataForm } from "./type";

export const useCareer = () => {
  const dispatch = useAppDispatch();
  const {
    careers: items,
    careersStatus: status,
    careersError: error,
    careersFilters: filters,
  } = useAppSelector((state) => state.career, shallowEqual);

  const { page, size, totalItems, total_page } = useAppSelector(
    (state) => state.career.careersPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetCareer = useCallback(
    async (queries: GetCareerListQueries) => {
      await dispatch(getAllCareer(queries));
    },
    [dispatch],
  );

  const onCreateNewCareer = useCallback(
    async (data: CareergDataForm) => {
      return await dispatch(postCareer(data)).unwrap();
    },
    [dispatch],
  );


  //   const onRespondToFeedback = useCallback(
  //     async (id: string, data: FeedbackData, Token: string | undefined |null) => {
  //       try {
  //         return await dispatch(respondToFeedback({ id, data, Token })).unwrap();
  //       } catch (error) {
  //         throw error;
  //       }
  //     }, [dispatch]
  //   )


  return {
    onGetCareer,
    onCreateNewCareer,
    items,
    totalItems,
    total_page,
    page,
    size,
    error,
    status,
    isIdle,
    isFetching,
    filters,
  };
};