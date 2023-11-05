/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/no-children-prop */
"use client";
import { Box } from "@mui/material";
import { Text } from "components/shared";
import DocsItem from "icons/DocsItem";
import IconAdd from "icons/IconAdd";
import React, { memo } from "react";
import MorePoper from "./MorePoper";

export interface ItemDocsProps {
  onClick?: any;
  title: string;
  content?: {
    title: string;
    content: string;
  };
  id?: string;
  children: ItemDocsProps[];
}
interface ItemDocs {
  isFirst?: boolean;
  data: ItemDocsProps;
  onClick: any;
}

const ItemDoc = ({ title, id, onClick }: ItemDocsProps) => {
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          ":hover": {
            " .btn-more": {
              visibility: "visible",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DocsItem></DocsItem>
          <Text sx={{ flex: 1 }} fontWeight={600} fontSize={14}>
            {title}
          </Text>
        </Box>
        <Box
          className="btn-more"
          sx={{
            visibility: "hidden",
            display: "flex",
            alignItems: "center",
            gap: 1.4,
          }}
        >
          <MorePoper></MorePoper>
          <Box
            onClick={() => onClick(id)}
            sx={{
              cursor: "pointer",
            }}
          >
            <IconAdd></IconAdd>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const ItemDocs = ({ data, isFirst, onClick }: ItemDocs) => {
  return (
    <>
      <ItemDoc
        onClick={onClick}
        children={data.children}
        title={data.title}
      ></ItemDoc>
      {data.children && (
        <Box
          sx={{
            marginLeft: {
              md: "24px",
              xs: "16px",
            },
          }}
        >
          {data?.children?.map((e: ItemDocsProps) => {
            return <ItemDocs onClick={onClick} key={e.id} data={e}></ItemDocs>;
          })}
        </Box>
      )}
    </>
  );
};

export default memo(ItemDocs);
