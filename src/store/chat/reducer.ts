/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addMembersToDirectMessageGroup,
  createDirectMessageGroup,
  getAllConvention,
  getLatestMessages,
  getUserInfoById,
  leftDirectMessageGroup,
  fetchGroupMembers,
  getChatAttachments,
  deleteConversation,
  sendMessages,
} from "./actions";
import { DataStatus } from "constant/enums";
import {
  ChatGroup,
  ChatState,
  MessageInfo,
  STEP,
  TYPE_LIST,
  UserInfo,
} from "./type";
import { getChatRoomFile, getChatUrls } from "./media/actionMedia";
import { ChatLinkType, MediaResponse, MediaType } from "./media/typeMedia";

const initalPage = { pageIndex: 0, pageSize: 10 };
const initialState: ChatState = {
  convention: [],
  status: DataStatus.IDLE,
  conversationPaging: initalPage,
  userOnlinePage: [],
  roomId: "",
  conversationInfo: null,
  currStep: STEP.CONVENTION,
  prevStep: STEP.CONVENTION,
  backFallStep: STEP.IDLE,
  messageInfo: [],
  messageStatus: DataStatus.IDLE,
  messagePaging: initalPage,
  //Partner Infomation
  partnerInfo: null,
  partnerInfoStatus: DataStatus.IDLE,
  //chatLinks
  chatLinks: [],
  chatLinksStatus: DataStatus.IDLE,
  //media list
  mediaList: [],
  mediaListStatus: DataStatus.IDLE,
  //stateSendMessage
  stateSendMessage: {
    filePreview: null,
    status: DataStatus.IDLE,
  },

  newGroupData: {},
  createGroupStatus: DataStatus.IDLE,
  addMembers2GroupStatus: DataStatus.IDLE,
  leftGroupStatus: DataStatus.IDLE,
  removeMemberGroupStatus: DataStatus.IDLE,
  typeList: TYPE_LIST.MEDIA_LIST,
  groupMembers: [],
  chatAttachments: [],
  deleteConversationStatus: DataStatus.IDLE,
  dataTransfer: {}
};

const isConversation = (type: string) => {
  return type === "d" || type === "c" || type === "p";
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: () => initialState,
    setStep: (state, action) => {
      const prevStep = Number(action.payload.step) - 1;
      state.backFallStep = state.currStep;

      state.prevStep = prevStep === STEP.IDLE ? STEP.CONVENTION : prevStep;
      state.currStep = action.payload.step;

      if (action.payload.dataTransfer !== undefined) {
        state.dataTransfer = action.payload.dataTransfer;
      }
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setTypeList: (state, action) => {
      state.typeList = action.payload;
    },
    setDataTransfer: (state, action) => {
      console.log('action.payload', action.payload);
      
      state.dataTransfer = action.payload;
    },
    setConversationInfo: (state, action) => {
      const { conversationInfo, sessionId } = action.payload;
      if (conversationInfo) {
        const { usernames } = conversationInfo || {};
        const partnerUsername =
          sessionId === usernames?.[0] ? usernames?.[1] : usernames?.[0];
        const statusOnline = conversationInfo.statuses?.find(
          (item) => item.username === partnerUsername,
        )?.status;

        state.conversationInfo = {
          ...conversationInfo,
          partnerUsername,
          statusOnline,
        };
      }
    },
    setMessage: (state, action) => {
      state.messageInfo.push(action.payload);
    },
    setStateSendMessage: (
      state,
      action: PayloadAction<{
        files: File | File[] | null;
        status: DataStatus;
      }>,
    ) => {
      state.stateSendMessage = {
        filePreview: action.payload.files,
        status: action.payload.status,
      };
    },
    setLastMessage: (state, action) => {
      const newConversation = state.convention.map((item) => {
        if (item._id === action.payload.roomId) {
          return { ...item, lastMessage: action.payload.lastMessage };
        }
        return item;
      });
      state.convention = newConversation;
    },
    clearConversation: (state) => {
      state.convention = [];
      state.conversationPaging = initalPage;
    },
    clearMessageList: (state) => {
      state.messageInfo = [];
      state.messagePaging = initalPage;
    },
  },
  extraReducers: (builder) =>
    builder
      //getAllConvention
      .addCase(getAllConvention.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.conversationPaging = {
          pageIndex: action.meta.arg.offset || 0,
          pageSize: action.meta.arg.count || 20,
        };
      })
      .addCase(
        getAllConvention.fulfilled,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: PayloadAction<any[]>) => {
          if (action.payload.length > 0) {
            const conversationNew = action.payload.filter((item) =>
              isConversation(item["t"]) ? item : undefined,
            );
            const userOnlinePageNew = action.payload.filter((item) =>
              !isConversation(item["t"]) ? item : undefined,
            );

            state.convention = [...state.convention, ...conversationNew];
            state.userOnlinePage = [
              ...state.userOnlinePage,
              ...userOnlinePageNew,
            ];
          }
          state.status = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getAllConvention.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.conversationPaging.pageIndex =
          state.conversationPaging.pageIndex -
            state.conversationPaging.pageSize ===
          0
            ? 0
            : state.conversationPaging.pageIndex -
              state.conversationPaging.pageSize;
        state.conversationPaging.pageSize = state.conversationPaging.pageSize;
      })
      // getLatestMessages
      .addCase(getLatestMessages.pending, (state, action) => {
        state.messageStatus = DataStatus.LOADING;
        state.messagePaging = {
          pageIndex: action.meta.arg.offset || 0,
          pageSize: action.meta.arg.count || 20,
        };
      })
      .addCase(
        getLatestMessages.fulfilled,
        (state, action: PayloadAction<MessageInfo[]>) => {
          if (action.payload.length > 0) {
            const messageOld = action.payload.reverse();
            state.messageInfo = [...messageOld, ...state.messageInfo];
          }
          state.messageStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getLatestMessages.rejected, (state, action) => {
        state.messageStatus = DataStatus.FAILED;
        state.messagePaging.pageIndex =
          state.messagePaging.pageIndex - state.messagePaging.pageSize === 0
            ? 0
            : state.messagePaging.pageIndex - state.messagePaging.pageSize;
        state.messagePaging.pageSize = state.messagePaging.pageSize;
      })
      // sendMessages
      .addCase(sendMessages.pending, (state, action) => {
        state.stateSendMessage.status = DataStatus.LOADING;
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.stateSendMessage.status = DataStatus.SUCCEEDED;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.stateSendMessage.status = DataStatus.FAILED;
      })
      // getPartnerInfoById
      .addCase(getUserInfoById.pending, (state, action) => {
        state.partnerInfoStatus = DataStatus.LOADING;
      })
      .addCase(
        getUserInfoById.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.partnerInfo = action.payload || null;
          state.partnerInfoStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getUserInfoById.rejected, (state, action) => {
        state.partnerInfo = null;
        state.partnerInfoStatus = DataStatus.FAILED;
      })
      // getChatUrls
      .addCase(getChatUrls.pending, (state) => {
        state.chatLinksStatus = DataStatus.LOADING;
      })
      .addCase(
        getChatUrls.fulfilled,
        (state, action: PayloadAction<{ links: ChatLinkType[] }>) => {
          state.chatLinks = action.payload.links;
          state.chatLinksStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getChatUrls.rejected, (state, action) => {
        state.chatLinksStatus = DataStatus.FAILED;
      })
      // createDirectMessageGroup
      .addCase(createDirectMessageGroup.pending, (state, action) => {
        state.createGroupStatus = DataStatus.LOADING;
      })
      .addCase(
        createDirectMessageGroup.fulfilled,
        (state, action: PayloadAction<ChatGroup>) => {
          state.newGroupData = action.payload;
          state.createGroupStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(createDirectMessageGroup.rejected, (state, action) => {
        state.newGroupData = {};
        state.createGroupStatus = DataStatus.FAILED;
      })
      // addMembersToDirectMessageGroup
      .addCase(addMembersToDirectMessageGroup.pending, (state, action) => {
        state.addMembers2GroupStatus = DataStatus.LOADING;
      })
      .addCase(
        addMembersToDirectMessageGroup.fulfilled,
        (state, action: PayloadAction<ChatGroup>) => {
          state.addMembers2GroupStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(addMembersToDirectMessageGroup.rejected, (state, action) => {
        state.addMembers2GroupStatus = DataStatus.FAILED;
      })
      // leftDirectMessageGroup
      .addCase(leftDirectMessageGroup.pending, (state, action) => {
        state.leftGroupStatus = DataStatus.LOADING;
      })
      .addCase(
        leftDirectMessageGroup.fulfilled,
        (state, action: PayloadAction<ChatGroup>) => {
          state.leftGroupStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(leftDirectMessageGroup.rejected, (state, action) => {
        state.leftGroupStatus = DataStatus.FAILED;
      })
      // groupMembers
      .addCase(
        fetchGroupMembers.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.groupMembers = action.payload;
        },
      )
      .addCase(getChatRoomFile.pending, (state) => {
        state.mediaListStatus = DataStatus.LOADING;
      })
      // getChatAttachments
      .addCase(
        getChatAttachments.fulfilled,
        (state, action: PayloadAction<MediaResponse<MediaType>>) => {
          state.leftGroupStatus = DataStatus.SUCCEEDED;
          state.mediaList = action.payload.files;
          state.mediaListStatus = DataStatus.SUCCEEDED;
        },
      )
      // deleteConversation
      .addCase(deleteConversation.pending, (state, action) => {
        state.deleteConversationStatus = DataStatus.LOADING;
      })
      .addCase(
        deleteConversation.fulfilled,
        (state, action: PayloadAction<ChatGroup>) => {
          state.deleteConversationStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(deleteConversation.rejected, (state, action) => {
        state.deleteConversationStatus = DataStatus.FAILED;
      }),
});

export const {
  reset,
  setStep,
  setRoomId,
  setMessage,
  setConversationInfo,
  setTypeList,
  setDataTransfer,
  setStateSendMessage,
  setLastMessage,
  clearConversation,
  clearMessageList,
} = chatSlice.actions;

export default chatSlice.reducer;
