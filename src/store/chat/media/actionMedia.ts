import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api";
import { HttpStatusCode } from "constant/enums";
import {
  AN_ERROR_TRY_AGAIN,
  AUTH_API_URL,
  CHAT_API_URL,
  UPLOAD_API_URL,
} from "constant/index";
import { ChatUrlsQueryParam } from "./typeMedia";

export const getChatUrls = createAsyncThunk(
  "chat/getChatUrls",
  async (params: ChatUrlsQueryParam) => {
    try {
      const response = await client.post("getChatUrls", params, {
        baseURL: CHAT_API_URL,
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

export const uploadFile = async (endpoint: string, file: File) => {
  try {
    let response = await client.get(
      `${endpoint}/${file.name}`,
      { type: file.type },
      {
        baseURL: UPLOAD_API_URL,
      },
    );

    console.log(response);

    if (response?.status === HttpStatusCode.OK) {
      const urlUpload = response.data.object;
      response = await client.put(response.data.upload, file);
      console.log("response", response);

      if (response?.status === HttpStatusCode.OK) {
        return urlUpload;
      }
      throw AN_ERROR_TRY_AGAIN;
    } else {
      throw AN_ERROR_TRY_AGAIN;
    }
  } catch (error) {
    throw error;
  }
};
