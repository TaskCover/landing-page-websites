import { Box, TableRow } from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_BUDGETING } from "constant/index";
import { useTranslations } from "next-intl";
import { BadgeCustom } from "components/sn-budgeting/BadgeCustom";

type TTemplate = {
  service: string;
  description: string;
  date: string;
  att: string;
  paymentStatus: string;
  totalCost: string;
  billable: string;
};

const TemplateData: TTemplate[] = [
  {
    service: "Weebsite develop",
    description: "User testing",
    date: "8/07/2022",
    att: "",
    paymentStatus: "Paid",
    totalCost: "$500.00",
    billable: "$500.00",
  },
];

export const Expenses = () => {
  const budgetT = useTranslations(NS_BUDGETING);

  const headerList: CellProps[] = [
    { value: budgetT("tabExpenses.service"), align: "center" },
    { value: budgetT("tabExpenses.description"), align: "center" },
    { value: budgetT("tabExpenses.date"), align: "center" },
    { value: budgetT("tabExpenses.att"), align: "center" },
    {
      value: budgetT("tabExpenses.paymentStatus"),
      align: "center",
    },
    {
      value: budgetT("tabExpenses.totalCost"),
      data: "$56.000.000",
      align: "center",
    },
    {
      value: budgetT("tabExpenses.billable"),
      data: "$56.000.000",
      align: "center",
    },
  ];

  return (
    <Box p="15px">
      <TableLayout headerList={headerList} noData={false} titleColor="grey.300">
        {TemplateData.map((data, index) => {
          return (
            <TableRow key={`budget-expense-${index}`}>
              <BodyCell>
                <b>{data.service}</b>
              </BodyCell>
              <BodyCell>{data.description}</BodyCell>
              <BodyCell>{data.date}</BodyCell>
              <BodyCell>{data.att}</BodyCell>
              <BodyCell>
                <BadgeCustom color="success.main" text={data.paymentStatus} />
              </BodyCell>
              <BodyCell>{data.totalCost}</BodyCell>
              <BodyCell>{data.billable}</BodyCell>
            </TableRow>
          );
        })}
      </TableLayout>
    </Box>
  );
};
