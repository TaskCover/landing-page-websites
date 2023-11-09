/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PlusIcon from "icons/PlusIcon";
import { Button, Text } from "components/shared";
import { Dropdown, Search } from "components/Filters";
import { getPath } from "utils/index";
import { memo, useEffect, useMemo, useState } from "react";
import { NS_COMMON, NS_COMPANY, NS_DOCS } from "constant/index";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Box, Stack } from "@mui/material";
import { usePathname, useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { useDocs } from "store/docs/selectors";
import NoneIcon from "icons/NoneIcon";
import FilterSearchDocs from "./FilterSearchDocs/FilterSearchDocs";

const Actions = () => {
  const companyT = useTranslations(NS_COMPANY);
  const commonT = useTranslations(NS_COMMON);
  const docsT = useTranslations(NS_DOCS);
  const { filters, onCreateDoc, loading } = useDocs();

  const pathname = usePathname();
  const { push } = useRouter();

  const [queries, setQueries] = useState<Params>({});

  const grOptions = useMemo(
    () => Group_OPTIONS.map((item) => ({ ...item, label: docsT(item.label) })),
    [companyT],
  );

  const filterOptions = useMemo(
    () => Filter_Options.map((item) => ({ ...item, label: docsT(item.label) })),
    [companyT],
  );

  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queries);
    push(path);
  };

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
          <Box onClick={onCreateDoc}>
            <Button
              disabled={loading}
              startIcon={<PlusIcon />}
              size="extraSmall"
              variant="primary"
              sx={{
                height: 32,
                px: ({ spacing }) => `${spacing(2)}!important`,
              }}
            >
              {docsT("button.add")}
            </Button>
          </Box>
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
            name="search_key"
            onChange={onChangeQueries}
            value={queries?.search_key}
            sx={{ width: 200, minWidth: 200 }}
          />
          {/* 
          <Dropdown
            placeholder={docsT("filter.fields")}
            options={grOptions}
            name="fields"
            onChange={onChangeQueries}
            value={Number(queries?.fields)}
          /> */}
          <Dropdown
            placeholder={docsT("filter.group.group")}
            options={grOptions}
            name="group"
            hasAll={false}
            onChange={onChangeQueries}
            value={Number(queries?.group)}
          />
          <FilterSearchDocs
            queries={queries}
            onChange={onChangeQueries}
          ></FilterSearchDocs>
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
          sx={{
            height: 40,
            display: { md: "none" },
            width: "fit-content",
            marginBottom: "20px",
          }}
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

const Group_OPTIONS = [
  { label: "filter.group.none", value: 1, icon: <NoneIcon></NoneIcon> },
  { label: "filter.filter.creator", value: 2, icon: <NoneIcon></NoneIcon> },
  { label: "filter.filter.project", value: 3, icon: <NoneIcon></NoneIcon> },
];
const Filter_Options = [
  { label: "filter.filter.creator", value: 1 },
  { label: "filter.filter.lastEdited", value: 2 },
  { label: "filter.filter.name", value: 3 },
  { label: "filter.filter.project", value: 4 },
  { label: "filter.filter.projectStatus", value: 5 },
];