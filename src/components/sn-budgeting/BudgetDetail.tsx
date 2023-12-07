"use client";

import { useParams } from "next/navigation";
import { useBudgetByIdQuery } from "../../queries/budgeting/get-by-id";
import React, { useEffect, useState } from "react";
import { TBudget } from "store/project/budget/action";
import { Box, CircularProgress, Stack } from "@mui/material";
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
import { Recurring } from "./TabDetail/Recurring";
import { Service } from "./TabDetail/Service";
import EditIcon from "icons/EditIcon";

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
  const [isShowLoadingTab, openLoadingTab, hideLoadingTab] = useToggle();
  const [budget, setBudget] = useState<TBudget | null>(null);
  const [activeTab, setActiveTab] = useState<string>(TABS.SERVICES);
  const { id } = useParams();

  const budgetDetailQuery = useBudgetByIdQuery(String(id));
  const budgetT = useTranslations(NS_BUDGETING);

  useEffect(() => {
    if (budgetDetailQuery) {
      setBudget(budgetDetailQuery.data);
    }
  }, [budgetDetailQuery]);

  const changeActiveTab = (newTab: string) => {
    if (window["timeoutHideLoadingTab"]) {
      clearTimeout(window["timeoutHideLoadingTab"]);
    }
    openLoadingTab();
    setActiveTab(newTab);
    window["timeoutHideLoadingTab"] = setTimeout(hideLoadingTab, 500);
  };

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
                onClick={() => changeActiveTab(currentTab)}
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
          {activeTab === TABS.SERVICES && (
            <Button
              onClick={() => {}}
              id="budget_edit_service"
              startIcon={<EditIcon />}
              variant="primary"
              size="small"
              sx={{ height: "40px", mx: "2px" }}
            >
              {budgetT("toolbar.serviceEdit")}
            </Button>
          )}
        </Stack>
      </Stack>
      <ModalAddTime
        open={isOpenModalTime}
        onClose={hideModalTime}
        projectId={budget.project.id}
      />
      <Box position="relative">
        <Stack
          p="50px"
          alignItems="center"
          position="absolute"
          width="100%"
          top={0}
          left={0}
          display={isShowLoadingTab ? "flex" : "none"}
        >
          <CircularProgress />
        </Stack>
        <Box sx={{ opacity: isShowLoadingTab ? 0 : 1 }}>
          {activeTab === TABS.FEED && <Feed budget={budget} />}
          {activeTab === TABS.TIME && <Time />}
          {activeTab === TABS.EXPENSES && <Expenses />}
          {activeTab === TABS.INVOICES && <Invoice />}
          {activeTab === TABS.RECURRING && <Recurring />}
          {activeTab === TABS.SERVICES && <Service />}
        </Box>
      </Box>
    </Box>
  );
};
