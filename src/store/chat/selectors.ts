/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  addMembersToDirectMessageGroup,
  createDirectMessageGroup,
  getAllConvention,
  getLatestMessages,
  leftDirectMessageGroup,
  changeGroupRole,
  fetchGroupMembers,
  removeUserFromGroup,
  getChatAttachments,
} from "./actions";
import { DataStatus, PayStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import {
  AddMember2GroupRequest,
  ChatConventionItemRequest,
  CreateGroupRequest,
  LastMessagesRequest,
  LeftGroupRequest,
  RemoveGroupMemberRequest,
  STEP,
  TYPE_LIST,
  RemoveMemberRequest,
  FetchGroupMemberRequest,
  ChangeRoleRequest,
  ChatAttachmentsRequest,
} from "./type";
import { useAuth } from "store/app/selectors";
import {
  setRoomId,
  setStep,
  setMessage,
  setUserPartner,
  setTypeList,
  clearConversation,
  clearMessageList,
} from "./reducer";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const {
    convention,
    messageInfo,
    userOnlinePage,
    roomId,
    userPartner,
    conversationPaging,
    status,
    currStep,
    prevStep,
    backFallStep,
    createGroupStatus,
    newGroupData,
    addMembers2GroupStatus,
    leftGroupStatus,
    removeMemberGroupStatus,
    typeList,
    dataTransfer,
    groupMembers,
    chatAttachments
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
    (step: STEP, dataTransfer?: any) => {
      dispatch(setStep({ step, dataTransfer }));
    },
    [dispatch],
  );

  const onSetTypeList = useCallback(
    (type: TYPE_LIST) => {
      dispatch(setTypeList(type));
    },
    [dispatch],
  );

  const onSetRoomId = (id: string) => {
    dispatch(setRoomId(id));
  };

  const onCreateDirectMessageGroup = useCallback(
    async ({
      type = "d",
      ...rest
    }: Omit<CreateGroupRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
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

  const onAddMembers2Group = useCallback(
    async (params: Omit<AddMember2GroupRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        addMembersToDirectMessageGroup({
          authToken,
          userId,
          ...params
        }),
      );
    },
    [dispatch, user],
  );

  const onLeftGroup = useCallback(
    async (params: Omit<LeftGroupRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        leftDirectMessageGroup({
          authToken,
          userId,
          ...params
        }),
      );
    },
    [dispatch, user],
  );

  const onRemoveGroupMember = useCallback(
    async (params: Omit<RemoveMemberRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        removeUserFromGroup({
          authToken,
          userId,
          ...params
        }),
      );
    },
    [dispatch, user],
  );

  const onFetchGroupMembersMember = useCallback(
    async (params: Omit<FetchGroupMemberRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        fetchGroupMembers({
          authToken,
          userId,
          ...params
        }),
      );
    },
    [dispatch, user],
  );

  const onChangeGroupRole = useCallback(
    async (params: Omit<ChangeRoleRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        changeGroupRole({
          authToken,
          userId,
          ...params
        }),
      );
    },
    [dispatch, user],
  );

  const onGetChatAttachments = useCallback(
    async (params: Omit<ChatAttachmentsRequest, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        getChatAttachments({
          authToken,
          userId,
          ...params
        }),
      );
    },
    [dispatch, user],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSetMessage = (message: any) => {
    dispatch(setMessage(message));
  };

  const onSetUserPartner = (username: string | null) => {
    dispatch(setUserPartner(username));
  };

  const onClearConversation = () => {
    dispatch(clearConversation());
  };

  const onClearMessageList = () => {
    dispatch(clearMessageList());
  };

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
    userPartner,
    currStep,
    prevStep,
    backFallStep,
    createGroupStatus,
    newGroupData,
    addMembers2GroupStatus,
    leftGroupStatus,
    removeMemberGroupStatus,
    typeList,
    dataTransfer,
    groupMembers,
    onGetAllConvention,
    chatAttachments,
    onGetLastMessages,
    onSetStep,
    onSetRoomId,
    onCreateDirectMessageGroup,
    onAddMembers2Group,
    onLeftGroup,
    onRemoveGroupMember,
    onSetTypeList,
    onFetchGroupMembersMember,
    onChangeGroupRole,
    onGetChatAttachments,
    onSetUserPartner,
    onSetMessage,
    onClearConversation,
    onClearMessageList,
  };
};
