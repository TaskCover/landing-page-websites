import { AlertColor } from "@mui/material";
import { PaymentStatus } from "components/sn-employees/helpers";

export const TEXT_STATUS: { [key in PaymentStatus]: string } = {
  [PaymentStatus.PAID]: "approved",
  [PaymentStatus.UNPAID]: "rejected",
};

export const COLOR_STATUS: { [key in PaymentStatus]: AlertColor } = {
  [PaymentStatus.PAID]: "success",
  [PaymentStatus.UNPAID]: "error",
};

export const WAITING_STATUS = {
  TEXT: "Waiting",
  COLOR: "warning",
};
