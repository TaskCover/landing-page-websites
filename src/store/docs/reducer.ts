/* eslint-disable no-var */
"use client"

import { addPage } from './actions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataStatus } from 'constant/enums';
import { DEFAULT_PAGING } from 'constant/index';
import { ItemDocsProps } from 'components/sn-docs/detail/LeftSlide/ItemDocs';
import { Paging } from 'constant/types';
import { Position } from 'store/company/reducer';
import { clientStorage } from 'utils/storage';
/* eslint-disable @typescript-eslint/no-explicit-any */ 

export type PageSettingsType = {
  font: string;
  smallText: boolean;
  fullWidth: boolean;
  lock: boolean;
};

export type CoverPictureType = {
  url: string;
  verticalPosition: number;
};

const storedPageInfo : any = null
const storedWorkspaceInfo : any = null




export type PageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
  createdAt: Date;
};

export interface WorkspaceState {
  id: string;
  name: string;
  icon: string;
  members: string[];
  pages: PageType[];
}

export type ContentType = {
  type: string;
  content: unknown[];
};

export interface PageState {
  id: string;
  reference: string;
  title: string;
  icon: string;
  coverPicture: CoverPictureType;
  content: any;
  favorite: string[];
  pageSettings: PageSettingsType;
  path: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt?: Date;
}

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
  };
  pageInfo : PageState | null;
  workspaceInfo: WorkspaceState | null
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
  },
  pageInfo :  storedPageInfo ? JSON.parse(storedPageInfo) : null,
  workspaceInfo: storedWorkspaceInfo ? JSON.parse(storedWorkspaceInfo) : null,
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
      },
      setPage: (state, action: PayloadAction<PageState>) => {
        state.pageInfo = action.payload;
        localStorage.setItem("pageInfo", JSON.stringify(action.payload));
      },
      clearPage: (state) => {
        state.pageInfo = null;
        localStorage.removeItem("pageInfo");
      },
      setWorkspace: (state, action: PayloadAction<WorkspaceState>) => {
        state.workspaceInfo = action.payload;
        localStorage.setItem("workspaceInfo", JSON.stringify(action.payload));
      },
      clearWorkspace: (state) => {
        state.workspaceInfo = null;
        localStorage.removeItem("workspaceInfo");
      },
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


export const {createPage ,clearPage ,setPage , setWorkspace , clearWorkspace} = docSlice.actions

export default docSlice.reducer;