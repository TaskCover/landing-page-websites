/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataStatus } from "constant/enums";
import { DEFAULT_PAGING } from "constant/index";
import { Paging } from "constant/types";
import { Position } from "store/company/reducer";

export interface IDocs {
  docs: any[];
  docsStatus: DataStatus;
  docsPaging: Paging;
  docsError?: string;
  docsFilters: Omit<unknown, "pageIndex" | "pageSize">;
  
  docOptions: any[];
  docOptionsStatus: DataStatus;
  docOptionsPaging: Paging;
  docOptionsError?: string;
  docOptionsFilters: Omit<
    any,
    "pageIndex" | "pageSize"
  >;
}

  
const initialState: IDocs = {
  docs: [],
  docsStatus: DataStatus.IDLE,
  docsPaging: DEFAULT_PAGING,
  docsFilters: {},

  docOptions: [],
  docOptionsStatus: DataStatus.IDLE,
  docOptionsPaging: DEFAULT_PAGING,
  docOptionsFilters: {},
}

const docSlice = createSlice({
    name: "docs",
    initialState,
    reducers: {},
});
  
  export default docSlice.reducer;