"use client";
import Form from "./Form";
import PlusIcon from "icons/PlusIcon";
import useToggle from "hooks/useToggle";
import { Button, Text } from "components/shared";
import { Dropdown, Search } from "components/Filters";
import { DataAction, PayStatus } from "constant/enums";
import { getPath } from "utils/index";
import { memo, useEffect, useMemo, useState } from "react";
import { NS_COMMON, NS_COMPANY, NS_DOCS } from "constant/index";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Stack } from "@mui/material";
import { TEXT_STATUS } from "../sn-employees/helpers";
import { useEmployees } from "store/company/selectors";
import { usePathname, useRouter } from "next-intl/client";
import { usePositionOptions } from "store/global/selectors";
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
  const docsT = useTranslations(NS_DOCS);

  const { filters, onGetEmployees, pageSize, onCreateEmployee } =
    useEmployees();

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
        direction={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
        justifyContent="space-between"
        spacing={{ xs: 1, md: 3 }}
        px={{ xs: 0, md: 3 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={{ xs: 2, md: 0 }}
        >
          <Text variant="h4" display={{ md: "none" }}>
            {docsT("title")}
          </Text>
          <Button
            startIcon={<PlusIcon />}
            size="extraSmall"
            variant="primary"
            sx={{ height: 32, px: ({ spacing }) => `${spacing(2)}!important` }}
          >
            {docsT("button.add")}
          </Button>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          py={{ xs: 1.25, md: 0.5, lg: 1.25 }}
          px={{ md: 1, lg: 2 }}
          borderRadius={1}
          width={{ xs: "100%", md: "100%" }}
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
          maxWidth={{ xs: "100%", md: "fit-content" }}
          overflow="auto"
          minWidth={{ md: "fit-content" }}
        >
          <Search
            placeholder={docsT("filter.search", { name: "email" })}
            name="email"
            onChange={onChangeQueries}
            value={queries?.email}
            sx={{ width: 200, minWidth: 200 }}
          />
          <Dropdown
            placeholder={docsT("filter.all") + ` (2)`}
            options={options}
            name="position"
            onChange={onChangeQueries}
            value={queries?.position}
            pending={positionOptionsIsFetching}
            onEndReached={onEndReached}
          />
          <Dropdown
            placeholder={docsT("filter.fields")}
            options={paymentOptions}
            name="status"
            onChange={onChangeQueries}
            value={Number(queries?.status)}
          />
          <Dropdown
            placeholder={docsT("filter.group.group")}
            options={paymentOptions}
            name="status"
            onChange={onChangeQueries}
            value={Number(queries?.status)}
          />
          <Dropdown
            placeholder={docsT("filter.filter.filter")}
            options={paymentOptions}
            name="status"
            onChange={onChangeQueries}
            value={Number(queries?.status)}
          />
          <Button
            size="extraSmall"
            sx={{
              display: { xs: "none", md: "flex" },
              height: 32,
              px: ({ spacing }) => `${spacing(2)}!important`,
            }}
            onClick={onSearch}
            variant="secondary"
          >
            {commonT("search")}
          </Button>
        </Stack>
        <Button
          size="small"
          sx={{ height: 40, display: { md: "none" }, width: "fit-content" }}
          onClick={onSearch}
          variant="secondary"
        >
          {commonT("search")}
        </Button>
      </Stack>
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
