"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { Clear, Date, Dropdown, Refresh, Search } from "components/Filters";
import { formatNumber, getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { TEXT_STATUS } from "./components/helpers";
import { useEmployeesOfCompany } from "store/manager/selectors";
import { useParams } from "next/navigation";
import { DATE_FORMAT_HYPHEN, NS_COMMON, NS_MANAGER } from "constant/index";
import { useTranslations } from "next-intl";
import { PayStatus } from "constant/enums";

const Actions = () => {
  const { filters, onGetEmployees, pageSize, statistic } =
    useEmployeesOfCompany();
  const commonT = useTranslations(NS_COMMON);
  const managerT = useTranslations(NS_MANAGER);

  const pathname = usePathname();
  const { push } = useRouter();
  const { id } = useParams();

  const [queries, setQueries] = useState<Params>({});

  const paymentOptions = useMemo(
    () =>
      PAYMENT_OPTIONS.map((item) => ({ ...item, label: commonT(item.label) })),
    [commonT],
  );

  const queriesIgnoreCompany = useMemo(() => {
    const _queriesIgnoreCompany = { ...queries };
    delete _queriesIgnoreCompany["company"];
    return _queriesIgnoreCompany;
  }, [queries]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queriesIgnoreCompany);
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
      spacing={{ xs: 1.5, md: 3 }}
      p={{ xs: 1, md: 3 }}
    >
      <Stack spacing={1} width="fit-content">
        <Text variant="h6" color="grey.400" whiteSpace="nowrap">
          {managerT("employeeList.staffPaid")}:
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
          {managerT("employeeList.staffUnpaid")}:
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
          {!!Object.keys(queriesIgnoreCompany).length && (
            <Clear onClick={onClear} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Actions);
const PAYMENT_OPTIONS = [
  { label: TEXT_STATUS[1], value: PayStatus.PAID },
  { label: TEXT_STATUS[2], value: PayStatus.UNPAID },
  { label: TEXT_STATUS[3], value: PayStatus.WAITING },
];
