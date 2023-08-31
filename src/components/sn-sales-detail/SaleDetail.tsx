"use client";
import FixedLayout from "components/FixedLayout";
import React, { use, useEffect, useState } from "react";
import TabList, { SALES_DETAIL_TAB } from "./components/TabList/TabList";
import TabHeader from "./components/TabHeader/TabHeader";
import { useFetchDealDetail } from "./hooks/useGetDealDetail";
import { TabContext, TabPanel } from "@mui/lab";
import SaleFeed from "./sn-feed";
import { useForm, useFormContext } from "react-hook-form";
import { Sales } from "store/sales/reducer";
import { useSaleDetail } from "store/sales/selectors";
import Loading from "components/Loading";

const SalesDetail = () => {
  const [tab, setTab] = useState<SALES_DETAIL_TAB>(SALES_DETAIL_TAB.FEED);
  const { getValues, resetField, reset } = useFormContext();
  const onChangeTab = (e: React.SyntheticEvent, newTab: SALES_DETAIL_TAB) => {
    setTab(newTab);
  };
  const id = getValues("id");

  useFetchDealDetail(id);
  const { saleDetail, isFetching } = useSaleDetail();

  useEffect(() => {
    reset({
      ...saleDetail,
      id,
    });
    return reset();
  }, [saleDetail]);

  if (isFetching) return <Loading open />;

  return (
    <>
      <FixedLayout>
        <TabHeader />
        <TabList value={tab} onChange={onChangeTab} />
        <TabContext value={tab}>
          <TabPanel value={SALES_DETAIL_TAB.FEED}>
            <SaleFeed />
          </TabPanel>
          <TabPanel value={SALES_DETAIL_TAB.SERVICE}>Item Two</TabPanel>
        </TabContext>
      </FixedLayout>
    </>
  );
};

export default SalesDetail;
