"use client";

import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { Dropdown, Switch } from "components/Filters";
import { ProjectStatus, TEXT_STATUS } from "./helpers";
import { useProjects } from "store/project/selectors";
import { cleanObject, stringifyURLSearchParams } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import Form from "./Form";
import { ProjectData } from "store/project/actions";

const Actions = () => {
  const { filters, onGetProjects, pageSize } = useProjects();

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

    onGetProjects({ ...newQueries, pageIndex: 1, pageSize });
  };

  return (
    <>
      <Stack
        direction={{ md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={3}
        px={3}
        py={1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={2}
        >
          <Text variant="h4" display={{ md: "none" }}>
            Quản lý dự án
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
          pt={{ xs: 2, md: 0 }}
          direction={{ sm: "row" }}
          alignItems="center"
          justifyContent={{ xs: "space-between", sm: undefined }}
          width={{ xs: "100%", sm: undefined }}
          spacing={3}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            pb={{ xs: 2, sm: 0 }}
          >
            <Switch
              name="latest"
              onChange={onChangeData}
              size="small"
              reverse
              label="Dự án gần đây"
              value={filters?.latest}
            />
            <Switch
              name="saved"
              onChange={onChangeData}
              size="small"
              reverse
              label="Dự án đã lưu"
              value={filters?.saved}
            />
          </Stack>

          <Dropdown
            placeholder="Trạng thái"
            options={OPTIONS}
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
        onSubmit={async () => {
          //
        }}
      />
    </>
  );
};

export default memo(Actions);

const OPTIONS = [
  { label: TEXT_STATUS.ACTIVE, value: ProjectStatus.ACTIVE },
  { label: TEXT_STATUS.PAUSE, value: ProjectStatus.PAUSE },
  { label: TEXT_STATUS.CLOSE, value: ProjectStatus.CLOSE },
];

const INITIAL_VALUES = {
  name: "",
  owner: "",
  start_date: "",
  end_date: "",
  expected_cost: "",
  working_hours: "",
  description: "",
  members: [],
  type_project: "",
} as unknown as ProjectData;
