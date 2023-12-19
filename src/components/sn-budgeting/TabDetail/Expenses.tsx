import { Box, Stack, TableRow } from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_BUDGETING } from "constant/index";
import { useTranslations } from "next-intl";
import { BadgeCustom } from "components/sn-budgeting/BadgeCustom";
import { Button, Checkbox } from "components/shared";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import PlusIcon from "icons/PlusIcon";
import UploadIcon from "icons/UploadIcon";

type TExpense = {
  id: string;
  service: string;
  description: string;
  date: string;
  att: string;
  paymentStatus: string;
  totalCost: string;
  billable: string;
};

const TemplateData: TExpense[] = [
  {
    id: "11111",
    service: "Weebsite develop",
    description: "User testing",
    date: "8/07/2022",
    att: "",
    paymentStatus: "Paid",
    totalCost: "$500.00",
    billable: "$500.00",
  },
  {
    id: "222222",
    service: "Lorem",
    description: "User 12",
    date: "8/07/2022",
    att: "",
    paymentStatus: "Paid",
    totalCost: "$500.00",
    billable: "$500.00",
  },
];

export const Expenses = () => {
  const [expenseSelected, setExpenseSelected] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<TExpense[]>([]);

  const budgetT = useTranslations(NS_BUDGETING);

  useEffect(() => {
    setExpenses(TemplateData);
  }, []);

  const handleSelecteAllExpense = (
    event: ChangeEvent<HTMLInputElement>,
    isChecked: boolean,
  ) => {
    if (!isChecked) {
      setExpenseSelected([]);
      return;
    }
    const allExpenseIds = expenses.map((expense) => expense.id);
    setExpenseSelected(allExpenseIds);
  };

  const handleSelectExpense = (
    event: ChangeEvent<HTMLInputElement>,
    isChecked: boolean,
  ) => {
    const id: string = String(event.target.value);

    const indexIdInExpenseSelected = expenseSelected.findIndex(
      (expenseId) => expenseId === id,
    );

    if (isChecked) {
      if (indexIdInExpenseSelected === -1) {
        expenseSelected.push(id);
      }
    } else {
      delete expenseSelected[indexIdInExpenseSelected];
    }

    setExpenseSelected(expenseSelected.filter(Boolean));
  };

  const headerList = useMemo((): CellProps[] => {
    return [
      {
        value: (
          <Checkbox
            checked={expenseSelected.length === expenses.length}
            onChange={handleSelecteAllExpense}
          />
        ),
        align: "center",
        width: "3%",
      },
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
  }, [expenseSelected, expenses]);

  return (
    <Box px="15px">
      <Stack direction="row" justifyContent="space-between" py="7px">
        <Button
          sx={{ color: "secondary.main" }}
          startIcon={<PlusIcon />}
          size="small"
        >
          Add Filter
        </Button>
        <Button sx={{ color: "secondary.main" }} size="small">
          <UploadIcon fontSize="medium" sx={{ transform: "rotate(180deg)" }} />
        </Button>
      </Stack>
      <TableLayout headerList={headerList} noData={false} titleColor="grey.300">
        {expenses.map((data, index) => {
          const indexIdInExpenseSelected = expenseSelected.findIndex(
            (expenseId) => expenseId === data.id,
          );
          return (
            <TableRow key={`budget-expense-${index}`}>
              <BodyCell>
                <Checkbox
                  checked={indexIdInExpenseSelected !== -1}
                  value={data.id}
                  onChange={handleSelectExpense}
                />
              </BodyCell>
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
