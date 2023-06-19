"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { Clear, Date, Dropdown, Refresh, Search } from "components/Filters";
import { formatNumber, getPath } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
import { useCompanies } from "store/company/selectors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { CompanyStatus } from "store/company/actions";
import { TEXT_STATUS } from "./components/helpers";

const Actions = () => {
  const { filters, onGetCompanies, pageSize, statistic } = useCompanies();

  const filtersRef = useRef<Params>(filters);

  const pathname = usePathname();
  const { push } = useRouter();

  const onChangeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, value: any) => {
      const newQueries = {
        ...filtersRef.current,
        [name]: value,
      };
      const path = getPath(pathname, newQueries);
      push(path);

      onGetCompanies({ ...newQueries, pageIndex: 1, pageSize });
    },
    [onGetCompanies, pageSize, pathname, push],
  );

  const onClear = () => {
    onGetCompanies({ pageIndex: 1, pageSize });
  };

  const onRefresh = () => {
    onGetCompanies({ ...filters, pageIndex: 1, pageSize });
  };

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={3}
      px={{ xs: 1, md: 3 }}
      py={1.5}
    >
      <Stack spacing={1} width="fit-content">
        <Text variant="h6" color="grey.400" whiteSpace="nowrap">
          Staff paid:
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
          Total staff:
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
        spacing={3}
        py={1.25}
        px={2}
        borderRadius={1}
        width={{ xs: "100%", md: "fit-content" }}
        border="1px solid"
        borderColor="grey.100"
        justifyContent="flex-end"
      >
        <Search
          placeholder="Tìm kiếm theo email"
          name="search"
          onChange={onChangeData}
          value={filters?.search}
        />
        <Stack direction="row" alignItems="center" spacing={3}>
          <Date
            label="Creation date"
            name="date"
            onChange={onChangeData}
            value={filters?.date}
          />
          <Dropdown
            placeholder="Trạng thái"
            options={PAYMENT_OPTIONS}
            name="status"
            onChange={onChangeData}
            value={filters?.status}
          />
          <Refresh onClick={onRefresh} />
          {!!Object.keys(filters).length && <Clear onClick={onClear} />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Actions);

const PAYMENT_OPTIONS = [
  { label: TEXT_STATUS[CompanyStatus.APPROVE], value: CompanyStatus.APPROVE },
  { label: TEXT_STATUS[CompanyStatus.REJECT], value: CompanyStatus.REJECT },
];
