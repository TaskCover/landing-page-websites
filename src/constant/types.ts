import { ThemeMode } from "./enums";

export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export type Mode = ThemeMode.LIGHT | ThemeMode.DARK | "system";

export type ErrorResponse = {
  code: string;
  description?: string;
  errors: {
    [key: string]: string;
  }[];
};
