import { AlertColor } from "@mui/material";
import { CompanyStatus } from "store/company/actions";

export const TEXT_STATUS: { [key in CompanyStatus]: string } = {
  [CompanyStatus.APPROVE]: "Approved",
  [CompanyStatus.REJECT]: "Rejected",
};

export const COLOR_STATUS: {
  [key in CompanyStatus]: AlertColor;
} = {
  [CompanyStatus.APPROVE]: "success",
  [CompanyStatus.REJECT]: "error",
};
