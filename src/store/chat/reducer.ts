import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDirectMessageGroup, getAllConvention, getLatestMessages } from "./actions";
import { DataStatus } from "constant/enums";
import { DEFAULT_PAGING } from "constant/index";
import {
  ChatGroup,
  ChatItemInfo,
  ChatState,
  MessageInfo,
  STEP
} from "./type";

const initialState: ChatState = {
  convention: [],
  status: DataStatus.IDLE,
  conversationPaging: DEFAULT_PAGING,

  userOnlinePage: [],

  roomId: "",
  currStep: STEP.CONVENTION,
  prevStep: STEP.CONVENTION,

  messageInfo: [],
  messageStatus: DataStatus.IDLE,
  messagePaging: DEFAULT_PAGING,
  newGroupData: {},
  createGroupStatus: DataStatus.IDLE,
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
      state.prevStep = state.currStep;
      state.currStep = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
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
      }),
});

export const { reset, setStep, setRoomId } = chatSlice.actions;

export default chatSlice.reducer;
