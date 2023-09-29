/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemDocsProps } from "components/sn-docs/detail/LeftSlide/ItemDocs";
import { DataStatus } from "constant/enums";
import { DEFAULT_PAGING } from "constant/index";
import { Paging } from "constant/types";
import { Position } from "store/company/reducer";
import { addPage } from "./actions";

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

  docDetails : {
    info: {}
    data: ItemDocsProps
  }
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

  docDetails : {
    info: {},
    data: {
      title: "Page",
      content: {
        title: "",
        content: "",
      },
      children: [
        {
          id: '1',
          title: "page 1",
          content: {
            title: "",
            content: "",
          },
          children: [
            {
              id: '1.1',
              title: "page 1.1",
              content: {
                title: "",
                content: "",
              },
              children: [],
            },
          ],
        },
        {
          id: '2',
          title: "page 2",
          content: {
            title: "",
            content: "",
          },
          children: [],
        }],
    }
  }
}

const docSlice = createSlice({
    name: "docs",
    initialState,
    reducers: {
      createPage(state , actions) {
        const { parentId, child } = actions.payload;
        function addChildToParent(parent, childToAdd) {
          if (parent.id === parentId) {
            parent.children.push(childToAdd);
          } else if (parent.children) {
            parent.children.forEach((child) => {
              addChildToParent(child, childToAdd);
            });
          }
        }

        addChildToParent(state, child);
      }
    },
    extraReducers: (builder) => {
      builder.addCase(addChild.fulfilled, (state, action) => {
        const { parentId, child } = action.payload;
        
        function addChildToParent(parent, childToAdd) {
          if (parent.id === parentId) {
            parent.children.push(childToAdd);
          } else if (parent.children) {
            parent.children.forEach((child) => {
              addChildToParent(child, childToAdd);
            });
          }
        }
        
        addChildToParent(state, child);
      });
    },
});
export const addChild = createAsyncThunk('data/addChild', async ({ parentId, child } : {parentId : string, child : any }) => {

  return { parentId, child };
});


export const {createPage} = docSlice.actions

export default docSlice.reducer;