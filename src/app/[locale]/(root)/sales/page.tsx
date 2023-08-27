import Wrapper from "components/Wrapper";
import SalesPage from "components/sn-sales";
import { NS_SALES } from "constant/index";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_SALES);

  return {
    title: t("list.head.title"),
  };
}

const Sales = () => {
  return (
    <Wrapper>
      <SalesPage />
    </Wrapper>
  );
};

export default Sales;
