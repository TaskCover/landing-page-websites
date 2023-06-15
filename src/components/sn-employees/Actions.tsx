"use client";

import React, { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { Button } from "components/shared";
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

const Actions = () => {
  const { filters, onGetEmployees, pageSize, onCreateEmployee } =
    useEmployees();
  const { options, onGetPositions, isFetching } = usePositions();

  const [isShow, onShow, onHide] = useToggle();

  const pathname = usePathname();
  const { push } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeData = (name: string, value: any) => {
    let newQueries = {
      ...filters,
      [name]: value,
    };
    newQueries = cleanObject(newQueries);
    const queryString = stringifyURLSearchParams(newQueries);
    push(`${pathname}${queryString}`);

    onGetEmployees({ ...newQueries, pageIndex: 1, pageSize });
  };

  useEffect(() => {
    onGetPositions();
  }, [onGetPositions]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={3}
        px={3}
        py={1.5}
      >
        <Button
          onClick={onShow}
          startIcon={<PlusIcon />}
          size="small"
          variant="primary"
        >
          Thêm mới nhân viên
        </Button>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Search
            placeholder="Tìm kiếm theo email"
            name="search"
            onChange={onChangeData}
          />
          <Dropdown
            placeholder="Chức vụ"
            options={options}
            name="status"
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
