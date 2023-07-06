import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Permission, ThemeMode } from "./enums";
import { i18n } from ".";

export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  avatar?: string;
  subText?: string;
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
  pageIndex: number;
  pageSize: number;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  company?: string;
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
