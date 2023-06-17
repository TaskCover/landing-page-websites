"use client";

import { TabList } from "components/sn-company-detail/components";
import { COMPANIES_PATH } from "constant/paths";
import { useEffect, useRef } from "react";
import { useHeaderConfig } from "store/app/selectors";
import { useCompanies, useCompany } from "store/company/selectors";
import { getPath } from "utils/index";

type CompanyDetailLayoutProps = {
  children: React.ReactNode;
  id: string;
};

const CompanyDetailLayout = ({ children, id }: CompanyDetailLayoutProps) => {
  const { onGetCompany, item } = useCompany();
  const { filters, pageIndex, pageSize } = useCompanies();
  const { onUpdateHeaderConfig } = useHeaderConfig();

  const dataStringifyRef = useRef<string | undefined>();

  useEffect(() => {
    if (!id) return;
    onGetCompany(id);
  }, [id, onGetCompany]);

  useEffect(() => {
    dataStringifyRef.current = JSON.stringify({
      ...filters,
      pageIndex,
      pageSize,
    });
  }, [filters, pageIndex, pageSize]);

  useEffect(() => {
    const parsedQueries = dataStringifyRef.current
      ? JSON.parse(dataStringifyRef.current)
      : {};

    const prevPath = getPath(COMPANIES_PATH, parsedQueries);

    onUpdateHeaderConfig({
      title: item?.name,
      searchPlaceholder: undefined,
      prevPath,
    });
    return () => {
      onUpdateHeaderConfig({ title: undefined, searchPlaceholder: undefined });
    };
  }, [item?.name, onUpdateHeaderConfig]);

  return (
    <>
      <TabList />
      {children}
    </>
  );
};

export default CompanyDetailLayout;
