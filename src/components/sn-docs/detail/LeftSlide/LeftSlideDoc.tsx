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
import ArrowRight from "icons/ArrowRight";

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
        width: {
          md: "30%",
          xs: "70%",
        },
        flex: 1,
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "4px",
          display: {
            md: "none",
            xs: "flex",
          },
          zIndex: "30",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E1F0FF",
        }}
      >
        <ArrowRight></ArrowRight>
      </Box>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "white",
          zIndex: "39",
          position: {
            md: "unset",
            xs: "absolute",
          },
          left: 0,
          top: 0,
          display: "block",
        }}
      >
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
