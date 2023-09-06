"use client";
import { CellProps, HeaderCell } from "components/Table";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { EditContext } from "../components/sn-service/context/EditContext";
import { ServiceColumn } from "./useGetHeaderColumn";
import { Box, Stack, TableCell, TableHead } from "@mui/material";
import { Text } from "components/shared";
import {
  FieldValue,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { Service } from "store/sales/reducer";
import { SectionData } from "store/sales/actions";
const defaultColumns = [
  ServiceColumn.NAME,
  ServiceColumn.DESCRIPTION,
  ServiceColumn.ESTIMATE,
  ServiceColumn.QUANTITY,
  ServiceColumn.PRICE,
  ServiceColumn.TOTAL_BUGET,
  ServiceColumn.ACTION,
];

const useHeaderServiceTable = (index?: number) => {
  const salesT = useTranslations(NS_SALES);
  const { isEdit } = useContext(EditContext);
  const [columns, setColumns] = useState<ServiceColumn[]>([...defaultColumns]);

  const mappingCol: CellProps[] = [
    {
      id: ServiceColumn.NAME,
      value: salesT("detail.service.table.name"),
      minWidth: 170,
      align: "left",
    },
    {
      id: ServiceColumn.DESCRIPTION,
      value: salesT("detail.service.table.description"),
      minWidth: 170,
      align: "left",
    },
  ];

  const { getValues, control } = useFormContext();

  const services = getValues(`sectionsList.${index}.service`);
  const totalTime = useMemo(() => {
    const total = services?.reduce((prev, field) => {
      const estimate = field?.estimate ? field.estimate : 0;
      return prev + estimate;
    }, 0);
    return total;
  }, services);

  const headerList: CellProps[] = useMemo(() => {
    const list: CellProps[] = [
      {
        id: "name",
        value: salesT("detail.service.table.name"),
        minWidth: 170,
        align: "left",
        sx: {
          display: columns.includes(ServiceColumn.NAME) ? "table-cell" : "none",
        },
      },

      {
        id: "Description",
        value: salesT("detail.service.table.description"),
        minWidth: 170,
        align: "left",
        sx: {
          display: columns.includes(ServiceColumn.DESCRIPTION)
            ? "table-cell"
            : "none",
        },
      },
      // {
      //   id: "serviceType",
      //   value: salesT("detail.service.table.serviceType"),
      //   align: "left",
      //   sx: {
      //     display: columns.includes(ServiceColumn.SERVICE_TYPE)
      //       ? "table-cell"
      //       : "none",
      //   },
      // },
      // {
      //   id: "billType",
      //   value: salesT("detail.service.table.billType"),
      //   align: "left",
      //   sx: {
      //     display: columns.includes(ServiceColumn.BILL_TYPE)
      //       ? "table-cell"
      //       : "none",
      //   },
      // },
      // {
      //   id: "unit",
      //   value: salesT("detail.service.table.unit"),
      //   align: "left",
      //   sx: {
      //     display: columns.includes(ServiceColumn.UNIT) ? "table-cell" : "none",
      //   },
      // },
      {
        id: "estimate",
        value: salesT("detail.service.table.estimate"),
        align: "left",
        sx: {
          display: columns.includes(ServiceColumn.ESTIMATE)
            ? "table-cell"
            : "none",
        },
      },
      {
        id: "quantity",
        value: salesT("detail.service.table.quantity"),
        align: "left",
        sx: {
          display: columns.includes(ServiceColumn.QUANTITY)
            ? "table-cell"
            : "none",
        },
      },

      {
        id: "price",
        value: salesT("detail.service.table.price"),
        align: "left",
        sx: {
          display: columns.includes(ServiceColumn.PRICE)
            ? "table-cell"
            : "none",
        },
      },
      // {
      //   id: "discount",
      //   value: salesT("detail.service.table.discount"),
      //   align: "left",
      //   sx: {
      //     display: columns.includes(ServiceColumn.DISCOUNT)
      //       ? "table-cell"
      //       : "none",
      //   },
      // },
      // {
      //   id: "markUp",
      //   value: salesT("detail.service.table.markup"),
      //   align: "left",
      //   sx: {
      //     display: columns.includes(ServiceColumn.MARK_UP)
      //       ? "table-cell"
      //       : "none",
      //   },
      // },
      {
        id: "totalBuget",
        value: salesT("detail.service.table.totalBuget"),
        align: "left",
        sx: {
          display: columns.includes(ServiceColumn.TOTAL_BUGET)
            ? "table-cell"
            : "none",
        },
      },
    ];
    const colList = columns.map((col) => {
      const exitedCol = mappingCol.find((item) => item.id === col);
      if (exitedCol) {
        return exitedCol;
      }
    });
    if (isEdit) {
      list.push({
        id: "action",
        value: "",
        align: "right",
      });
    }
    return list;
  }, [salesT, isEdit, JSON.stringify(columns)]);

  const onShowColumn = useCallback((column: ServiceColumn) => {
    const isExisted = columns.includes(column);

    const newCols = [...columns];
    if (isExisted) {
      newCols.splice(newCols.indexOf(column), 1);
    } else {
      newCols.push(column);
    }

    setColumns(newCols);
  }, []);

  return {
    serviceTableHeader: headerList,
    columns,
    onShowColumn,
  };
};

export default useHeaderServiceTable;
