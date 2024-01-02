import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  ButtonBase,
  Grow,
  MenuItem,
  MenuList,
  Popper,
  Stack,
  TableRow,
  popoverClasses,
  Typography,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  TableCell,
  Collapse,
} from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { NS_BUDGETING } from "constant/index";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { PTag } from "./ServiceUtil";
import { IconButton, Text } from "components/shared";
import MoreDotIcon from "icons/MoreDotIcon";
import { useParams } from "next/navigation";
import { useBudgetGetServiceQuery } from "queries/budgeting/service-list";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TSection } from "./ServiceAreaSection";

interface ServiceAreaSectionRowProps {
  section: TSection;
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
  anchorEl: HTMLButtonElement | null;
}

function ServiceAreaSectionRow({
  section,
  anchorEl,
  setAnchorEl,
}: ServiceAreaSectionRowProps) {
  const { name, workingTime, price, cost, description } = section;
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <TableRow
      sx={{
        "& .MuiTableCell-root": {
          borderBottom: "none",
        },
      }}
    >
      <TableRow>
        <BodyCell align="left">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            onClick={() => setIsCollapse((prev) => !prev)}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
              "&:hover svg": { color: "primary.main" },
            }}
          >
            <ExpandCircleDownOutlinedIcon
              sx={{
                color: "grey.300",
                mr: 1,
                transform: isCollapse ? "rotate(180deg)" : "none",
              }}
            />
            <PTag>{name}</PTag>
          </Stack>
        </BodyCell>
        <BodyCell>{workingTime}</BodyCell>
        <BodyCell>{price}</BodyCell>
        <BodyCell>{cost}</BodyCell>
        <BodyCell>
          <IconButton
            noPadding
            sx={{ transform: "translateX(-50%)" }}
            onClick={(e) => {
              if (Boolean(anchorEl)) {
                setAnchorEl(null);
              } else {
                setAnchorEl(e.currentTarget);
              }
            }}
          >
            <MoreDotIcon fontSize="medium" sx={{ color: "grey.300" }} />
          </IconButton>
        </BodyCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={12} sx={{ py: 0 }}>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            {description}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableRow>
  );
}

export default ServiceAreaSectionRow;
