"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { Date, Dropdown, Search } from "components/Filters";
import { formatNumber, getPath } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
import { useCompanies, useEmployees } from "store/company/selectors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { CompanyStatus } from "store/company/actions";
import { TEXT_STATUS } from "./components/helpers";
import { CompanyFilter } from "./components";

const Actions = () => {
  const { filters, onGetEmployees, pageSize } = useEmployees();

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

      onGetEmployees({ ...newQueries, pageIndex: 1, pageSize });
    },
    [onGetEmployees, pageSize, pathname, push],
  );

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="grey.100"
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
            {formatNumber(13523)}
          </Text>
        </Text>
        <Text variant="h6" color="grey.400" whiteSpace="nowrap">
          Staff unpaid:
          <Text
            component="span"
            variant="inherit"
            color="text.primary"
            ml={0.5}
          >
            {formatNumber(13523)}
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
          value={filters?.email}
        />
        <Stack direction="row" alignItems="center" spacing={3}>
          <CompanyFilter onChange={onChangeData} value={filters?.company} />
          <Dropdown
            placeholder="Trạng thái"
            options={PAYMENT_OPTIONS}
            name="status"
            onChange={onChangeData}
            value={Number(filters?.status)}
          />
          <Date
            label="Creation date"
            name="date"
            onChange={onChangeData}
            value={filters?.date}
          />
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
