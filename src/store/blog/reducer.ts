import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogData, BlogFormData, CommentBlogData, createBlogComment, createNewBlogs, deleteBlog, getAllBlogs, getBlogBySlug, getBlogComments, getRelatedBlog } from "./actions";
import { DataStatus } from "constant/enums";
import { PagingItem } from "constant/types";
import { GetBlogCategoryListQueries } from "store/blog-category/actions";
import { AN_ERROR_TRY_AGAIN, DEFAULT_PAGING, DEFAULT_PAGING_ITEM } from "constant/index";
import { getFiltersFromQueries } from "utils/index";

export interface CategoryBlog {
    id: string;
    name: string;
    slug: string;
    detail?: string;
}
export interface CategoryBlogDataForm {
    name: string;
    slug: string;
    detail?: string;
}

export interface BlogState {
    blogs: BlogData[];
    blogsStatus: DataStatus;
    blogsPaging: PagingItem;
    blogsError?: string;
    blogsFilters: Omit<GetBlogCategoryListQueries, "page" | "size">;
    blog?: BlogData,
    relatedBlogs: BlogData[],
    listBlogComment: CommentBlogData[],
}
type BlogStatistic = {
    searchKey?: string | undefined;
};

const initialState: BlogState = {
    blogs: [],
    blogsStatus: DataStatus.IDLE,
    blogsPaging: DEFAULT_PAGING_ITEM,
    blogsFilters: {},
    relatedBlogs: [],
    listBlogComment: [],
}

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers(builder) {
        builder.addCase(
            getAllBlogs.pending, (state, action) => {
                state.blogsStatus = DataStatus.LOADING;
                state.blogsFilters = getFiltersFromQueries(action.meta.arg);
                state.blogsPaging.page = Number(
                    action.meta.arg.page ?? DEFAULT_PAGING_ITEM.page,
                );
                state.blogsPaging.size = Number(
                    action.meta.arg.size ?? DEFAULT_PAGING_ITEM.size,
                );
            }
        ).addCase(getAllBlogs.fulfilled, (state, { payload }) => {
            const { ...paging } = { page: payload.data.page, size: payload.data.size, total_page: payload.data.total_page, totalItems: payload.data.size };
            state.blogs = payload.data.data;
            state.blogsStatus = DataStatus.SUCCEEDED;
            state.blogsError = undefined;
            state.blogsPaging = Object.assign(state.blogsPaging, paging);
        })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.blogsStatus = DataStatus.FAILED;
                state.blogsError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
            }).addCase(createNewBlogs.fulfilled, (state, action: PayloadAction<BlogFormData>) => {
                state.blogsStatus = DataStatus.SUCCEEDED;
            }).addCase(getBlogBySlug.fulfilled, (state, action: PayloadAction<BlogData>) => {
                    state.blog = action.payload;
            }).addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string[]>) => {
                const deletedIds = action.payload;
                deletedIds.forEach((deletedId) => {
                  const indexDeleted = state.blogs.findIndex((item) => item.slug === deletedId);
                  if (indexDeleted !== -1) {
                    state.blogs.splice(indexDeleted, 1);
                  }
                });
              })
              .addCase(deleteBlog.rejected, (state, action) => {
                state.blogsStatus = DataStatus.FAILED;
                state.blogsError = action.error?.message ?? AN_ERROR_TRY_AGAIN;
              });
      },
    },
);
export const { reset } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
export default blogSlice.reducer;