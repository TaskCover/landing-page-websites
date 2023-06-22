import { AlertColor } from "@mui/material";
import { CompanyStatus } from "store/company/actions";

export const TEXT_STATUS: { [key in CompanyStatus]: string } = {
  [CompanyStatus.APPROVE]: "approved",
  [CompanyStatus.REJECT]: "rejected",
};

export const COLOR_STATUS: {
  [key in CompanyStatus]: AlertColor;
} = {
  [CompanyStatus.APPROVE]: "success",
  [CompanyStatus.REJECT]: "error",
};

export const WAITING_STATUS = {
  TEXT: "waiting",
  COLOR: "warning",
};
