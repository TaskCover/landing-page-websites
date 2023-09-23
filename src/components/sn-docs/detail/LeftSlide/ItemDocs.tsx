import { Box } from "@mui/material";
import { Text } from "components/shared";
import DocsItem from "icons/DocsItem";
import IconAdd from "icons/IconAdd";
import MoreIcon from "icons/MoreIcon";
import React, { memo } from "react";

const ItemDocs = () => {
  return (
    <Box
      sx={{
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
          Docs
        </Text>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.4,
        }}
      >
        <Box
          sx={{
            p: 1,
            cursor: "pointer",
          }}
        >
          <MoreIcon></MoreIcon>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            p: 1,
          }}
        >
          <IconAdd></IconAdd>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ItemDocs);
