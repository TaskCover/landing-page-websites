"use client";
import { Stack } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { TabInfo, TopContent } from "./components";

import FixedLayout from "components/FixedLayout";
import useQueryParams from "hooks/useQueryParams";
import { useParams } from "next/navigation";
import { useAuth } from "store/app/selectors";
import { Service } from "store/billing/reducer";
import {
  useBillings,
  useBudgets,
  useServiceBudgets,
} from "store/billing/selectors";
import { useEmployeeOptions, useEmployees } from "store/company/selectors";
import { useTagOptions } from "store/tags/selector";

const InformationBillingPage = () => {
  const { item, onGetBilling, updateStatus } = useBillings();
  const { tagsOptions } = useTagOptions();
  const { arrService, sumAmount, onGetServiceBudgets } = useServiceBudgets();
  const { budgets, onGetBudgets } = useBudgets();
  const { initQuery, isReady, query } = useQueryParams();
  const { options, onGetOptions } = useEmployeeOptions();
  // const { memberOptions } = useGetMemberOptions();
  const { user } = useAuth();

  const param = useParams();

  const [newServices, setNewServices] = useState<Service[]>([]);
  const id = param?.id.toString();
  useEffect(() => {
    onGetBilling(id ?? "");
  }, [onGetBilling, updateStatus]);

  useEffect(() => {
    if (!isReady) return;
    onGetBudgets({ ...initQuery });
  }, [initQuery, isReady, onGetBudgets]);

  useEffect(() => {
    if (budgets && budgets?.length > 0) {
      budgets?.forEach((item) => {
        onGetServiceBudgets(item.id ?? "");
      });
    }
  }, [budgets]);

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, []);

  return (
    <FixedLayout
      maxHeight={920}
      maxWidth={{
        xs: 1120,
        xl: 1450,
      }}
      overflow={"auto"}
    >
      <Stack gap={2} spacing={2}>
        <TopContent
          tagsOptions={tagsOptions}
          item={item}
          memberOptions={options}
        />

        <TabInfo
          arrService={arrService}
          item={item}
          user={user}
          arrBudgets={budgets}
        />
      </Stack>
    </FixedLayout>
  );
};
export default memo(InformationBillingPage);
