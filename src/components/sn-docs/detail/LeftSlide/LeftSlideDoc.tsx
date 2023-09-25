"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { Search } from "components/Filters";
import { NS_DOCS } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useState } from "react";
import ItemDocs from "./ItemDocs";
import { Text } from "components/shared";
import { useAppSelector } from "store/hooks";

const LeftSlideDoc = () => {
  const dataFake = useAppSelector((state) => state.doc.docDetails.data);

  const docsT = useTranslations(NS_DOCS);
  const [search, setSearch] = useState("");
  const onChangeQueries = (name: string, value: any) => {
    setSearch(value);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: {
          md: "block",
          xs: "none",
        },
        width: {
          md: "30%",
          xs: "0",
        },
      }}
    >
      <Box>
        <Search
          placeholder={docsT("filter.search", { name: "email" })}
          name="doc"
          onChange={onChangeQueries}
          value={search}
          sx={{
            width: "100%",
          }}
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
          <ItemDocs isFirst data={dataFake}></ItemDocs>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(LeftSlideDoc);
