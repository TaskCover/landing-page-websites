import { useCallback, useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { FeedbackData, FormFeedbackBody, GetFeedbackDataListQueries, getFeedbacks, postFeedback, respondToFeedback } from "./actions"; // Import getFeedbacks
import { DataStatus } from "constant/enums";

export const useFeedback = () => {
  const dispatch = useAppDispatch();
  const {
    feedbacks: items,
    feedbacksStatus: status,
    feedbacksError: error,
    feedbacksFilters: filters,
  } = useAppSelector((state) => state.feedback, shallowEqual);

  const { page, size, totalItems, total_page } = useAppSelector(
    (state) => state.feedback.feedbackPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetFeedback = useCallback(
    async (queries: GetFeedbackDataListQueries) => {
      await dispatch(getFeedbacks(queries));
    },
    [dispatch],
  );

  const onRespondToFeedback = useCallback(
    async (id: string, data: FeedbackData, Token: string | undefined |null) => {
      try {
        return await dispatch(respondToFeedback({ id, data, Token })).unwrap();
      } catch (error) {
        throw error;
      }
    }, [dispatch]
  )

  const onCreateFormFeedback = useCallback(
    async ( body: FormFeedbackBody, token: string | undefined | null) => {
      try {
        return await dispatch(postFeedback({ body, token }));
      } catch (error) {
        throw error;
      }
    }, [dispatch]
  );


  return {
    onGetFeedback,
    onRespondToFeedback,
    onCreateFormFeedback,
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
