import { Endpoint } from "api";
import { saleClientInstance } from "api/client";
import { PayStatus } from "constant/enums";
import { useMutation } from "react-query";

export const BUDGET_GET_EXPENSE_QK = "budget_get_expense_query_key";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TBudgetExpense = any;
export type TBudgetExpenses = TBudgetExpense[];

export interface TBudgetExpenseAdd {
  date: string;
  owner: string;
  service: string;
  budget: string;
  qty: number;
  cost: number;
  currency: string;
  totalCost: number;
  markup: number;
  billable: number;
  description: string;
  company: string;
  reimbursement: {
    reimbursement: string;
    reimbursementDate: string;
  };
  payment: {
    dueDate: string;
    paymentDate: string;
    vendor: string;
  };
  status: PayStatus;
  attachment: string;
}

export const budgetExpenseAdd = (data: TBudgetExpenseAdd) => {
  return saleClientInstance.post(Endpoint.BUDGET_EXPENSE_CREATE, data);
};

export const useBudgetExpenseAdd = () => {
  return useMutation({
    mutationFn: budgetExpenseAdd,
  });
};

