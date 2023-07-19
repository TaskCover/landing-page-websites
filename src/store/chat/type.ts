/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataStatus } from "constant/enums";
import { Paging } from "constant/types";
import { ChatLinkType } from "./media/typeMedia";

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
  statuses: { username: string; status: string }[];
}

export interface UserOnlinePage {
  active: boolean;
  name: string;
  nameInsensitive: string;
  status: string;
  type: string;
  username: string;
  _id: string;
  avatar: string;
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

export interface SetStepAction<T> {
  step: STEP;
  dataTransfer?: T;
}

export interface ChatState {
  convention: ChatItemInfo[];
  userOnlinePage: UserOnlinePage[];
  status: DataStatus;
  conversationPaging: Paging;
  conversationInfo:
    | (ChatItemInfo & { partnerUsername: string; statusOnline: string })
    | null;
  roomId: string;

  currStep: STEP;
  prevStep: STEP;
  backFallStep: STEP;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataTransfer?: any;
  messageInfo: MessageInfo[];
  messageStatus: DataStatus;
  messagePaging: Paging;
  //partner info
  partnerInfo: UserInfo | null;
  partnerInfoStatus: DataStatus;
  //chat links
  chatLinks: ChatLinkType[];
  chatLinksStatus: DataStatus;

  newGroupData: ChatGroup | {};
  createGroupStatus: DataStatus;
  addMembers2GroupStatus: DataStatus;
  leftGroupStatus: DataStatus;
  removeMemberGroupStatus: DataStatus;
  typeList: TYPE_LIST;
  groupMembers: any[];
  chatAttachments: any;
  deleteConversationStatus: DataStatus;
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

export interface FetchGroupMemberRequest extends AuthenRequestCommon {
  roomId: string;
}

export interface RemoveGroupMemberRequest extends AuthenRequestCommon {
  roomId: string;
  userId_to_remove: string;
}

export interface DeleteConversationGroup extends AuthenRequestCommon {
  roomId: string;
  type: string;
}

export interface ChatAttachmentsRequest extends AuthenRequestCommon {
  roomId: string;
  fileType?: "media" | "file" | "link";
  roomType: "c" | "p" | "d";
}

export interface ChangeRoleRequest extends AuthenRequestCommon {
  groupId: string;
  userIdToChange: string;
  newRole:
    | "addOwner"
    | "removeOwner"
    | "addModerator"
    | "removeModerator"
    | "addLeader"
    | "removeLeader";
}

export interface RemoveMemberRequest extends AuthenRequestCommon {
  groupId: string;
  userIdToKick: string;
}

export interface Avatar {
  object: string;
  name: string;
  link: string;
}

export interface UserInfo {
  company: string;
  department: string;
  email: string;
  fullname: string;
  id: string;
  is_active: true;
  phone: string;
  position: string;
  date_end_using: string;
  date_start_using: string;
  approve: true;
  avatar: Avatar;
  status: 1;
  authToken: string;
  id_rocket: string;
  username: string;
}

export enum STEP {
  IDLE,
  CONVENTION,
  CHAT_ONE,
  VIEW_DETAIL_USER,
  ACCOUNT_INFO,
  MEDIA_INFO,
  ADD_GROUP,
  CHAT_DETAIL_GROUP,
  LIST,
  USER_INFO,
  MEDIA,
  LINK,
  FILE,
  CHAT_FORWARD,
  CHAT_GROUP,
}

export enum TYPE_LIST {
  MEDIA_LIST,
  LINK_LIST,
  FILE_LIST,
}
