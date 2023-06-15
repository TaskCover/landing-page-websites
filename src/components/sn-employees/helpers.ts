import { AlertColor } from "@mui/material";

export enum PaymentStatus {
  UNPAID,
  PAID,
}

export const TEXT_STATUS: { [key in PaymentStatus]: string } = {
  [PaymentStatus.PAID]: "Đã thanh toán",
  [PaymentStatus.UNPAID]: "Chưa thanh toán",
};

export const COLOR_STATUS: { [key in PaymentStatus]: AlertColor } = {
  [PaymentStatus.PAID]: "success",
  [PaymentStatus.UNPAID]: "info",
};
