"use client";

import { useParams } from "next/navigation";
import { useBudgetByIdQuery } from "../../queries/budgeting/get-by-id";
import React, { useEffect, useState } from "react";
import { TBudget } from "store/project/budget/action";
import { Box, Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Button, Text } from "components/shared";
import { NS_BUDGETING } from "constant/index";
import { useTranslations } from "next-intl";
import CloseIcon from "../../icons/CloseIcon";
import Link from "components/Link";
import { BUDGETING_PATH } from "constant/paths";
import TextStatus from "components/TextStatus";
import { Feed } from "components/sn-budgeting/TabDetail/Feed";
import { Time } from "components/sn-budgeting/TabDetail/Time";
import PlusIcon from "../../icons/PlusIcon";
import { ModalAddTime } from "components/sn-budgeting/TabDetail/ModalAddTime";
import useToggle from "hooks/useToggle";
import { Expenses } from "components/sn-budgeting/TabDetail/Expenses";
import { Invoice } from "components/sn-budgeting/TabDetail/Invoice";

enum TABS {
  FEED = "Feed",
  SERVICES = "Services",
  TIME = "Time",
  EXPENSES = "Expenses",
  INVOICES = "Invoices",
  RECURRING = "Recurring",
}

export const BudgetDetail = () => {
  const [isOpenModalTime, openModalTime, hideModalTime] = useToggle();
  const [budget, setBudget] = useState<TBudget | null>(null);
  const [activeTab, setActiveTab] = useState<string>(TABS.INVOICES);
  const { id } = useParams();

  const budgetDetailQuery = useBudgetByIdQuery(String(id));
  const budgetT = useTranslations(NS_BUDGETING);

  useEffect(() => {
    if (budgetDetailQuery) {
      setBudget(budgetDetailQuery.data);
    }
  }, [budgetDetailQuery]);

  if (!budget) return <></>;

  return (
    <Box>
      <Stack
        direction="row"
        p="15px"
        justifyContent="space-between"
        borderBottom="1px solid #ECECF3"
      >
        <Stack direction="row" alignItems="center">
          <Avatar size={40} src={budget.created_by.avatar.link} />
          <Stack pl="7px">
            <Text fontSize="20px" fontWeight="bold" lineHeight={1.2}>
              {budget.project.name}
            </Text>
            <Text lineHeight={1.2}>{budget.name}</Text>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Link href={BUDGETING_PATH}>
            <CloseIcon fontSize="medium" sx={{ color: "grey.400" }} />
          </Link>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        borderBottom="1px solid #ECECF3"
      >
        {activeTab === TABS.FEED ? (
          <Stack direction="row" gap={2} alignItems="center" p="15px" pr={0}>
            <TextStatus
              text="status.open"
              color="success"
              namespace={NS_BUDGETING}
              sx={{ cursor: "pointer" }}
            />
            <Box
              sx={{
                display: "inline-block",
                width: "20px",
                height: "2px",
                backgroundColor: "#BABCC6",
              }}
            />
            <TextStatus
              text="status.close"
              color="error"
              namespace={NS_BUDGETING}
              sx={{ cursor: "pointer" }}
            />
          </Stack>
        ) : (
          <Box />
        )}
        <Stack direction="row" alignItems="center">
          {Object.keys(TABS).map((tab, index) => {
            const currentTab = TABS[tab];
            return (
              <Box
                key={`budget-detail-tab-${index}`}
                p="15px"
                mx="2px"
                borderBottom="2px solid transparent"
                sx={{
                  cursor: "pointer",
                  transaction: "all .2s",
                  ...(activeTab === currentTab && {
                    color: "primary.main",
                    borderColor: "primary.main",
                  }),
                  "&:hover": {
                    color: "primary.main",
                    borderColor: "primary.main",
                  },
                }}
                onClick={() => setActiveTab(currentTab)}
              >
                {currentTab}
              </Box>
            );
          })}
          {activeTab === TABS.TIME && (
            <Button
              onClick={openModalTime}
              id="budget_add_new_time"
              startIcon={<PlusIcon />}
              variant="primary"
              size="small"
              sx={{ height: "40px", mx: "2px" }}
            >
              {budgetT("toolbar.addTime")}
            </Button>
          )}
          {activeTab === TABS.EXPENSES && (
            <Button
              onClick={() => {}}
              id="budget_add_new_expense"
              startIcon={<PlusIcon />}
              variant="primary"
              size="small"
              sx={{ height: "40px", mx: "2px" }}
            >
              {budgetT("toolbar.addExpense")}
            </Button>
          )}
          {activeTab === TABS.INVOICES && (
            <Button
              onClick={() => {}}
              id="budget_add_new_invoice"
              startIcon={<PlusIcon />}
              variant="primary"
              size="small"
              sx={{ height: "40px", mx: "2px" }}
            >
              {budgetT("toolbar.addInvoice")}
            </Button>
          )}
        </Stack>
      </Stack>
      <ModalAddTime
        open={isOpenModalTime}
        onClose={hideModalTime}
        projectId={budget.project.id}
      />
      {activeTab === TABS.FEED && <Feed budget={budget} />}
      {activeTab === TABS.TIME && <Time />}
      {activeTab === TABS.EXPENSES && <Expenses />}
      {activeTab === TABS.INVOICES && <Invoice />}
    </Box>
  );
};
