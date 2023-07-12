import { AlertColor } from "@mui/material";
import { Status, ThemeMode } from "./enums";
import { Mode, Paging } from "./types";

export const AUTH_API_URL = process.env.AUTH_API_URL as string;
export const API_URL = process.env.API_URL as string;
export const COMPANY_API_URL = process.env.COMPANY_API_URL as string;
export const UPLOAD_API_URL = process.env.UPLOAD_API_URL as string;
export const CHAT_API_URL = process.env.CHAT_API_URL as string;

export const DEFAULT_MODE: Mode = ThemeMode.LIGHT;
export const DARK_THEME_MEDIA_SYSTEM = "(prefers-color-scheme: dark)";

export const DATE_FORMAT_FORM = "yyyy-MM-dd";

export const DATE_FORMAT_SLASH = "dd/MM/yyyy";
export const DATE_FORMAT_HYPHEN = "dd-MM-yyyy";
export const LONG_TIME_FORMAT = "HH:mm:ss";
export const SHORT_TIME_FORMAT = "HH:mm";
export const DATE_TIME_FORMAT_SLASH = `${SHORT_TIME_FORMAT} ${DATE_FORMAT_SLASH}`;
export const DATE_TIME_FORMAT_HYPHEN = `${SHORT_TIME_FORMAT} ${DATE_FORMAT_HYPHEN}`;

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGING: Paging = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const SCROLL_ID = "scroll-id";

export const i18n = {
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
} as const;

export const TEXT_STATUS: { [key in Status]: string } = {
  [Status.ACTIVE]: "statusEnum.active",
  [Status.CLOSE]: "statusEnum.close",
  [Status.PAUSE]: "statusEnum.pause",
};

export const COLOR_STATUS: { [key in Status]: AlertColor } = {
  [Status.ACTIVE]: "success",
  [Status.CLOSE]: "error",
  [Status.PAUSE]: "warning",
};

export const STATUS_OPTIONS = [
  { label: TEXT_STATUS.ACTIVE, value: Status.ACTIVE },
  { label: TEXT_STATUS.PAUSE, value: Status.PAUSE },
  { label: TEXT_STATUS.CLOSE, value: Status.CLOSE },
];

export const NS_COMMON = "common";
export const NS_AUTH = "auth";
export const NS_LAYOUT = "layout";
export const NS_ACCOUNT = "account";
export const NS_PROJECT = "project";
export const NS_COMPANY = "company";
export const NS_MANAGER = "manager";

export const IMAGES_ACCEPT = ["image/png", "image/jpeg", "image/jpg"];

export const ACCESS_TOKEN_STORAGE_KEY = "aT";
export const REFRESH_TOKEN_STORAGE_KEY = "rT";

export const API_TIMEOUT = 30_000; //s

export const AN_ERROR_TRY_RELOAD_PAGE = "error.anErrorTryReload";
export const AN_ERROR_TRY_AGAIN = "error.anErrorTryAgain";
