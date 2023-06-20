import { ThemeMode } from "./enums";
import { Mode, Paging } from "./types";

export const AUTH_API_URL = "/auth-app/";
export const API_URL = "/app/";
export const COMPANY_API_URL = process.env.COMPANY_API_URL as string;
export const UPLOAD_API_URL = process.env.UPLOAD_API_URL as string;

export const DEFAULT_MODE: Mode = ThemeMode.LIGHT;

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

export const IMAGES_ACCEPT = ["image/png", "image/jpeg"];

export const ACCESS_TOKEN_STORAGE_KEY = "aT";
export const REFRESH_TOKEN_STORAGE_KEY = "rT";
export const USER_INFO_STORAGE_KEY = "user";

export const API_TIMEOUT = 30_000; //s

export const AN_ERROR_TRY_RELOAD_PAGE =
  "Có lỗi xảy ra. Vui lòng tải lại trang.";
export const AN_ERROR_TRY_AGAIN = "Có lỗi xảy ra. Vui lòng thử lại.";
