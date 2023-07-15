import { DataStatus } from "constant/enums";
import { Paging } from "constant/types";

export interface ChatItemInfo {
  _id: string;
  usernames: string[];
  usersCount: number;
  ts: string;
  default: boolean;
  ro: boolean;
  sysMes: boolean;
  fname?: string;
  _updatedAt: string;
  name?: string;
  avatar: string;
  t: string;
  msgs: number;
  lastMessage: MessengerInfo;
  lm: string;
}

export interface MessageInfo {
  _id: string;
  alias: string;
  msg: string;
  attachments: unknown[];
  parseUrls: boolean;
  groupable: boolean;
  ts: string;
  u: UserSendInfo;
  rid: string;
  _updatedAt: string;
  urls?: unknown[];
  mentions: unknown[];
  channels: unknown[];
  md: unknown[];
}

export interface UserOnlinePage {
  active: boolean;
  name: string;
  nameInsensitive: string;
  status: string;
  type: string;
  username: string;
  _id: string;
}

export interface MessengerInfo {
  msg: string;
  ts: string;
  u: UserSendInfo | null;
  _id: string;
  rid: string;
  _updatedAt: string;
}

export interface UserSendInfo {
  _id: string;
  username: string;
  name: string;
}

export interface ChatGroup {
  _id: string;
  fname: string;
  name: string;
  usersCount: number;
}

export interface ChatState {
  convention: ChatItemInfo[];
  userOnlinePage: UserOnlinePage[];
  status: DataStatus;
  conversationPaging: Paging;
  roomId: string;
  currStep: STEP;
  prevStep: STEP;
  messageInfo: MessageInfo[];
  messageStatus: DataStatus;
  messagePaging: Paging;
  newGroupData: ChatGroup | {};
  createGroupStatus: DataStatus,
  addMembers2GroupStatus: DataStatus,
  leftGroupStatus: DataStatus,
  removeMemberGroupStatus: DataStatus,
}

export type DirectionChat = "a" | "c" | "d";

export interface AuthenRequestCommon {
  authToken: string;
  userId: string;
}
export interface ChatRequestCommon extends AuthenRequestCommon {
  type: DirectionChat;
  count?: number;
  offset?: number;
}
export interface ChatConventionItemRequest extends ChatRequestCommon {
  text: string;
}

export interface LastMessagesRequest extends ChatRequestCommon {
  roomId: string;
}

export interface CreateGroupRequest extends ChatRequestCommon {
  groupName: string;
  members: string[];
}

export interface AddMember2GroupRequest extends AuthenRequestCommon {
  roomId: string;
  userId_to_add: string;
}

export interface LeftGroupRequest extends AuthenRequestCommon {
  roomId: string;
}

export interface RemoveGroupMemberRequest extends AuthenRequestCommon {
  roomId: string;
  userId_to_remove: string;
}

export enum STEP {
  CONVENTION,
  CHAT_ONE,
  VIEW_DETAIL_USER,
  ACCOUNT_INFO,
  MEDIA_INFO,
  ADD_GROUP
}
