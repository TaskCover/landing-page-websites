/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TableRow } from "@mui/material";
import { Text } from "components/shared";
import useTheme from "hooks/useTheme";
import React, { memo } from "react";

const ItemDoc = () => {
  const { isDarkMode } = useTheme();
  return (
    <TableRow>
      <Box
        sx={{
          backgroundColor: isDarkMode ? "#1E1E1E" : "#E1F0FF",
          p: {
            md: "18px",
            xs: "16px 4px 16px 4px",
          },
        }}
      >
        <Text
          sx={{
            fontSize: {
              md: 16,
              xs: 14,
            },
            fontWeight: 600,
          }}
        >
          Project #545654
        </Text>
      </Box>
    </TableRow>
  );
};

export default memo(ItemDoc);
