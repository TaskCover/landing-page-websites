"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Clear, Search, Refresh } from "components/Filters";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import AddMembers from "./AddMembers";
import { useMembersOfProject } from "store/project/selectors";

const Actions = () => {
  const { filters, onGetMembersOfProject, pageSize, id } =
    useMembersOfProject();

  const filtersRef = useRef<Params>(filters);

  const pathname = usePathname();
  const { push } = useRouter();

  const onChangeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, value: any) => {
      if (!id) return;
      const newQueries = {
        ...filtersRef.current,
        [name]: value,
      };
      const path = getPath(pathname, newQueries);
      push(path);

      onGetMembersOfProject(id, { ...newQueries, pageIndex: 1, pageSize });
    },
    [id, onGetMembersOfProject, pageSize, pathname, push],
  );

  const onClear = () => {
    if (!id) return;

    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetMembersOfProject(id, newQueries);
  };

  const onRefresh = () => {
    if (!id) return;

    onGetMembersOfProject(id, { ...filters, pageIndex: 1, pageSize });
  };

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="grey.100"
      spacing={3}
      px={{ xs: 1, sm: 3 }}
      pb={1.5}
    >
      <AddMembers />
      <Stack direction="row" alignItems="center" spacing={3}>
        <Search
          placeholder="Search by email"
          name="email"
          onChange={onChangeData}
          value={filters?.email}
          emitWhenEnter
        />
        <Refresh onClick={onRefresh} />
        {!!Object.keys(filters).length && <Clear onClick={onClear} />}
      </Stack>
    </Stack>
  );
};

export default memo(Actions);
