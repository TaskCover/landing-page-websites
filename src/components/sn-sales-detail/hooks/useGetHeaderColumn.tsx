import { useState } from "react";

export enum ServiceColumn {
  NAME = "name",
  DESCRIPTION = "desc",
  ESTIMATE = "estimate",
  QUANTITY = "qty",
  PRICE = "price",
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
