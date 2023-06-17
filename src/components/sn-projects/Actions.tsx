"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { Clear, Dropdown, Refresh, Switch } from "components/Filters";
import { INITIAL_VALUES, STATUS_OPTIONS } from "./helpers";
import { useProjects } from "store/project/selectors";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import Form, { ProjectDataForm } from "./Form";
import { GetProjectListQueries } from "store/project/actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const Actions = () => {
  const { filters, onGetProjects, pageSize, pageIndex, onCreateProject } =
    useProjects();

  const [isShow, onShow, onHide] = useToggle();

  const filtersRef = useRef<Params>(filters);

  const pathname = usePathname();
  const { push } = useRouter();

  const onEmit = useCallback(
    (newQueries?: Params) => {
      const path = getPath(pathname, newQueries);
      push(path);
      onGetProjects(newQueries as GetProjectListQueries);
    },
    [onGetProjects, pathname, push],
  );

  const onChangeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, value: any) => {
      const newQueries = {
        ...filtersRef.current,
        [name]: name === "sort" && value ? LATEST_VALUE : value,
        pageIndex: 1,
        pageSize,
      };

      onEmit(newQueries);
    },
    [onEmit, pageSize],
  );

  const onRefresh = () => {
    onGetProjects({
      ...filters,
      pageIndex,
      pageSize,
    } as GetProjectListQueries);
  };

  const onClear = () => {
    onEmit({ pageIndex: 1, pageSize });
  };

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

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
          spacing={{ xs: 2, md: 0 }}
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
          pt={{ xs: 2, md: 1.25 }}
          direction={{ sm: "row" }}
          alignItems="center"
          width={{ xs: "100%", sm: "initial" }}
          spacing={3}
          py={1.25}
          px={2}
          borderRadius={1}
          border="1px solid"
          borderColor="grey.100"
          justifyContent="flex-end"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            pb={{ xs: 2, sm: 0 }}
          >
            <Switch
              name="sort"
              onChange={onChangeData}
              size="small"
              reverse
              label="Dự án gần đây"
              value={filters?.sort === LATEST_VALUE}
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
            options={STATUS_OPTIONS}
            name="status"
            onChange={onChangeData}
            value={filters?.status}
          />

          <Refresh onClick={onRefresh} />
          {!!Object.keys(filters).length && <Clear onClick={onClear} />}
        </Stack>
      </Stack>
      {isShow && (
        <Form
          open={isShow}
          onClose={onHide}
          type={DataAction.CREATE}
          initialValues={INITIAL_VALUES as unknown as ProjectDataForm}
          onSubmit={onCreateProject}
        />
      )}
    </>
  );
};

export default memo(Actions);

const LATEST_VALUE = "created_time=-1";
