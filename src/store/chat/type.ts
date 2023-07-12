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
  t: string;
  msgs: number;
  lastMessage: MessengerInfo;
  lm: string;
}

export interface MessengerInfo {
  msg: string;
  ts: string;
  u: UserSendInfo;
  _id: string;
  rid: string;
  _updatedAt: string;
}

export interface UserSendInfo {
  _id: string;
  username: string;
  name: string;
}

export interface ChatState {
  convention: ChatItemInfo[];
  status: DataStatus;
  paging: Paging;

  roomId: string;

  currStep: STEP;
  prevStep: STEP;
}

export type DirectionChat = "a" | "c" | "d";

export interface ChatConventionItemRequest {
  authToken: string;
  userId: string;
  type: DirectionChat;
  count?: number;
  offset?: number;
  text: string;
}

export enum STEP {
  CONVENTION,
  CHAT_ONE,
  VIEW_DETAIL_USER,
}
