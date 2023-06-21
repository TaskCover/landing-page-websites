"use client";

import { memo, useState, useEffect, useRef, use, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import { Clear, Dropdown, Refresh, Switch } from "components/Filters";
import { INITIAL_VALUES, STATUS_OPTIONS } from "./components/helpers";
import { useProjects } from "store/project/selectors";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
import Form, { ProjectDataForm } from "./Form";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT } from "constant/index";

const Actions = () => {
  const { filters, onGetProjects, pageSize, onCreateProject } = useProjects();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const pathname = usePathname();
  const { push } = useRouter();
  const [isShow, onShow, onHide] = useToggle();

  const [queries, setQueries] = useState<Params>({});

  const statusOptions = useMemo(
    () =>
      STATUS_OPTIONS.map((item) => ({ ...item, label: commonT(item.label) })),
    [commonT],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]:
        name === "sort" && value
          ? LATEST_VALUE
          : name === "sort"
          ? undefined
          : value,
    }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queries);
    push(path);

    onGetProjects({ ...queries, pageIndex: 1, pageSize });
  };

  const onClear = () => {
    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetProjects(newQueries);
  };

  const onRefresh = () => {
    onGetProjects({ ...filters, pageIndex: 1, pageSize });
  };

  useEffect(() => {
    setQueries(filters);
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
            {projectT("list.title")}
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
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            pb={{ xs: 2, sm: 0 }}
          >
            <Switch
              name="sort"
              onChange={onChangeQueries}
              size="small"
              reverse
              label={projectT("list.filter.recent")}
              value={queries?.sort === LATEST_VALUE}
            />
            <Switch
              name="saved"
              onChange={onChangeQueries}
              size="small"
              reverse
              label={projectT("list.filter.saved")}
              value={queries?.saved}
            />
            <Dropdown
              placeholder={commonT("status")}
              options={statusOptions}
              name="status"
              onChange={onChangeQueries}
              value={queries?.status}
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
          initialValues={INITIAL_VALUES as unknown as ProjectDataForm}
          onSubmit={onCreateProject}
        />
      )}
    </>
  );
};

export default memo(Actions);

const LATEST_VALUE = "created_time=-1";
