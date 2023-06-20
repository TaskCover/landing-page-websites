import { AlertColor } from "@mui/material";
import { PaymentStatus } from "components/sn-employees/helpers";

export const TEXT_STATUS: { [key in PaymentStatus]: string } = {
  [PaymentStatus.PAID]: "Approved",
  [PaymentStatus.UNPAID]: "Rejected",
};

export const COLOR_STATUS: { [key in PaymentStatus]: AlertColor } = {
  [PaymentStatus.PAID]: "success",
  [PaymentStatus.UNPAID]: "error",
};

export const WAITING_STATUS = {
  TEXT: "Waiting",
  COLOR: "warning",
};
