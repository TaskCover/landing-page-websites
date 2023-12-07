import {
  Box,
  ButtonBase,
  Grow,
  MenuItem,
  MenuList,
  popoverClasses,
  Popper,
  Stack,
  TableRow,
} from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { DATE_LOCALE_FORMAT, NS_BUDGETING } from "constant/index";
import { useTranslations } from "next-intl";
import { formatDate } from "utils/index";
import { IconButton, Text } from "components/shared";
import MoreDotIcon from "../../../icons/MoreDotIcon";
import DuplicateIcon from "../../../icons/DuplicateIcon";
import TrashIcon from "../../../icons/TrashIcon";
import { useState } from "react";
import { useOnClickOutside } from "hooks/useOnClickOutside";

type TTemplate = {
  subject: string;
  invoiceNumber: string;
  date: string;
  att: string;
  amountNoTax: string;
  amountUnpaid: string;
  dueDate: string;
};

const TemplateData: TTemplate[] = [
  {
    subject: "Weebsite develop",
    invoiceNumber: "353467",
    date: "8/07/2022",
    att: "",
    amountNoTax: "$500.00",
    amountUnpaid: "$500.00",
    dueDate: "8/07/2022",
  },
];

export const Invoice = () => {
  const budgetT = useTranslations(NS_BUDGETING);

  const headerList: CellProps[] = [
    { value: budgetT("tabInvoice.subject"), align: "center" },
    { value: budgetT("tabInvoice.invoiceNumber"), align: "center" },
    { value: budgetT("tabInvoice.date"), align: "center" },
    { value: budgetT("tabInvoice.att"), align: "center" },
    {
      value: budgetT("tabInvoice.amountNoTax"),
      data: "$56.000.000",
      align: "center",
    },
    {
      value: budgetT("tabInvoice.amountUnpaid"),
      data: "$56.000.000",
      align: "center",
    },
    { value: budgetT("tabInvoice.dueDate"), align: "center" },
  ];

  return (
    <Box p="15px">
      <TableLayout headerList={headerList} noData={false} titleColor="grey.300">
        {TemplateData.map((data, index) => {
          return (
            <TableRow key={`budget-invoice-${index}`}>
              <BodyCell>{data.subject}</BodyCell>
              <BodyCell>{data.invoiceNumber}</BodyCell>
              <BodyCell>{data.date}</BodyCell>
              <BodyCell>{data.att}</BodyCell>
              <BodyCell>{data.amountNoTax}</BodyCell>
              <BodyCell>{data.amountUnpaid}</BodyCell>
              <BodyCell>
                <span style={{ color: "red" }}>{data.dueDate}</span>
              </BodyCell>
            </TableRow>
          );
        })}
      </TableLayout>
    </Box>
  );
};
