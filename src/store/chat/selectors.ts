/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  addMembersToDirectMessageGroup,
  createDirectMessageGroup,
  getAllConvention,
  getLatestMessages,
  getUserInfoById,
  leftDirectMessageGroup,
  changeGroupRole,
  fetchGroupMembers,
  removeUserFromGroup,
  getChatAttachments,
  deleteConversation,
  sendMessages,
} from "./actions";
import { DataStatus, PayStatus } from "constant/enums";
import { useMemo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import {
  AddMember2GroupRequest,
  ChatConventionItemRequest,
  IChatItemInfo,
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
  DeleteConversationGroup,
  MessageBodyRequest,
  RoomType,
} from "./type";
import { useAuth } from "store/app/selectors";
import {
  setRoomId,
  setStep,
  setMessage,
  setConversationInfo,
  setTypeList,
  setStateSendMessage,
  setLastMessage,
  clearConversation,
  clearMessageList,
  reset,
} from "./reducer";
import { Attachment, MediaQuery, UrlsQuery } from "./media/typeMedia";
import { getChatUrls, getChatRoomFile, uploadFile } from "./media/actionMedia";
import { FILE_ACCEPT, IMAGES_ACCEPT } from "constant/index";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const {
    convention,
    messageInfo,

    userOnlinePage,
    roomId,
    conversationInfo,
    conversationPaging,
    messagePaging,
    status,

    currStep,
    prevStep,
    backFallStep,

    partnerInfo,
    partnerInfoStatus,

    chatLinks,
    chatLinksStatus,

    mediaList,
    mediaListStatus,

    stateSendMessage,

    createGroupStatus,
    newGroupData,
    addMembers2GroupStatus,
    leftGroupStatus,
    removeMemberGroupStatus,
    typeList,
    dataTransfer,
    groupMembers,
    chatAttachments,
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

  const onGetChatUrls = useCallback(
    async (params?: Omit<UrlsQuery, "userId" | "authToken">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      await dispatch(
        getChatUrls({
          roomId: params?.roomId ?? roomId,
          type: params?.type ?? conversationInfo?.t,
          authToken,
          userId,
        }),
      );
    },
    [conversationInfo?.t, dispatch, roomId, user],
  );

  const onSendMessage = useCallback(
    async (
      message: Omit<
        MessageBodyRequest,
        "sender_userId" | "sender_authToken" | "receiverUsername"
      >,
    ) => {
      await dispatch(
        sendMessages({
          sender_userId: user?.["id_rocket"] || "",
          sender_authToken: user?.["authToken"] || "",
          receiverUsername: conversationInfo?.partnerUsername || "",
          ...message,
        }),
      );
    },
    [conversationInfo?.partnerUsername, dispatch, user],
  );

  const onGetUserInfo = useCallback(
    async (username: string) => {
      await dispatch(getUserInfoById(username));
    },
    [dispatch],
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
          ...params,
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
          ...params,
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
          ...params,
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
          ...params,
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
          ...params,
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
          roomId: params?.roomId ?? roomId,
          roomType:
            params?.roomType ?? (conversationInfo?.t as RoomType) ?? "c",
          fileType: params?.fileType ?? "media",
        }),
      );
    },
    [conversationInfo, dispatch, roomId, user],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSetMessage = (message: any) => {
    dispatch(setMessage(message));
  };

  const onSetConversationInfo = (conversationInfo: IChatItemInfo | null) => {
    dispatch(
      setConversationInfo({ conversationInfo, sessionId: user?.["username"] }),
    );
  };

  const onSetLastMessage = (newMessage: {
    roomId: string;
    lastMessage: Attachment;
  }) => {
    dispatch(setLastMessage(newMessage));
  };

  const onClearConversation = () => {
    dispatch(clearConversation());
  };

  const onClearMessageList = () => {
    dispatch(clearMessageList());
  };

  const onDeleteConversationGroup = useCallback(
    async (params: Omit<DeleteConversationGroup, "authToken" | "userId">) => {
      const authToken = user ? user["authToken"] : "";
      const userId = user ? user["id_rocket"] : "";
      return await dispatch(
        deleteConversation({
          authToken,
          userId,
          ...params,
        }),
      );
    },
    [dispatch, user],
  );

  const onSetStateSendMessage = useCallback(
    (state: { files: File | File[] | null; status: DataStatus }) => {
      dispatch(setStateSendMessage(state));
    },
    [dispatch],
  );

  const onReset = () => {
    dispatch(reset());
  };

  const onUploadAndSendFile = useCallback(
    async ({ endpoint, files }: { endpoint: string; files: File[] }) => {
      onSetStateSendMessage({ files, status: DataStatus.LOADING });
      try {
        const promises: Promise<any>[] = [];
        for (let index = 0; index < files.length; index++) {
          promises.push(
            dispatch(
              uploadFile({
                endpoint,
                file: files[index],
              }),
            ),
          );
        }
        const urlFiles = await Promise.all(promises);
        const listFileUrl: {
          download: string;
          object: string;
          upload: string;
          type: string;
          title: string;
        }[] = urlFiles.map((item) => {
          return item.payload;
        });

        if (listFileUrl.length > 0) {
          const attachments = listFileUrl.map((item) => {
            const obj: Attachment = {};
            if (IMAGES_ACCEPT.includes(item.type)) {
              obj.image_url = item.download;
            }

            if (item.type === "video/mp4") {
              obj.video_url = item.download;
            }

            if (FILE_ACCEPT.includes(item.type)) {
              obj.title = item.title;
              obj.title_link = item.download;
              obj.title_link_download = true;
            }

            return obj;
          });
          await onSendMessage({ attachments });
          onSetStateSendMessage({ files: [], status: DataStatus.SUCCEEDED });
        }
      } catch (error) {
        onSetStateSendMessage({ files: [], status: DataStatus.FAILED });
      }
    },
    [dispatch, onSendMessage, onSetStateSendMessage],
  );

  return {
    convention,
    conversationPaging,
    messagePaging,
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
    conversationInfo,
    currStep,
    prevStep,
    backFallStep,
    partnerInfo,
    partnerInfoStatus,

    chatLinks,
    chatLinksStatus,

    mediaList,
    mediaListStatus,

    stateSendMessage,

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
    onSetConversationInfo,
    onSetMessage,
    onClearConversation,
    onClearMessageList,
    onGetUserInfo,
    onGetChatUrls,
    onDeleteConversationGroup,
    onReset,
    onUploadAndSendFile,
    onSendMessage,
    onSetStateSendMessage,
    onSetLastMessage,
  };
};
