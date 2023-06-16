"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { Search } from "components/Filters";
import { cleanObject, getPath } from "utils/index";
import { usePathname, useRouter } from "next/navigation";
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
      let newQueries = {
        ...filtersRef.current,
        [name]: value,
      };
      newQueries = cleanObject(newQueries);
      const path = getPath(pathname, newQueries);
      push(path);

      onGetMembersOfProject(id, { ...newQueries, pageIndex: 1, pageSize });
    },
    [id, onGetMembersOfProject, pageSize, pathname, push],
  );

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

      <Search
        placeholder="Tìm kiếm theo email"
        name="search"
        onChange={onChangeData}
        value={filters?.search}
      />
    </Stack>
  );
};

export default memo(Actions);
