import { AlertColor } from "@mui/material";

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PAUSE = "PAUSE",
  CLOSE = "CLOSE",
}

export const TEXT_STATUS: { [key in ProjectStatus]: string } = {
  [ProjectStatus.ACTIVE]: "Hoạt động",
  [ProjectStatus.PAUSE]: "Tạm dừng",
  [ProjectStatus.CLOSE]: "Kết thúc",
};

export const COLOR_STATUS: { [key in ProjectStatus]: AlertColor } = {
  [ProjectStatus.ACTIVE]: "success",
  [ProjectStatus.PAUSE]: "warning",
  [ProjectStatus.CLOSE]: "error",
};
