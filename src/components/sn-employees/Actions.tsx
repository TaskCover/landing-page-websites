"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { Clear, Dropdown, Refresh, Search } from "components/Filters";
import { PaymentStatus, TEXT_STATUS } from "./helpers";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import Form from "./Form";
import { useEmployees } from "store/company/selectors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { GetEmployeeListQueries } from "store/company/actions";
import { usePositionOptions } from "store/global/selectors";

const Actions = () => {
  const { filters, onGetEmployees, pageSize, pageIndex, onCreateEmployee } =
    useEmployees();
  const {
    options,
    onGetOptions,
    isFetching: positionOptionsIsFetching,
    totalPages: positionOptionsTotalPages,
    pageSize: positionOptionsPageSize,
    pageIndex: positionOptionsPageIndex,
  } = usePositionOptions();

  const filtersRef = useRef<Params>(filters);

  const [isShow, onShow, onHide] = useToggle();

  const pathname = usePathname();
  const { push } = useRouter();

  const onEmit = useCallback(
    (newQueries?: Params) => {
      const path = getPath(pathname, newQueries);
      push(path);
      onGetEmployees(newQueries as GetEmployeeListQueries);
    },
    [onGetEmployees, pathname, push],
  );

  const onChangeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, value: any) => {
      const newQueries = {
        ...filtersRef.current,
        [name]: value,
        pageIndex: 1,
        pageSize,
      };

      onEmit(newQueries);
    },
    [onEmit, pageSize],
  );

  const onRefresh = () => {
    onGetEmployees({
      ...filters,
      pageIndex,
      pageSize,
    } as GetEmployeeListQueries);
  };

  const onClear = () => {
    onEmit({ pageIndex: 1, pageSize });
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
    filtersRef.current = filters;
  }, [filters]);

  return (
    <>
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={{ xs: 2, md: 0 }}
        >
          <Text variant="h4" display={{ md: "none" }}>
            Danh sách nhân viên
          </Text>
          <Button
            onClick={onShow}
            startIcon={<PlusIcon />}
            size="small"
            variant="primary"
          >
            Thêm mới
          </Button>
        </Stack>

        <Stack
          direction={{ md: "row" }}
          alignItems="center"
          spacing={3}
          py={1.25}
          px={2}
          borderRadius={1}
          width={{ xs: "100%", md: undefined }}
          border="1px solid"
          borderColor="grey.100"
          justifyContent="flex-end"
        >
          <Search
            placeholder="Tìm kiếm theo email"
            name="email"
            onChange={onChangeData}
            value={filters?.email}
            sx={{ width: 200 }}
          />
          <Stack direction="row" alignItems="center" spacing={3}>
            <Dropdown
              placeholder="Chức vụ"
              options={options}
              name="position"
              onChange={onChangeData}
              value={filters?.position}
              pending={positionOptionsIsFetching}
              onEndReached={onEndReached}
            />
            <Dropdown
              placeholder="Trạng thái"
              options={PAYMENT_OPTIONS}
              name="is_pay_user"
              onChange={onChangeData}
              value={Number(filters?.is_pay_user)}
            />
            <Refresh onClick={onRefresh} />
            {!!Object.keys(filters).length && <Clear onClick={onClear} />}
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
  { label: TEXT_STATUS[1], value: PaymentStatus.PAID },
  { label: TEXT_STATUS[0], value: PaymentStatus.UNPAID },
];

const INITIAL_VALUES = {
  email: "",
  position: "",
};
