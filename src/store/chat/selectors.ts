import { useAppDispatch, useAppSelector } from "store/hooks";
import { createDirectMessageGroup, getAllConvention, getLatestMessages } from "./actions";
import { DataStatus, PayStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ChatConventionItemRequest, CreateGroupRequest, LastMessagesRequest, STEP } from "./type";
import { useAuth } from "store/app/selectors";
import { setRoomId, setStep } from "./reducer";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const {
    convention,
    messageInfo,
    userOnlinePage,
    roomId,
    conversationPaging,
    status,
    currStep,
    prevStep,
    createGroupStatus,
    newGroupData,
  } = useAppSelector((state) => state.chat, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.chat.conversationPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
  const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
  const isError = useMemo(() => status === DataStatus.FAILED, [status]);

  const onGetAllConvention = useCallback(
    async ({
      count = 20,
      offset = 0,
      ...rest
    }: Omit<ChatConventionItemRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      await dispatch(
        getAllConvention({
          count,
          offset,
          authToken,
          userId,
          ...rest,
        }),
      );
    },
    [dispatch, user],
  );

  const onGetLastMessages = useCallback(
    async ({
      count = 20,
      offset = 0,
      ...rest
    }: Omit<LastMessagesRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      await dispatch(
        getLatestMessages({
          count,
          offset,
          authToken,
          userId,
          ...rest,
        }),
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

  const onSetRoomId = (id: string) => {
    dispatch(setRoomId(id));
  };

  const onCreateDirectMessageGroup = useCallback(
    async ({
      type = 'd',
      ...rest
    }: Omit<CreateGroupRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      await dispatch(
        createDirectMessageGroup({
          type,
          authToken,
          userId,
          ...rest,
        }),
      );
    },
    [dispatch, user],
  );

  return {
    convention,
    conversationPaging,
    messageInfo,
    userOnlinePage,
    isError,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    roomId,
    currStep,
    prevStep,
    createGroupStatus,
    newGroupData,
    onGetAllConvention,
    onGetLastMessages,
    onSetStep,
    onSetRoomId,
    onCreateDirectMessageGroup,
  };
};
