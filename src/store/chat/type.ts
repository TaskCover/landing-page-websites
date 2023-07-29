/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataStatus } from "constant/enums";
import { Paging } from "constant/types";
import { Attachment, ChatLinkType, MediaType } from "./media/typeMedia";

export type IChatItemInfo = IChatInfo & IChatGroup & IChatDirect;
export interface IChatInfo {
  _id: string;
  _updatedAt: string;
  name: string;
  t: string;
  msgs: number;
  usersCount: number;
  ts: string;
  ro: boolean;
  default: boolean;
  sysMes: boolean;
  avatar: string;
}

export interface IChatGroup {
  fname: string;
  customFields: unknown;
  u: UserSendInfo;
  lm: string;
  lastMessage: MessageInfo;
}

export interface IChatDirect {
  active: boolean;
  nameInsensitive: string;
  status: string;
  statuses: { username: string; status: string }[];
  type: string;
  lm: string;
  username: string;
  usernames: string[];
  lastMessage: MessageInfo;
  uids: string[];
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

export interface Url {
  url: string;
  meta: Meta;
  headers: Headers;
  parsedUrl: ParsedURL;
}

export interface Headers {
  contentType: string;
}

export interface Meta {
  pageTitle: string;
  ogImage: string;
  twitterCard: string;
  ogTitle: string;
  twitterSite: string;
}

export interface ParsedURL {
  host: string;
  hash: null;
  pathname: string;
  protocol: string;
  port: null;
  query: null;
  search: null;
  hostname: string;
}

export interface MessageInfo {
  _id: string;
  alias: string;
  msg: string;
  attachments: Attachment[];
  parseUrls: boolean;
  groupable: boolean;
  ts: string;
  u: UserSendInfo;
  rid: string;
  _updatedAt: string;
  urls?: Url[];
  mentions: unknown[];
  channels: unknown[];
  md?: unknown[];
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
  alias: string;
  attachments: Attachment[];
  parseUrls: false;
  groupable: false;
  mentions: [];
  channels: [];
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
  convention: IChatItemInfo[];
  userOnlinePage: UserOnlinePage[];
  status: DataStatus;
  conversationPaging: Paging;
  conversationInfo:
    | (IChatItemInfo & { partnerUsername: string; statusOnline: string })
    | null;
  roomId: string;

  currStep: STEP;
  prevStep: STEP;
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
  //ListSearchConversation
  listSearchMessage: MessageSearchInfo[];
  statusListSearchMessage: DataStatus;
  //media list
  mediaList: MediaType[];
  mediaListStatus: DataStatus;
  //sendMessage state
  stateSendMessage: {
    filePreview?: File | File[] | null;
    status: DataStatus;
  };
  stateSearchMessage: MessageSearchInfo | null;
  stateReadMessage: ReadMessageInfo | null;
  statusReadMessage: DataStatus;

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

export type RoomType = "c" | "d" | "p";
export interface ChatAttachmentsRequest extends AuthenRequestCommon {
  roomId?: string;
  fileType?: "media" | "file" | "link";
  roomType?: RoomType;
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

export interface Position {
  id: string;
  name: string;
}
export interface UserInfo {
  company: string;
  department: string;
  email: string;
  fullname: string;
  id: string;
  is_active: true;
  phone: string;
  position: Position;
  date_end_using: string;
  date_start_using: string;
  approve: true;
  avatar: Avatar;
  status: 1;
  authToken: string;
  id_rocket: string;
  username: string;
}

export interface MessageBodyRequest {
  sender_authToken: string;
  sender_userId: string;
  receiverUsername: string;
  message?: string;
  attachments?: Attachment[];
}

export interface MessageSearchInfo {
  roomId: string;
  messageId: string;
  matchedText: string;
  ts: string;
  userId: string;
  fullname: string;
  avatar: string;
  offset: number;
}

export interface MessageSearchInfoRequest extends AuthenRequestCommon {
  roomId: string;
  text: string;
  type: RoomType;
}

export interface ReadMessageRequest extends AuthenRequestCommon {
  roomId: string;
  type: RoomType;
}

export interface ReadMessageInfo {
  roomId: string;
  unreadCount: number;
  unreadsFrom: string;
  success: boolean;
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

export enum STEP_INFO {
  IDLE,
  USER,
  MEDIA,
  LINK,
  FILE,
}

export enum TYPE_LIST {
  MEDIA_LIST,
  LINK_LIST,
  FILE_LIST,
}

export const mimiMap = {
  "application/zip": ".zip",
  "application/xhtml+xml": ".xhtml",
  "application/vnd.visio": ".vsd",
  "image/svg_xml": ".svg",
  "video.mp4": ".mp4",
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": ".png",
};
