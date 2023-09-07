import { CellProps, HeaderCell } from "components/Table";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import { use, useContext, useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EditContext } from "../components/sn-service/context/EditContext";
import { Stack } from "@mui/material";
import { Text } from "components/shared";

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

export const useGetHeaderColumn = () => {
  const { control, getValues } = useFormContext();
  const { isEdit } = useContext(EditContext);

  const salesT = useTranslations(NS_SALES);

  const headerList: CellProps[] = useMemo(() => {
    const list: CellProps[] = [
      {
        id: ServiceColumn.NAME,
        value: salesT("detail.service.table.name"),
        // minWidth: 170,
        width: "9%",
        align: "left",
      },

      {
        id: ServiceColumn.DESCRIPTION,
        value: salesT("detail.service.table.description"),
        // minWidth: 170,
        width: "9%",
        align: "left",
      },
      {
        id: ServiceColumn.SERVICE_TYPE,
        value: salesT("detail.service.table.serviceType"),
        align: "left",
        // minWidth: 140,
        width: "8%",
      },
      {
        id: ServiceColumn.BILL_TYPE,
        value: salesT("detail.service.table.billType"),
        align: "left",
        // minWidth: 140,
        width: "8%",
      },
      {
        id: ServiceColumn.UNIT,
        value: salesT("detail.service.table.unit"),
        align: "left",
        // minWidth: 140,
        width: "8%",
      },
      {
        id: ServiceColumn.ESTIMATE,
        value: salesT("detail.service.table.estimate"),
        align: "left",
        width: "8%",
        // minWidth: 120,
      },
      {
        id: ServiceColumn.QUANTITY,
        value: salesT("detail.service.table.quantity"),
        align: "left",
        width: "8%",
        // minWidth: 120,
      },

      {
        id: ServiceColumn.PRICE,
        value: salesT("detail.service.table.price"),
        align: "left",
        // minWidth: 120,
        width: "8%",
      },
      {
        id: ServiceColumn.DISCOUNT,
        value: salesT("detail.service.table.discount"),
        align: "left",
        width: "8%",
        // minWidth: 120,
      },
      {
        id: ServiceColumn.MARK_UP,
        value: salesT("detail.service.table.markup"),
        align: "left",
        width: "8%",
        // minWidth: 120,
      },
      {
        id: ServiceColumn.TOTAL_BUGET,
        value: salesT("detail.service.table.totalBuget"),
        align: "left",
        width: "8%",
        // minWidth: 160,
      },
    ];
    if (isEdit) {
      list.push({
        id: ServiceColumn.ACTION,
        value: "",
        width: "4%",
        align: "right",
      });
    }
    return list;
    if (isEdit) {
      list.push({
        id: ServiceColumn.ACTION,
        value: "",
        width: "4%",
      });
    }
  }, [salesT, isEdit]);
  return {
    columns: headerList,
    // columns,
  };
};
