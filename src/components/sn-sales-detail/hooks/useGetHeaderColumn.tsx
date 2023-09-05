import { useState } from "react";

export enum ServiceColumn {
  NAME = "name",
  DESCRIPTION = "desc",
  SERVICE_TYPE = "serviceType",
  BILL_TYPE = "billType",
  UNIT = "unit",
  ESTIMATE = "estimate",
  QUANTITY = "qty",
  PRICE = "price",
  DISCOUNT = "discount",
  MARK_UP = "markUp",
  TOTAL_BUGET = "totalBuget",
  ACTION = "action",
}

export type ServiceColumnProps = {
  id: ServiceColumn;
  value: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  hidden?: boolean;
  sx?: Record<string, unknown>;
};

export const useGetGHeaderColumn = () => {
  const [state, setState] = useState([]);
};
