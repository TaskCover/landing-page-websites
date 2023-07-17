/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addMembersToDirectMessageGroup,
  createDirectMessageGroup,
  getAllConvention,
  getLatestMessages,
  leftDirectMessageGroup,
  fetchGroupMembers,
  getChatAttachments
} from "./actions";
import { DataStatus } from "constant/enums";
import { DEFAULT_PAGING } from "constant/index";
import {
  ChatGroup,
  ChatItemInfo,
  ChatState,
  MessageInfo,
  SetStepAction,
  STEP,
  TYPE_LIST,
} from "./type";

const initialState: ChatState = {
  convention: [],
  status: DataStatus.IDLE,
  conversationPaging: DEFAULT_PAGING,
  userOnlinePage: [],
  roomId: "",
  userPartner: null,
  currStep: STEP.CONVENTION,
  prevStep: STEP.CONVENTION,
  backFallStep: STEP.IDLE,
  messageInfo: [],
  messageStatus: DataStatus.IDLE,
  messagePaging: DEFAULT_PAGING,
  newGroupData: {},
  createGroupStatus: DataStatus.IDLE,
  addMembers2GroupStatus: DataStatus.IDLE,
  leftGroupStatus: DataStatus.IDLE,
  removeMemberGroupStatus: DataStatus.IDLE,
  typeList: TYPE_LIST.MEDIA_LIST,
  groupMembers: [],
  chatAttachments: [],
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
    setUserPartner: (state, action) => {
      console.log(action.payload);

      const user = state.userOnlinePage?.find(
        (item) => item.username === action.payload,
      );
      state.userPartner = user || null;
    },
    setMessage: (state, action) => {
      state.messageInfo.push(action.payload);
    },
    clearConversation: (state) => {
      state.convention = [];
    },
    clearMessageList: (state) => {
      state.messageInfo = [];
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
            state.convention = action.payload.filter((item) =>
              isConversation(item["t"]) ? item : undefined,
            );
            state.userOnlinePage = action.payload.filter((item) =>
              !isConversation(item["t"]) ? item : undefined,
            );
          }
          state.status = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getAllConvention.rejected, (state, action) => {
        state.convention = [];
        state.status = DataStatus.FAILED;
      })
      // getLatestMessages
      .addCase(getLatestMessages.pending, (state, action) => {
        state.messageStatus = DataStatus.LOADING;
      })
      .addCase(
        getLatestMessages.fulfilled,
        (state, action: PayloadAction<MessageInfo[]>) => {
          if (action.payload.length > 0) {
            state.messageInfo = action.payload.reverse();
          }
          state.messageStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getLatestMessages.rejected, (state, action) => {
        state.messageInfo = [];
        state.messageStatus = DataStatus.FAILED;
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
      // getChatAttachments
      .addCase(
        getChatAttachments.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.leftGroupStatus = DataStatus.SUCCEEDED;
        },
      ),
});

export const {
  reset,
  setStep,
  setRoomId,
  setMessage,
  setUserPartner,
  setTypeList,
  clearConversation,
  clearMessageList,
} = chatSlice.actions;

export default chatSlice.reducer;
