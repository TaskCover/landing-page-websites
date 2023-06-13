import { ThemeMode } from "./enums";
import { Mode } from "./types";

export const API_URL = "/app/";

export const DEFAULT_MODE: Mode = ThemeMode.LIGHT;

export const ACCESS_TOKEN_STORAGE_KEY = "aT";
export const REFRESH_TOKEN_STORAGE_KEY = "rT";
export const USER_INFO_STORAGE_KEY = "user";

export const API_TIMEOUT = 30_000; //s

export const AN_ERROR_TRY_RELOAD_PAGE =
  "Có lỗi xảy ra. Vui lòng tải lại trang.";
export const AN_ERROR_TRY_AGAIN = "Có lỗi xảy ra. Vui lòng thử lại.";
