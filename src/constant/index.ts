import { ThemeMode } from "./enums";
import { Mode } from "./types";

export const API_URL = "/app/";

export const DEFAULT_MODE: Mode = ThemeMode.LIGHT;

export const API_TIMEOUT = 30_000; //s

export const AN_ERROR_TRY_RELOAD_PAGE =
  "An error occurred. Please try reload page.";
export const AN_ERROR_TRY_AGAIN = "An error occurred. Please try again!";
