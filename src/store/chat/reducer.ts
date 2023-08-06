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
  searchChatText,
  getUnreadMessages,
} from "./actions";
import { DataStatus } from "constant/enums";
import {
  ChatGroup,
  ChatState,
  MessageInfo,
  MessageSearchInfo,
  UnReadMessageInfo,
  STEP,
  TYPE_LIST,
  UserInfo,
} from "./type";
import { getChatRoomFile, getChatUrls } from "./media/actionMedia";
import { ChatLinkType, MediaResponse, MediaType } from "./media/typeMedia";

const initalPage = { pageIndex: 0, pageSize: 10, isRefetchPage: false };
const initialState: ChatState = {
  convention: [],
  status: DataStatus.IDLE,
  conversationPaging: initalPage,
  roomId: "",
  conversationInfo: null,
  currStep: STEP.CONVENTION,
  prevStep: STEP.CONVENTION,
  messageInfo: [],
  messageStatus: DataStatus.IDLE,
  messagePaging: initalPage,
  //Partner Infomation
  partnerInfo: null,
  partnerInfoStatus: DataStatus.IDLE,
  //chatLinks
  chatLinks: [],
  chatLinksStatus: DataStatus.IDLE,
  //ListSearchConversation
  listSearchMessage: [],
  statusListSearchMessage: DataStatus.IDLE,
  //media list
  mediaList: [],
  mediaListStatus: DataStatus.IDLE,
  //stateSendMessage
  stateSendMessage: {
    filePreview: null,
    status: DataStatus.IDLE,
  },
  stateSearchMessage: null,
  unReadMessage: null,
  statusUnReadMessage: DataStatus.IDLE,

  newGroupData: {},
  createGroupStatus: DataStatus.IDLE,
  addMembers2GroupStatus: DataStatus.IDLE,
  leftGroupStatus: DataStatus.IDLE,
  removeMemberGroupStatus: DataStatus.IDLE,
  typeList: TYPE_LIST.MEDIA_LIST,
  groupMembers: [],
  chatAttachments: [],
  deleteConversationStatus: DataStatus.IDLE,
  dataTransfer: {},
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
      console.log("action.payload", action.payload);

      state.dataTransfer = action.payload;
    },
    setConversationInfo: (state, action) => {
      state.conversationInfo = action.payload;
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
    setStateSearchMessage: (
      state,
      action: PayloadAction<MessageSearchInfo | null>,
    ) => {
      state.messagePaging.pageIndex = 0;
      state.messagePaging.pageSize = (action.payload?.offset || 0) + 10;
      state.stateSearchMessage = action.payload;
      state.messageInfo = [];
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
          ...state.conversationPaging,
          pageIndex: action.meta.arg.offset || 0,
          pageSize: action.meta.arg.count || 20,
        };
      })
      .addCase(
        getAllConvention.fulfilled,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: PayloadAction<any[]>) => {
          if (
            action.payload.length > 0 &&
            !state.conversationPaging.isRefetchPage
          ) {
            const conversationNew = action.payload.filter((item) =>
              isConversation(item["t"]) ? item : undefined,
            );
            state.convention = [...state.convention, ...conversationNew];
          }
          if (action.payload?.length < state.conversationPaging.pageSize) {
            state.conversationPaging.pageIndex =
              state.conversationPaging.pageIndex -
              state.conversationPaging.pageSize +
              action.payload?.length;
            state.conversationPaging.isRefetchPage = true;
          } else {
            state.conversationPaging.isRefetchPage = false;
          }
          state.conversationPaging.pageSize = state.conversationPaging.pageSize;
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
          ...state.messagePaging,
          pageIndex: action.meta.arg.offset || 0,
          pageSize: action.meta.arg.count || 20,
        };
      })
      .addCase(
        getLatestMessages.fulfilled,
        (state, action: PayloadAction<MessageInfo[]>) => {
          if (action.payload.length > 0 && !state.messagePaging.isRefetchPage) {
            const messageNew = action.payload.reverse();
            /* The above code is checking if the last element of the `action.payload` array has the
            same `rid` value as the last element of the `state.messageInfo` array. If they have the
            same `rid` value, it appends the `messageNew` array to the `state.messageInfo` array.
            Otherwise, it assigns the `messageNew` array to the `state.messageInfo` array. 
            
            - Fix bug duplicate messages when switch from single chat to group chat */
            if ([...action?.payload]?.pop()?.rid == [...state?.messageInfo]?.pop()?.rid) {
              state.messageInfo = [...messageNew, ...state.messageInfo];
            } else {
              state.messageInfo = messageNew;
            }
          }
          if (action.payload?.length < state.messagePaging.pageSize) {
            state.messagePaging.pageIndex =
              state.messagePaging.pageIndex -
              state.messagePaging.pageSize +
              action.payload?.length;
            state.messagePaging.isRefetchPage = true;
          } else {
            state.messagePaging.isRefetchPage = false;
          }
          state.messagePaging.pageSize = state.messagePaging.pageSize;
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
        state.messagePaging.isRefetchPage = false;
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
      //searchChatText
      .addCase(searchChatText.pending, (state) => {
        state.statusListSearchMessage = DataStatus.LOADING;
      })
      .addCase(
        searchChatText.fulfilled,
        (state, action: PayloadAction<{ matches: MessageSearchInfo[] }>) => {
          state.listSearchMessage = action.payload.matches;
          state.statusListSearchMessage = DataStatus.SUCCEEDED;
        },
      )
      .addCase(searchChatText.rejected, (state, action) => {
        state.statusListSearchMessage = DataStatus.FAILED;
      })
      // getUnreadMessages
      .addCase(getUnreadMessages.pending, (state) => {
        state.statusUnReadMessage = DataStatus.LOADING;
      })
      .addCase(
        getUnreadMessages.fulfilled,
        (state, action: PayloadAction<UnReadMessageInfo>) => {
          state.unReadMessage = action.payload;
          // state.unReadMessage = {
          //   roomId: "ddwqCMbfrpzXBWPSZkR3oGad8C6wF3wwPk",
          //   unreadCount: 6,
          //   unreadsFrom: "2023-07-30T10:56:06.349Z",
          //   success: true,
          // };
          state.statusUnReadMessage = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getUnreadMessages.rejected, (state, action) => {
        state.statusUnReadMessage = DataStatus.FAILED;
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
  setStateSearchMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
