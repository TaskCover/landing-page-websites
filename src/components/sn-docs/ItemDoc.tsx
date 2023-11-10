/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TableRow } from "@mui/material";
import { Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import useTheme from "hooks/useTheme";
import React, { memo } from "react";
import DesktopCells from "./DesktopCells";
import MobileContentCell from "./MobileContentCell";

const ItemDoc = ({ items, data }) => {
  const { isMdSmaller } = useBreakpoint();
  const { isDarkMode } = useTheme();
  return (
    <>
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
          {data?.fullname}
        </Text>
      </Box>
      {items?.length > 0 &&
        items?.map((item) => (
          <TableRow key={item.id}>
            {!isMdSmaller ? (
              <DesktopCells item={item} />
            ) : (
              <MobileContentCell item={item} />
            )}
          </TableRow>
        ))}
    </>
  );
};
export const ItemDocProject = ({ items, data }) => {
  const { isMdSmaller } = useBreakpoint();
  const { isDarkMode } = useTheme();
  return (
    <>
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
          {data?.name || "Không Thuộc Project"}
        </Text>
      </Box>
      {items?.length > 0 &&
        items?.map((item) => (
          <TableRow key={item.id}>
            {!isMdSmaller ? (
              <DesktopCells item={item} />
            ) : (
              <MobileContentCell item={item} />
            )}
          </TableRow>
        ))}
    </>
  );
};

export default memo(ItemDoc);
