import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllConvention, getLatestMessages } from "./actions";
import { DataStatus } from "constant/enums";
import { DEFAULT_PAGING } from "constant/index";
import { ChatItemInfo, ChatState, MessageInfo, STEP } from "./type";

const initialState: ChatState = {
  convention: [],
  status: DataStatus.IDLE,
  conversationPaging: DEFAULT_PAGING,

  roomId: "",
  currStep: STEP.CONVENTION,
  prevStep: STEP.CONVENTION,

  messageInfo: [],
  messageStatus: DataStatus.IDLE,
  messagePaging: DEFAULT_PAGING,
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
        (state, action: PayloadAction<ChatItemInfo[]>) => {
          state.convention = action.payload;
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
          state.messageInfo = action.payload;
          state.messageStatus = DataStatus.SUCCEEDED;
        },
      )
      .addCase(getLatestMessages.rejected, (state, action) => {
        state.messageInfo = [];
        state.messageStatus = DataStatus.FAILED;
      }),
});

export const { reset, setStep, setRoomId } = chatSlice.actions;

export default chatSlice.reducer;
