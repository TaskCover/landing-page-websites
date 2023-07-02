"use client";

import { memo, useMemo, useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { Clear, Dropdown, Refresh, Search } from "components/Filters";
import { TEXT_STATUS } from "./helpers";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import useToggle from "hooks/useToggle";
import { DataAction, PayStatus } from "constant/enums";
import Form from "./Form";
import { useEmployees } from "store/company/selectors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { GetEmployeeListQueries } from "store/company/actions";
import { usePositionOptions } from "store/global/selectors";
import { NS_COMPANY, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";

const Actions = () => {
  const {
    options,
    onGetOptions,
    isFetching: positionOptionsIsFetching,
    totalPages: positionOptionsTotalPages,
    pageSize: positionOptionsPageSize,
    pageIndex: positionOptionsPageIndex,
  } = usePositionOptions();
  const companyT = useTranslations(NS_COMPANY);
  const commonT = useTranslations(NS_COMMON);

  const { filters, onGetEmployees, pageSize, onCreateEmployee } =
    useEmployees();

  const [isShow, onShow, onHide] = useToggle();

  const pathname = usePathname();
  const { push } = useRouter();

  const [queries, setQueries] = useState<Params>({});

  const paymentOptions = useMemo(
    () =>
      PAYMENT_OPTIONS.map((item) => ({ ...item, label: companyT(item.label) })),
    [companyT],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queries);
    push(path);

    onGetEmployees({ ...queries, pageIndex: 1, pageSize });
  };

  const onClear = () => {
    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetEmployees(newQueries);
  };

  const onRefresh = () => {
    onGetEmployees({ ...filters, pageIndex: 1, pageSize });
  };

  const onEndReached = () => {
    if (
      positionOptionsIsFetching ||
      (positionOptionsTotalPages &&
        positionOptionsPageIndex >= positionOptionsTotalPages)
    )
      return;
    onGetOptions({
      pageSize: positionOptionsPageSize,
      pageIndex: positionOptionsPageIndex + 1,
    });
  };

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);

  useEffect(() => {
    setQueries(filters);
  }, [filters]);

  return (
    <>
      <Stack
        direction={{ md: "row" }}
        alignItems={{ md: "center" }}
        justifyContent="space-between"
        spacing={{ xs: 1, md: 3 }}
        px={{ xs: 1, md: 3 }}
        py={1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={{ xs: 2, md: 0 }}
        >
          <Text variant="h4" display={{ md: "none" }}>
            {companyT("employees.title")}
          </Text>
          <Button
            onClick={onShow}
            startIcon={<PlusIcon />}
            size="small"
            variant="primary"
          >
            {commonT("createNew")}
          </Button>
        </Stack>

        <Stack
          direction={{ md: "row" }}
          alignItems="center"
          spacing={{ xs: 1.5, md: 3 }}
          py={1.25}
          px={2}
          borderRadius={1}
          width={{ xs: "100%", md: undefined }}
          border="1px solid"
          borderColor="grey.100"
          justifyContent="flex-end"
        >
          <Search
            placeholder={commonT("searchBy", { name: "email" })}
            name="email"
            onChange={onChangeQueries}
            value={queries?.email}
            sx={{ width: 200 }}
          />
          <Stack direction="row" alignItems="center" spacing={3}>
            <Dropdown
              placeholder={commonT("position")}
              options={options}
              name="position"
              onChange={onChangeQueries}
              value={queries?.position}
              pending={positionOptionsIsFetching}
              onEndReached={onEndReached}
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
      {isShow && (
        <Form
          open={isShow}
          onClose={onHide}
          type={DataAction.CREATE}
          initialValues={INITIAL_VALUES}
          onSubmit={onCreateEmployee}
        />
      )}
    </>
  );
};

export default memo(Actions);

const PAYMENT_OPTIONS = [
  { label: TEXT_STATUS[1], value: PayStatus.PAID },
  { label: TEXT_STATUS[2], value: PayStatus.UNPAID },
  { label: TEXT_STATUS[3], value: PayStatus.WAITING },
];

const INITIAL_VALUES = {
  email: "",
  position: "",
};
