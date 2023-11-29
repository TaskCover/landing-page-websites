/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TableRow,
} from "@mui/material";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import useTheme from "hooks/useTheme";
import DesktopCells from "./DesktopCells";
import MobileContentCell from "./MobileContentCell";
import styled from "@emotion/styled";

export const SingleRow = ({ items, data }) => {
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
export const RowGroup = (props) => {
  const { item, title } = props;
  const { isMdSmaller } = useBreakpoint();
  const { isDarkMode } = useTheme();
  return (
    <TableRow>
      <BodyCell align="left" padding="none" colSpan={4}>
        <StyledAccordion defaultExpanded={true}>
          <AccordionSummary
            sx={{ bgcolor: isDarkMode ? "grey.50" : "primary.light" }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Text fontWeight={600} fontSize={14}>
              {title}
            </Text>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {Array.isArray(item?.docs) &&
              item.docs.map((doc) => {
                return (
                  <TableRow>
                    {!isMdSmaller ? (
                      <DesktopCells item={doc} />
                    ) : (
                      <MobileContentCell item={doc} />
                    )}
                  </TableRow>
                );
              })}
          </AccordionDetails>
        </StyledAccordion>
      </BodyCell>
    </TableRow>
  );
};

const StyledAccordion = styled(Accordion)(() => {
  const { isDarkMode } = useTheme();
  return {
    "&.MuiAccordion-root": {
      width: "100%",
      border: "none",
      borderBottom: "1px solid #2196f350",
      borderRadius: 0,
      boxShadow: "none",
      backgroundColor: isDarkMode ? "grey.50" : "primary.light",
    },
  };
});
