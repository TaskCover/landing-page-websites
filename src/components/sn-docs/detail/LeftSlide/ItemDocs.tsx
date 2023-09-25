/* eslint-disable react/no-children-prop */
"use client";
import { Box } from "@mui/material";
import { Text } from "components/shared";
import DocsItem from "icons/DocsItem";
import IconAdd from "icons/IconAdd";
import MoreIcon from "icons/MoreIcon";
import React, { memo, useCallback } from "react";
import MorePoper from "./MorePoper";
import ConfirmDialog from "components/ConfirmDialog";

export interface ItemDocsProps {
  title: string;
  content?: {
    title: string;
    content: string;
  };
  id?: number;
  children: ItemDocsProps[];
}
interface ItemDocs {
  isFirst?: boolean;
  data: ItemDocsProps;
}

const ItemDoc = ({ title }: ItemDocsProps) => {
  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
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
          <Text fontWeight={600} fontSize={14}>
            {title}
          </Text>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.4,
          }}
        >
          <MorePoper></MorePoper>
          <Box
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

const ItemDocs = ({ data, isFirst }: ItemDocs) => {
  return (
    <>
      <ItemDoc children={data.children} title={data.title}></ItemDoc>
      {data.children && (
        <Box
          sx={{
            marginLeft: "24px",
          }}
        >
          {data?.children?.map((e: ItemDocsProps) => {
            return <ItemDocs key={e.id} data={e}></ItemDocs>;
          })}
        </Box>
      )}
    </>
  );
};

export default memo(ItemDocs);
