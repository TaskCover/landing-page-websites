import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, CHAT_API_URL } from "constant/index";
import { ChatConventionItemRequest } from "./type";

export const getAllConvention = createAsyncThunk(
  "chat/getAllConvention",
  async (paramReq: ChatConventionItemRequest) => {
    try {
      const response = await client.post("getAllConversations", paramReq, {
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
