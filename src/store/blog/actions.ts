import { createAsyncThunk } from "@reduxjs/toolkit";
import { Endpoint, client } from "api";
import axios, { AxiosRequestConfig } from "axios";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, BLOG_API_URL, UPLOAD_API_URL } from "constant/index";
import { BaseQueries, BaseQueries_Feedback } from "constant/types";
import { type } from "os";
import { config } from "process";
import { Category } from "store/blog-category/reducer";
import { refactorRawItemListResponse, serverQueries } from "utils/index";
import { string } from "yup";

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
  background_down?: AttachmentsBlogs | undefined;
  published?: boolean;
  category?: Category[];
  tag?: string[];
  slug?: string,
  attachments_down?: AttachmentsBlogs[] | undefined,
  created_time?: Date,
  created_by?: CreateByUser,
  ignoredId?: string,
  categories?: Category[],
};


export type BlogFormData = {
  id?: string;
  title?: string;
  content?: string;
  published?: boolean;
  category?: string[]; // Use union type with undefined
  tag?: string[] | undefined; // Use union type with undefined
  slug?: string | undefined;
  created_by?: CreateByUser | undefined;
  ignoredId?: string | undefined;
  backgroundUpload?: File;
  background?: string;
  attachments?: string[];
  attachmentsUpload?: File[] | [];
}
export type BlogSubmitData = {
  title?: string;
  content?: string;
  published?: boolean;
  category?: string[]; // Use union type with undefined
  tag?: string[] | undefined; // Use union type with undefined
  slug?: string | undefined;
  attachments?: string[];
}
export type GetBlogListQueries = BaseQueries_Feedback & {
  searchKey?: string;
  published?: boolean;
};
// export type FileResponse ={
//     object:string;
//     download:string;
//     upload:string;
// }
export type CommentBlogData = {
  id: string;
  content: string;
  name: string;
  email: string;
  created_time: Date;
  reply_to: string;
  post_slug: string;
  replies?: CommentBlogData[];
  avatar: string,
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
  "blogs/createNewBlogs",
  async ({ data, Token }: { data: BlogFormData; Token: string | null }) => {
    try {
      console.log("Request Payload:", JSON.stringify(data));

      const response = await client.post(Endpoint.BLOGS, data, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Token}`,
        },
        baseURL: BLOG_API_URL,
      });

      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);

export const updateBlog = createAsyncThunk("blogs/updateBlog",
  async ({ id, blog,Token }: { id: string, blog: BlogFormData, Token: string | undefined | null}) => {
    try {
      console.log("Request Payload:", JSON.stringify(blog));
      const response = await client.put(Endpoint.BLOGS + "/" + id, blog, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Token}`,
        },
        baseURL: BLOG_API_URL,
      });
      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);


export const getBlogBySlug = createAsyncThunk(
  "blogs/getBlogBySlug", async (id: string) => {
    try {
      const response = await client.get(Endpoint.BLOGS + "/" + id, {}, {
        baseURL: BLOG_API_URL,
      });
      if (response?.status === HttpStatusCode.OK) {
        return response.data[0];
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  }
);


export const getRelatedBlog = createAsyncThunk(
  "blogs/getRelatedBlog", async (id: string) => {
    try {
      const response = await client.get(Endpoint.BLOGS + "/" + id + "/related", {}, {
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

export const getBlogComments = createAsyncThunk(
  "blogs/getBlogComments", async (id: string) => {
    console.log("id " + id);
    const response = await client.get(Endpoint.BLOGS + "/" + id + "/comment", {}, {
      baseURL: BLOG_API_URL,
    });
    if (response?.status === HttpStatusCode.OK) {
      return response.data;
    }
    throw AN_ERROR_TRY_AGAIN;
  }
)

export const createBlogComment = createAsyncThunk(
  "blogs/createBlogComment", async ({ id, cmt, Token }: { id: string, cmt: CommentBlogData, Token: string | undefined | null }) => {
    try {
      const response = await client.post(Endpoint.BLOGS + "/" + id + "/comment", cmt, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `${Token}`,
        baseURL: BLOG_API_URL,
      },);
      if (response?.status === HttpStatusCode.CREATED) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  }
)


export const uploadFile = createAsyncThunk(
  "blogs/uploadFiles",
  async ({ file }: { file: File }) => {
    try {
      let response = await client.get(
        `${Endpoint.UPLOAD_LINK}/${file.name}`,
        { type: file.type },
        {
          baseURL: UPLOAD_API_URL,
        },
      );
      if (response?.status === HttpStatusCode.OK) {
        const fileUpload = response.data;
        response = await client.put(response.data.upload, file);
        if (response?.status === HttpStatusCode.OK) {
          return { ...fileUpload, type: file.type, title: file.name };
        }
        throw AN_ERROR_TRY_AGAIN;
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      throw error;
    }
  },
);


export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async ({ ids, Token }: { ids: string[], Token: string | undefined | null }) => {
    try {
      ids.forEach(async element => {
        const response = await client.delete(
          Endpoint.BLOGS + "/" + element, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          Authorization: `${Token}`,
          baseURL: BLOG_API_URL,
        });
        console.log(JSON.stringify(response));
        if (response?.status !== HttpStatusCode.OK) {
          throw AN_ERROR_TRY_AGAIN;
        }
      });
      return ids;
    } catch (error) {
      throw error;
    }
  },
);
// Update published
export const updatePublished = createAsyncThunk(
  'blogs/updatePublished',
  async ({ blogList, published, Token }: { blogList: BlogData[]; published: boolean; Token: string | undefined | null }) => {
    try {
      const promises = blogList.map(async (element) => {
        const item = {
          content: element.content,
          background: element.background_down?.object,
          slug: element.slug,
          published: published,
          title: element.title,
          tag: element.tag,
          attachments: element.attachments_down?.map(att => att.object),
          category: element.categories?.map(cate => cate.id),
        } as BlogFormData
        const response = await client.put(
          `${Endpoint.BLOGS}/${element.id}`,
          item,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${Token}`,
            },
            baseURL: BLOG_API_URL,
          }
        );
        if (response?.status !== HttpStatusCode.CREATED) {
          throw AN_ERROR_TRY_AGAIN;
        }
        return response.data;
      });
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw error;
    }
  }
);