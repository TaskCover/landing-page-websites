import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { DocAccessibility, Permission, ThemeMode } from "./enums";
import { i18n } from ".";

export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  avatar?: string;
  subText?: string;
}

export interface Paging_Feedback {
  page: number;
  size: number;
  total_page?: number;
  totalItems?: number;
}

export interface Paging_Billing {
  page: number;
  size: number;
  total_page?: number;
  totalItems?: number;
}

export interface Paging_Career {
  page: number;
  size: number;
  total_page?: number;
  totalItems?: number;
}

export interface PagingItem {
  page: number;
  size: number;
  total_page?: number;
  totalItems?: number;
}

export interface Size {
  width?: number;
  height?: number;
}

export type Mode = ThemeMode.LIGHT | ThemeMode.DARK | "system";

export type ErrorResponse = {
  code: string;
  description?: string;
  errors: {
    [key: string]: string;
  }[];
};

export interface BaseQueries {
  pageIndex?: number;
  pageSize?: number;
}

export interface BaseQueries_Feedback {
  page?: number;
  size?: number;
}

export interface BaseQueries_Billing {
  page?: number;
  size?: number;
}

export interface User {
  id: string;
  fullname: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  taxCode?: string;
  address?: string;
  country?: string;
  position?: {
    name: string;
    id: string;
  };
  roles: Permission[];
  avatar?: {
    link: string;
  };
}

export interface Paging {
  pageIndex: number;
  pageSize: number;
  totalPages?: number;
  totalItems?: number;
}

export type ItemListResponse = {
  totalPages: number;
  totalItems: number;
  items: unknown[];
  filters?: Params;
  concat?: boolean;
  prefixKey?: string;
};

export type OptionFormatNumber = {
  numberOfFixed?: number;
  emptyText?: string;
  localeOption?: Intl.NumberFormatOptions;
  prefix?: string;
  suffix?: string;
  space?: boolean;
} & Intl.NumberFormatOptions;

export type Locale = (typeof i18n)["locales"][number];

export type Attachment = {
  object: string;
  name: string;
  link: string;
};

export declare interface IDocument {
  _id?: string;
  id?: string;
  name?: string;
  created_time?: Date;
  updated_time?: Date;
  created_by?: Partial<User>;
  updated_by?: Partial<User>;
  owner?: Partial<User>;
  description?: string;
  is_active?: boolean;
  is_public?: boolean;
  member?: Array<{
    _id: string;
    create_time: Date;
    doc: string;
    user: Partial<User>;
    perm: keyof typeof DocAccessibility;
  }>;
  positionComment?: [];
  company?: string;
  project_id?: string;
  content?: string;
  child?: [];
}

export declare type TPagination<T> = {
  docs: Array<T>;
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export declare interface IComment {
  _id: string;
  create_time: Date;
  updated_time: Date;
  created_by?: Partial<User>;
  content: string;
  position: {
    create_time: Date;
    updated_time: Date;
    doc: string;
    position: string;
  };
  doc: string;
  createdAt: Date;
}

