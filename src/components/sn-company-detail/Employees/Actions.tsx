"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { Clear, Date, Dropdown, Refresh, Search } from "components/Filters";
import { formatNumber, getPath } from "utils/index";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { TEXT_STATUS } from "./components/helpers";
import { CompanyFilter } from "./components";
import { PaymentStatus } from "components/sn-employees/helpers";
import { useCompany, useEmployeesOfCompany } from "store/manager/selectors";

const Actions = () => {
  const { filters, onGetEmployees, pageSize, statistic } =
    useEmployeesOfCompany();

  const pathname = usePathname();
  const { push } = useRouter();
  const { id } = useParams();

  const [queries, setQueries] = useState<Params>({});

  const hasQueries = useMemo(() => {
    const queriesIgnoreCompany = { ...queries };
    delete queriesIgnoreCompany["company"];
    return !!Object.keys(queriesIgnoreCompany).length;
  }, [queries]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queries);
    push(path);

    onGetEmployees(id, { ...queries, pageIndex: 1, pageSize });
  };

  const onClear = () => {
    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetEmployees(id, newQueries);
  };

  const onRefresh = () => {
    onGetEmployees(id, { ...filters, pageIndex: 1, pageSize });
  };

  useEffect(() => {
    if (!id) return;
    setQueries(filters);
  }, [filters, id]);

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      alignItems={{ md: "center" }}
      justifyContent="space-between"
      spacing={3}
      px={{ xs: 1, md: 3 }}
      pb={3}
    >
      <Stack
        direction={{ xs: "row", md: "column" }}
        spacing={1}
        width="fit-content"
      >
        <Text variant="h6" color="grey.400" whiteSpace="nowrap">
          Staff paid:
          <Text
            component="span"
            variant="inherit"
            color="success.main"
            ml={0.5}
          >
            {formatNumber(statistic?.total_user_paid)}
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
            {formatNumber(statistic?.total_user_un_paid)}
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
          placeholder="Search by email..."
          name="email"
          onChange={onChangeQueries}
          value={queries?.email}
        />
        <Stack direction="row" alignItems="center" spacing={3}>
          <Date
            label="Creation date"
            name="date"
            onChange={onChangeQueries}
            value={queries?.date}
          />
          <Dropdown
            placeholder="Status"
            options={PAYMENT_OPTIONS}
            name="is_pay_user"
            onChange={onChangeQueries}
            value={Number(queries?.is_pay_user)}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Button size="small" onClick={onSearch} variant="secondary">
            Search
          </Button>
          <Refresh onClick={onRefresh} />
          {hasQueries && <Clear onClick={onClear} />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Actions);

const PAYMENT_OPTIONS = [
  { label: TEXT_STATUS[PaymentStatus.PAID], value: PaymentStatus.PAID },
  { label: TEXT_STATUS[PaymentStatus.UNPAID], value: PaymentStatus.UNPAID },
];
