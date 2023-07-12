import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllConvention } from "./actions";
import { DataStatus } from "constant/enums";
import { DEFAULT_PAGING } from "constant/index";
import { ChatItemInfo, ChatState, STEP } from "./type";

const initialState: ChatState = {
  convention: [],
  status: DataStatus.IDLE,
  paging: DEFAULT_PAGING,

  roomId: "",
  currStep: STEP.CONVENTION,
  prevStep: STEP.CONVENTION,
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
      .addCase(getAllConvention.pending, (state, action) => {
        state.status = DataStatus.LOADING;
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
      }),
});

export const { reset, setStep, setRoomId } = chatSlice.actions;

export default chatSlice.reducer;
