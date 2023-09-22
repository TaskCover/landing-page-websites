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
  renameGroup,
  searchChatText,
  getUnreadMessages,
  getConventionById,
  forwardMessage,
  changeGroupAvatar,
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
  RenameGroupRequest,
  MessageSearchInfoRequest,
  MessageSearchInfo,
  UnReadMessageRequest,
  MessageInfo,
  ForwardMessageGroup,
  ChangeGroupAvatar,
  TypeDrawerChat,
  IChatInfo,
} from "./type";
import { useAuth } from "store/app/selectors";
import {
  setRoomId,
  setStep,
  setMessage,
  setConversationInfo,
  setTypeList,
  setDataTransfer,
  setStateSendMessage,
  setLastMessage,
  clearConversation,
  clearMessageList,
  reset,
  setStateSearchMessage,
  updateUnSeenMessage,
  setTypeDrawerChatDesktop,
  setCloseDrawerChatDesktop,
  resetConversationInfo,
  setChatDesktop,
} from "./reducer";
import { Attachment, UrlsQuery } from "./media/typeMedia";
import { getChatUrls, uploadFile } from "./media/actionMedia";
import { FILE_ACCEPT, IMAGES_ACCEPT } from "constant/index";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const {
    convention,
    mediaListConversation,
    messageInfo,
    messageStatus,

    roomId,
    conversationInfo,
    conversationPaging,
    messagePaging,
    conversationStatus,

    currStep,
    prevStep,
    partnerInfo,
    partnerInfoStatus,

    chatLinks,
    chatLinksStatus,
    //ListSearchTextMessage
    listSearchMessage,
    statusListSearchMessage,
    //StateUnReadMessage
    unReadMessage,
    statusUnReadMessage,

    mediaList,
    mediaListStatus,

    stateSendMessage,
    stateSearchMessage,

    createGroupStatus,
    newGroupData,
    addMembers2GroupStatus,
    leftGroupStatus,
    removeMemberGroupStatus,
    typeList,
    dataTransfer,
    groupMembers,
    chatAttachments,
    typeDrawerChat,
    isOpenInfoChat,
    isChatDesktop,
  } = useAppSelector((state) => state.chat, shallowEqual);
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.chat.conversationPaging,
    shallowEqual,
  );

  const isIdle = useMemo(
    () => conversationStatus === DataStatus.IDLE,
    [conversationStatus],
  );
  const isFetching = useMemo(
    () => conversationStatus === DataStatus.LOADING,
    [conversationStatus],
  );
  const isError = useMemo(
    () => conversationStatus === DataStatus.FAILED,
    [conversationStatus],
  );

  const onGetAllConvention = useCallback(
    async ({
      count = 20,
      offset = 0,
      ...rest
    }: Omit<ChatConventionItemRequest, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        getAllConvention({
          count,
          offset,
          authToken,
          userId,
          ...rest,
        }),
      ).unwrap();
    },
    [dispatch, user],
  );

  const onGetConventionById = useCallback(
    async ({
      count = 1,
      offset = 0,
      ...rest
    }: Omit<ChatConventionItemRequest, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        getConventionById({
          count,
          offset,
          authToken,
          userId,
          ...rest,
        }),
      ).unwrap();
    },
    [dispatch, user],
  );

  const onGetLastMessages = useCallback(
    async ({
      count,
      offset,
      ...rest
    }: Omit<LastMessagesRequest, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        getLatestMessages({
          count: count ?? 10,
          offset: offset ?? 0,
          authToken,
          userId,
          ...rest,
        }),
      ).unwrap();
    },
    [dispatch, user],
  );

  const onGetChatUrls = useCallback(
    async (params?: Omit<UrlsQuery, "userId" | "authToken">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      if (!params) return;
      await dispatch(
        getChatUrls({
          roomId: params?.roomId ?? roomId,
          type: params?.type ?? conversationInfo?.t,
          authToken,
          userId,
        }),
      ).unwrap();
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
          receiverUsername: conversationInfo?.username || dataTransfer?.username,
          ...message,
        }),
      );
    },
    [conversationInfo?.username, dispatch, user, dataTransfer],
  );

  const onSearchChatText = useCallback(
    async (params: Omit<MessageSearchInfoRequest, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        searchChatText({
          authToken,
          userId,
          roomId: params?.roomId ?? roomId,
          text: params?.text,
          type: params?.type,
        }),
      ).unwrap();
    },
    [dispatch, roomId, user],
  );

  const onGetUnReadMessages = useCallback(
    async (paramReq?: Partial<UnReadMessageRequest>) => {
      const { type = "d" } = paramReq || {};
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      await dispatch(
        getUnreadMessages({
          authToken,
          userId,
          roomId,
          type,
        }),
      );

      await dispatch(updateUnSeenMessage(roomId));
    },
    [dispatch, roomId, user],
  );

  const onGetUserInfo = useCallback(
    async (username: string) => {
      await dispatch(getUserInfoById(username)).unwrap();
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

  const onSetDataTransfer = useCallback(
    (data: any) => {
      dispatch(setDataTransfer(data));
    },
    [dispatch],
  );

  const onSetRoomId = (id: string) => {
    dispatch(setRoomId(id));
  };

  const onSetStateSearchMessage = useCallback(
    async (message: MessageSearchInfo | null) => {
      const messageSearch = message ? { ...message } : null;
      dispatch(setStateSearchMessage(messageSearch));
    },
    [dispatch],
  );

  const onCreateDirectMessageGroup = useCallback(
    async ({
      type = "d",
      ...rest
    }: Omit<CreateGroupRequest, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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

  const onRenameGroup = useCallback(
    async (params: Omit<RenameGroupRequest, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        renameGroup({
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      if (!(params?.roomType ?? (conversationInfo?.t as RoomType))) return;
      if ((params?.roomId ?? roomId).length === 0) return;
      return await dispatch(
        getChatAttachments({
          authToken,
          userId,
          roomId: params?.roomId ?? roomId,
          roomType:
            params?.roomType ?? (conversationInfo?.t as RoomType) ?? "c",
          fileType: params?.fileType ?? "media",
        }),
      ).unwrap();
    },
    [conversationInfo, dispatch, roomId, user],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSetMessage = (message: any) => {
    dispatch(setMessage(message));
  };

  const onSetConversationInfo = (conversationInfo: IChatItemInfo | null) => {
    dispatch(setConversationInfo(conversationInfo));
  };

  const onSetLastMessage = (newMessage: {
    roomId: string;
    lastMessage: MessageInfo;
    unreadCount: number;
    unreadsFrom: string;
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
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
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

  const onForwardMessage = useCallback(
    async (params: Omit<ForwardMessageGroup, "authToken" | "userId">) => {
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        forwardMessage({
          authToken,
          userId,
          ...params,
        }),
      );
    },
    [dispatch, user],
  );

  const onChangeGroupAvatar = useCallback(
    async (file: File, roomId: string) => {
      const result = await dispatch(
        uploadFile({ endpoint: "files/upload-link", file }),
      );
      const authToken = user?.["authToken"] ?? "";
      const userId = user?.["id_rocket"] ?? "";
      return await dispatch(
        changeGroupAvatar({
          authToken,
          userId,
          roomId,
          avatarUrl: result?.payload?.download ?? "",
        }),
      );
    },
    [dispatch, user],
  );

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
            obj.name = item.title;
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

  const onSetDrawerType = useCallback(
    async (type: TypeDrawerChat) => {
      return dispatch(setTypeDrawerChatDesktop(type));
    },
    [dispatch],
  );

  const onCloseDrawer = useCallback(
    async (type: TypeDrawerChat) => {
      return dispatch(setCloseDrawerChatDesktop(type));
    },
    [dispatch],
  );

  const onResetConversationInfo = useCallback(async () => {
    return dispatch(resetConversationInfo());
  }, [dispatch]);

  const onSetChatDesktop = useCallback(async (valid = true) => {
    return dispatch(setChatDesktop(valid));
  }, [dispatch]);

  return {
    convention,
    mediaListConversation,
    conversationPaging,
    messagePaging,
    messageInfo,
    messageStatus,
    isError,
    isIdle,
    isFetching,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    roomId,
    conversationInfo: conversationInfo as IChatInfo,
    currStep,
    prevStep,
    partnerInfo,
    partnerInfoStatus,

    chatLinks,
    chatLinksStatus,
    listSearchMessage,
    statusListSearchMessage,

    mediaList,
    mediaListStatus,

    stateSendMessage,
    stateSearchMessage,
    unReadMessage,

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
    onRenameGroup,
    onRemoveGroupMember,
    onSetTypeList,
    onSetDataTransfer,
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
    onSearchChatText,
    onSetStateSearchMessage,
    onGetUnReadMessages,
    onGetConventionById,
    onForwardMessage,
    onChangeGroupAvatar,
    onSetDrawerType,
    onCloseDrawer,
    typeDrawerChat,
    isOpenInfoChat,
    onResetConversationInfo,
    isChatDesktop,
    onSetChatDesktop
  };
};
