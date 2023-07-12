"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { Clear, Date, Refresh } from "components/Filters";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import { useStatementHistory } from "store/manager/selectors";
import { Button } from "components/shared";
import { GetStatementHistoryQueries } from "store/manager/actions";
import { NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";

const Actions = () => {
  const { filters, onGetStatementHistory, pageSize, pageIndex } =
    useStatementHistory();
  const commonT = useTranslations(NS_COMMON);

  const [fields, setFields] = useState<{ start?: string; end?: string }>({});

  const pathname = usePathname();
  const { push } = useRouter();

  const disabled = useMemo(
    () => Object.values(fields).some((value) => !value),
    [fields],
  );

  const onChangeData = (name: string, value?: string) => {
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const onSearch = () => {
    const newQueries = {
      ...filters,
      ...fields,
    };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetStatementHistory({ ...newQueries, pageIndex: 1, pageSize });
  };

  const onRefresh = () => {
    onGetStatementHistory({
      ...filters,
      pageIndex,
      pageSize,
    } as GetStatementHistoryQueries);
  };

  const onClear = () => {
    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetStatementHistory({ ...newQueries, ...newQueries });
  };

  useEffect(() => {
    setFields((prevFields) => ({
      ...prevFields,
      start: filters?.start,
      end: filters?.end,
    }));
  }, [filters?.start, filters?.end]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      spacing={{ xs: 1.5, md: 3 }}
      py={1.25}
      px={2}
      borderRadius={1}
      width={{ xs: "100%", md: "fit-content" }}
      border="1px solid"
      borderColor="grey.100"
      justifyContent="flex-end"
      alignSelf="flex-end"
      m={3}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Date
          label="Start day"
          name="start"
          onChange={onChangeData}
          value={fields?.start}
        />
        <Date
          label="End day"
          name="end"
          onChange={onChangeData}
          value={fields?.end}
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={3}>
        <Button disabled={disabled} onClick={onSearch} variant="secondary">
          {commonT("search")}
        </Button>
        <Refresh onClick={onRefresh} />
        {!!Object.keys(filters).length && <Clear onClick={onClear} />}
      </Stack>
    </Stack>
  );
};

export default memo(Actions);
