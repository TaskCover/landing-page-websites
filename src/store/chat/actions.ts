import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "api/client";
import { Endpoint } from "api/endpoint";
import { HttpStatusCode } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, AUTH_API_URL, CHAT_API_URL } from "constant/index";
import {
  AddMember2GroupRequest,
  ChatConventionItemRequest,
  CreateGroupRequest,
  LastMessagesRequest,
  LeftGroupRequest,
  RemoveGroupMemberRequest,
  ChangeRoleRequest,
  ChatAttachmentsRequest,
  FetchGroupMemberRequest,
  RemoveMemberRequest
} from "./type";

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

export const getLatestMessages = createAsyncThunk(
  "chat/getLatestMessages",
  async (paramReq: LastMessagesRequest) => {
    try {
      const response = await client.post("getLatestMessages", paramReq, {
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

export const getUserInfoById = createAsyncThunk(
  "chat/getUserInfoById",
  async (username: string) => {
    try {
      const response = await client.get(
        `in/users/${username}`,
        {},
        {
          baseURL: AUTH_API_URL,
        },
      );

      if (response?.status === HttpStatusCode.OK) {
        return response.data;
      }
      throw AN_ERROR_TRY_AGAIN;
    } catch (error) {
      throw error;
    }
  },
);

export const createDirectMessageGroup = createAsyncThunk(
  "chat/createDirectMessageGroup",
  async (paramReq: CreateGroupRequest) => {
    try {
      const response = await client.post("createDirectMessageGroup", paramReq, {
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

export const addMembersToDirectMessageGroup = createAsyncThunk(
  "chat/addMembersToDirectMessageGroup",
  async (paramReq: AddMember2GroupRequest) => {
    try {
      const response = await client.post("addGroupMember", paramReq, {
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

export const leftDirectMessageGroup = createAsyncThunk(
  "chat/leftDirectMessageGroup",
  async (paramReq: LeftGroupRequest) => {
    try {
      const response = await client.post("leaveGroup", paramReq, {
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

export const removeUserFromGroup = createAsyncThunk(
  "chat/removeUserFromGroup",
  async (paramReq: RemoveMemberRequest) => {
    try {
      const response = await client.post("removeUserFromGroup", paramReq, {
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

export const fetchGroupMembers = createAsyncThunk(
  "chat/groupMembers",
  async (paramReq: FetchGroupMemberRequest) => {
    try {
      const response = await client.post("groupMembers", paramReq, {
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

export const changeGroupRole = createAsyncThunk(
  "chat/changeUserGroupRole",
  async (paramReq: ChangeRoleRequest) => {
    try {
      const response = await client.post("changeUserGroupRole", paramReq, {
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

export const getChatAttachments = createAsyncThunk(
  "chat/roomFiles",
  async (paramReq: ChatAttachmentsRequest) => {
    try {
      const response = await client.post("roomFiles", paramReq, {
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

