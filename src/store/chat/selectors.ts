import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAllConvention } from "./actions";
import { DataStatus, PayStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ChatConventionItemRequest, STEP } from "./type";
import { useAuth } from "store/app/selectors";
import { setRoomId, setStep } from "./reducer";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const { convention, roomId, paging, status, currStep, prevStep } =
    useAppSelector((state) => state.chat, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.chat.paging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

  const onGetAllConvention = useCallback(
    async ({
      count = 20,
      offset = 0,
      ...rest
    }: Omit<ChatConventionItemRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      await dispatch(
        getAllConvention({ count, offset, authToken, userId, ...rest }),
      );
    },
    [dispatch, user],
  );

  const onSetStep = useCallback(
    (step: STEP) => {
      dispatch(setStep(step));
    },
    [dispatch],
  );

  const onSetRoomId = (step: STEP) => {
    dispatch(setRoomId(step));
  };

  return {
    convention,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    roomId,
    currStep,
    prevStep,
    onGetAllConvention,
    onSetStep,
    onSetRoomId,
  };
};
