"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { Dropdown, Search } from "components/Filters";
import { TEXT_STATUS } from "./helpers";
import { cleanObject, stringifyURLSearchParams } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import Form from "./Form";
import { useEmployees } from "store/company/selectors";
import { usePositions } from "store/global/selectors";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const Actions = () => {
  const { filters, onGetEmployees, pageSize, onCreateEmployee } =
    useEmployees();
  const { options, onGetPositions, isFetching } = usePositions();

  const filtersRef = useRef<Params>(filters);

  const [isShow, onShow, onHide] = useToggle();

  const pathname = usePathname();
  const { push } = useRouter();

  const onChangeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, value: any) => {
      let newQueries = {
        ...filtersRef.current,
        [name]: value,
      };
      newQueries = cleanObject(newQueries);
      const queryString = stringifyURLSearchParams(newQueries);
      push(`${pathname}${queryString}`);

      onGetEmployees({ ...newQueries, pageIndex: 1, pageSize });
    },
    [onGetEmployees, pageSize, pathname, push],
  );

  useEffect(() => {
    onGetPositions();
  }, [onGetPositions]);
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
          spacing={2}
        >
          <Text variant="h4">Danh sách nhân viên</Text>
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
          direction={{ xs: "column", md: "row" }}
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
            name="search"
            onChange={onChangeData}
            value={filters?.search}
          />
          <Stack direction="row" alignItems="center" spacing={3}>
            <Dropdown
              placeholder="Chức vụ"
              options={options}
              name="position"
              onChange={onChangeData}
              value={filters?.position}
              pending={isFetching}
            />
            <Dropdown
              placeholder="Trạng thái"
              options={PAYMENT_OPTIONS}
              name="status"
              onChange={onChangeData}
              value={filters?.status}
            />
          </Stack>
        </Stack>
      </Stack>
      <Form
        open={isShow}
        onClose={onHide}
        type={DataAction.CREATE}
        initialValues={INITIAL_VALUES}
        onSubmit={onCreateEmployee}
      />
    </>
  );
};

export default memo(Actions);

const PAYMENT_OPTIONS = [
  { label: TEXT_STATUS[1], value: "true" },
  { label: TEXT_STATUS[0], value: "false" },
];

const INITIAL_VALUES = {
  email: "",
  position: "",
};
