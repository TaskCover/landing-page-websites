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

export interface LeftSlideDocProps {
  open: boolean;
  setOpen?: any;
}

const LeftSlideDoc = ({ open, setOpen }: LeftSlideDocProps) => {
  const dataFake = useAppSelector((state) => state.doc.docDetails.data);
  const docsT = useTranslations(NS_DOCS);
  const [search, setSearch] = useState("");
  const onChangeQueries = (name: string, value: any) => {
    setSearch(value);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: {
          sm: "30%",
          xs: open ? "90%" : "0",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          backgroundColor: {
            sm: "unset",
            xs: "white",
          },
          zIndex: "39",
          display: "block",
        }}
      >
        <Box
          onClick={() => setOpen((value) => !value)}
          sx={{
            position: "absolute",
            top: 0,
            left: open ? "calc(100% + 4px)" : "calc(100% - 16px)",
            padding: "4px",
            display: {
              sm: "none",
              xs: "flex",
            },
            zIndex: "30",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E1F0FF",
            transform: open ? "rotate(180deg)" : "unset",
          }}
        >
          <ArrowRight></ArrowRight>
        </Box>
        <Box
          sx={{
            display: {
              sm: "block",
              xs: open ? "block" : "none",
            },
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
    </Box>
  );
};

export default memo(LeftSlideDoc);
