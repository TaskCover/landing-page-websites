import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import { BlogForm } from "components/sn-blogs/components/Form";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, BLOG_API_URL } from "constant/index";
import { BaseQueries, BaseQueries_Feedback } from "constant/types";
import { Category } from "store/blog-category/reducer";
import { refactorRawItemListResponse, serverQueries } from "utils/index";

export enum BlogStatus {
    PUBLISHED = "true",
    DRAFT = "false" // NHA,
}
export type AttachmentsBlogs = {
    object?: string;
    name?: string;
    link?: string;
}

export type CreateByUser = {
    id?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    is_active?: boolean,
    created_time?: Date,
    status?: number,
    avatar?: AttachmentsBlogs
}

export type BlogData = {
    id?: string;
    title?: string;
    content?: string;
    background?: AttachmentsBlogs | undefined;
    published?: boolean;
    category?: Category[];
    tag?: string[];
    slug?: string,
    attachments?: AttachmentsBlogs[] |undefined,
    created_time?: Date,
    created_by?: CreateByUser,
}
export type GetBlogListQueries = BaseQueries_Feedback & {
    searchKey?: string;
    published?: boolean;
};


export const getAllBlogs = createAsyncThunk(
    "blogs/getAllBlogs",
    async ({ ...queries }: GetBlogListQueries) => {
        try {
            const response = await client.get(Endpoint.BLOGS, queries, {
                baseURL: BLOG_API_URL,
            });
            if (response?.status === HttpStatusCode.OK) {
                return response.data;
            }
            throw AN_ERROR_TRY_AGAIN;
        } catch (error) {
            throw error;
        }
    },
);

export const createNewBlogs = createAsyncThunk(
    "blogs/createNewBlogs", async (blog: BlogForm) => {
        try {
            const response = await client.post(Endpoint.BLOGS, blog, { baseURL: BLOG_API_URL });
            if (response?.status === HttpStatusCode.CREATED) {
                return response.data;
            }
            throw AN_ERROR_TRY_AGAIN;
        } catch (error) {
            throw error;
        }
    }
)

export const updateBlog = createAsyncThunk("blogs/updateBlog",
    async ({ id, blog }: { id: string, blog: BlogForm }) => {
        try {
            const response = await client.put(Endpoint.BLOGS + "/" + id,
                blog,
                {
                    baseURL: BLOG_API_URL,
                });
            if (response?.status === HttpStatusCode.CREATED) {
                return response.data?.id ? response.data : response.data?.body;
            }
            throw AN_ERROR_TRY_AGAIN;
        } catch (error) {
            throw error;
        }
    }
);

export const getBlogBySlug = createAsyncThunk(
    "blogs/getBlogBySlug", async (id: string) => {
        try {
            const response = await client.get(Endpoint.BLOGS, id, {
                baseURL: BLOG_API_URL,
            });
            if (response?.status === HttpStatusCode.OK) {
                return response.data;
            }
            throw AN_ERROR_TRY_AGAIN;
        } catch (error) {
            throw error;
        }
    }
);
