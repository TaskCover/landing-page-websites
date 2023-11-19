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
    attachments_down?: AttachmentsBlogs[] |undefined,
    created_time?: Date,
    created_by?: CreateByUser,
    ignoredId?: string,
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
    attachmentsUpload?: File[] |[];
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
    email:string;
    created_time: Date;
    reply_to : string;
    post_slug : string;
    replies?: CommentBlogData[];
    avatar : string,
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
      console.log("Token:", Token);
  
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
  
        console.log("Response:", response);
        console.log("Response Data:", JSON.stringify(response.data));
  
        if (response?.status === HttpStatusCode.CREATED) {
          window.location.assign('/blogs');
          return response.data;
        }
        console.log("Request Payload:", response);
  
        throw AN_ERROR_TRY_AGAIN;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  );
  
// function getFileExtension(fileName: string): string {
//     const dotIndex = fileName.lastIndexOf('.');
//     return dotIndex === -1 ? '' : fileName.slice(dotIndex + 1);
//   }
  
//   export async function getFileData(data: any): Promise<FileResponse> {
//     var url = `${FILE_API_GET_URL||"http://103.196.145.232:6807/api/v1"}${Endpoint.UPLOAD_LINK}/${data.file.name}?type=image/${getFileExtension(data.file.name)}`;
//     const additionalHeaders: Record<string, string> = {
//         'token': `${data.token}`,
//         // Add other headers as needed
//     };
//     const headers: AxiosRequestConfig['headers'] = {
//         'Authorization': `Bearer ${data.token}`,
//         'Content-Type': 'application/json',
//         ...additionalHeaders, // Add additional headers
//     };
//     try {
//         const response = await axios.get(url, { headers });
//         return response.data as FileResponse;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Failed to fetch budget data');
//     }
//   }

export const updateBlog = createAsyncThunk("blogs/updateBlog",
    async ({ id, blog }: { id: string, blog: BlogData }) => {
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
            const response = await client.get(Endpoint.BLOGS + "/"+id,{}, {
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


export const getRelatedBlog =  createAsyncThunk(
    "blogs/getRelatedBlog", async(id:string)=>{
        try{
            const response = await client.get(Endpoint.BLOGS + "/"+id +"/related",{}, {
                baseURL: BLOG_API_URL,
            });
            if (response?.status === HttpStatusCode.OK) {
                return response.data;
            }
            throw AN_ERROR_TRY_AGAIN;
        }catch (error){
            throw error;
        }
    }
);

export const getBlogComments =  createAsyncThunk(
    "blogs/getBlogComments",async(id:string)=>{
        const response = await client.get(Endpoint.BLOGS + "/"+id +"/comment",{}, {
            baseURL: BLOG_API_URL,
        });
        if (response?.status === HttpStatusCode.OK) {
            return response.data;
        }
        throw AN_ERROR_TRY_AGAIN;
    }
)

export const createBlogComment =  createAsyncThunk(
    "blogs/createBlogComment", async ({ id, cmt,Token }: { id: string, cmt: CommentBlogData, Token: string | undefined | null }) => {
        try {
            const response = await client.post(Endpoint.BLOGS + "/"+id +"/comment", cmt, {
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
    async ({file }: { file: File }) => {
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
  