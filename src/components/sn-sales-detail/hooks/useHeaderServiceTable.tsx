"use client";
import { CellProps, HeaderCell } from "components/Table";
import { NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EditContext } from "../components/sn-service/context/EditContext";
import { ServiceColumn, useGetHeaderColumn } from "./useGetHeaderColumn";
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

// const defaultColumns = [
//   ServiceColumn.NAME,
//   ServiceColumn.DESCRIPTION,
//   ServiceColumn.SERVICE_TYPE,
//   ServiceColumn.BILL_TYPE,
//   ServiceColumn.UNIT,
//   ServiceColumn.ESTIMATE,
//   ServiceColumn.QUANTITY,
//   ServiceColumn.PRICE,
//   ServiceColumn.DISCOUNT,
//   ServiceColumn.MARK_UP,
//   ServiceColumn.TOTAL_BUGET,
//   ServiceColumn.ACTION,
// ];

const useHeaderServiceTable = (index?: number) => {
  const salesT = useTranslations(NS_SALES);
  const { isEdit } = useContext(EditContext);
  const { columns: defaultColumns } = useGetHeaderColumn();
  const [headerList, setHeaderList] = useState<CellProps[]>([
    ...defaultColumns,
  ]);
  const { getValues, control } = useFormContext();

  const services = getValues(`sectionsList.${index}.service`);
  // const totalTime = useMemo(() => {
  //   const total = services?.reduce((prev, field) => {
  //     const estimate = field?.estimate ? field.estimate : 0;
  //     return prev + estimate;
  //   }, 0);
  //   return total;
  // }, services);

  // const headerList: CellProps[] = useMemo(() => {
  //   const list: CellProps[] =
  //   const colList = columns.reduce((prev, col) => {
  //     const exitedCol = list.find((item) => item.id === col);
  //     if (exitedCol) {
  //       prev.push(exitedCol);
  //     }
  //     return prev;
  //   }, [] as CellProps[]);

  //   if (isEdit) {
  //     list.push({
  //       id: "action",
  //       value: "",
  //       width: "4%",
  //       align: "right",
  //     });
  //   }
  //   return colList;
  // }, [salesT, isEdit, columns]);

  const onShowColumn = useCallback(
    (column: ServiceColumn) => {
      const isExisted = headerList.find((col) => col.id === column);
      const newCols = headerList;
      if (isExisted) {
        const index = newCols.findLastIndex((col) => col.id === column);
        if (index) newCols.splice(index, 1);
      } else {
        const newCol = defaultColumns.find((col) => col.id === column);
        if (newCol) newCols.push(newCol);
      }
      setHeaderList(newCols);
      console.log(
        "🚀 ~ file: useHeaderServiceTable.tsx:91 ~ useHeaderServiceTable ~ newCols:",
        newCols,
      );
    },
    [defaultColumns],
  );

  useEffect(() => {
    if (isEdit) {
      const newCols = [...headerList];
      newCols.push({
        id: "action",
        value: "",
        width: "4%",
        align: "right",
      });
      setHeaderList(newCols);
    }
  }, [isEdit]);

  return {
    headerList,
    onShowColumn,
  };
};

export default useHeaderServiceTable;
