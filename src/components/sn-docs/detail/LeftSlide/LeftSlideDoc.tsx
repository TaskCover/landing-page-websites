"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Search } from "components/Filters";
import { NS_DOCS } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useState } from "react";
import ItemDocs from "./ItemDocs";
import { Text } from "components/shared";

const LeftSlideDoc = () => {
  const docsT = useTranslations(NS_DOCS);
  const [search, setSearch] = useState("");
  const onChangeQueries = (name: string, value: any) => {
    setSearch(value);
  };
  return (
    <>
      <Box sx={{}}>
        <Search
          placeholder={docsT("filter.search", { name: "email" })}
          name="doc"
          onChange={onChangeQueries}
          value={search}
          sx={{ width: 380, minWidth: 380 }}
        />
        <Box>
          <Text
            sx={{
              marginTop: "8px",
            }}
            color={"grey"}
            variant={"h6"}
          >
            Pages
          </Text>
          <ItemDocs></ItemDocs>
        </Box>
      </Box>
    </>
  );
};

export default memo(LeftSlideDoc);
