"use client";
import { Box, Stack } from "@mui/material";
import { memo, useEffect } from "react";
import { TabList, TopContent } from "./components";

import FixedLayout from "components/FixedLayout";
import { useBillings, useServiceBudgets } from "store/billing/selectors";
import { useParams } from "next/navigation";
import { useTagOptions, useTags } from "store/tags/selector";
import { useAuth } from "store/app/selectors";

const InformationBillingPage = () => {
  const { item, onGetBilling } = useBillings();
  const { onSearchTags, tagsOptions } = useTagOptions();
  const { arrService, sumAmount, onGetServiceBudgets } = useServiceBudgets();
  const { user } = useAuth();

  const param = useParams();

  useEffect(() => {
    const idParam = Array.isArray(param?.id) ? param?.id.join(",") : param?.id;
    onGetBilling(idParam ?? "");
  }, [onGetBilling, param?.id]);

  // useEffect(() => {
  //   // onGetBilling(param);
  //   onSearchTags("");
  // }, [onSearchTags]);

  // useEffect(() => {
  //   onGetServiceBudgets(item?.budget[0].id ?? "");
  // }, [onGetServiceBudgets, item]);

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
        <TopContent tagsOptions={tagsOptions} />
        <TabList arrService={arrService} item={item} user={user} />
      </Stack>
    </FixedLayout>
  );
};
export default memo(InformationBillingPage);
