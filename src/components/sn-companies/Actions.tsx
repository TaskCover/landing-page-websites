"use client";

import { memo, useEffect, useState, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { Clear, Date, Dropdown, Refresh, Search } from "components/Filters";
import { formatNumber, getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { CompanyStatus } from "store/company/actions";
import { TEXT_STATUS } from "./components/helpers";
import { useCompanies } from "store/manager/selectors";
import { useTranslations } from "next-intl";
import { DATE_FORMAT_HYPHEN, NS_COMMON, NS_MANAGER } from "constant/index";

const Actions = () => {
  const { filters, onGetCompanies, pageSize, statistic } = useCompanies();
  const commonT = useTranslations(NS_COMMON);
  const managerT = useTranslations(NS_MANAGER);
  const pathname = usePathname();
  const { push } = useRouter();

  const [queries, setQueries] = useState<Params>({});

  const paymentOptions = useMemo(
    () =>
      PAYMENT_OPTIONS.map((item) => ({ ...item, label: commonT(item.label) })),
    [commonT],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queries);
    push(path);

    onGetCompanies({ ...queries, pageIndex: 1, pageSize });
  };

  const onClear = () => {
    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetCompanies(newQueries);
  };

  const onRefresh = () => {
    onGetCompanies({ ...filters, pageIndex: 1, pageSize });
  };

  useEffect(() => {
    setQueries(filters);
  }, [filters]);

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      alignItems={{ md: "center" }}
      justifyContent="space-between"
      spacing={{ xs: 1.5, md: 3 }}
      px={{ xs: 1, md: 3 }}
      py={1.5}
    >
      <Stack
        direction={{ xs: "row", md: "column" }}
        spacing={1}
        width="fit-content"
      >
        <Text variant="h6" color="grey.400" whiteSpace="nowrap">
          {managerT("companyList.staffPaid")}:
          <Text
            component="span"
            variant="inherit"
            color="success.main"
            ml={0.5}
          >
            {formatNumber(statistic?.total_company_paid)}
          </Text>
        </Text>
        <Text variant="h6" color="grey.400" whiteSpace="nowrap">
          {managerT("companyList.totalStaff")}:
          <Text
            component="span"
            variant="inherit"
            color="text.primary"
            ml={0.5}
          >
            {formatNumber(statistic?.total_company)}
          </Text>
        </Text>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={{ xs: 1.5, md: 3 }}
        py={1.25}
        px={2}
        borderRadius={1}
        width={{ xs: "100%", md: "fit-content" }}
        border="1px solid"
        borderColor="grey.100"
        justifyContent="flex-end"
      >
        <Search
          placeholder={commonT("searchBy", { name: "email" })}
          name="email"
          onChange={onChangeQueries}
          value={queries?.email}
        />
        <Stack direction="row" alignItems="center" spacing={3}>
          <Date
            label={commonT("creationDate")}
            name="created_time"
            onChange={onChangeQueries}
            value={queries?.created_time}
            format={DATE_FORMAT_HYPHEN}
          />
          <Dropdown
            placeholder={commonT("status")}
            options={paymentOptions}
            name="status"
            onChange={onChangeQueries}
            value={Number(queries?.status)}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Button size="small" onClick={onSearch} variant="secondary">
            {commonT("search")}
          </Button>
          <Refresh onClick={onRefresh} />
          {!!Object.keys(queries).length && <Clear onClick={onClear} />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Actions);

const PAYMENT_OPTIONS = [
  { label: TEXT_STATUS[CompanyStatus.APPROVE], value: CompanyStatus.APPROVE },
  { label: TEXT_STATUS[CompanyStatus.REJECT], value: CompanyStatus.REJECT },
  { label: TEXT_STATUS[CompanyStatus.WAITING], value: CompanyStatus.WAITING },
];
