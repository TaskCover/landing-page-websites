import { memo } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  Stack,
  accordionSummaryClasses,
  accordionClasses,
} from "@mui/material";
import { Text } from "components/shared";
import ChevronIcon from "icons/ChevronIcon";

type CollapseProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  initCollapse?: boolean;
};

const Collapse = (props: CollapseProps) => {
  const { label, icon, children, initCollapse = false } = props;

  return (
    <Accordion
      defaultExpanded={initCollapse}
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        "&.Mui-expanded": {
          mx: 0,
          my: 1.5,
          "&:first-of-type": {
            mt: 1.5,
          },
        },
        "&:before": {
          content: "none",
        },
        [`& .${accordionClasses.region}`]: {
          width: "100%",
        },
      }}
    >
      <AccordionSummary
        sx={{
          px: 2.5,
          py: 1.5,
          borderRadius: 1,
          backgroundColor: { xs: "grey.50", sm: undefined },
          "&:hover, &.active": {
            backgroundColor: "primary.light",
          },
          minHeight: "auto",
          "&.Mui-expanded": {
            minHeight: "auto",
            "& svg:last-child": {
              transform: "rotate(180deg)",
            },
          },
          "& div": {
            m: 0,
            "&.Mui-expanded": {
              m: 0,
            },
          },
        }}
        expandIcon={
          <ChevronIcon
            sx={{
              transform: "rotate(-90deg)",
              color: "grey.900",
            }}
          />
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            "& svg:first-of-type": {
              fontSize: 24,
            },
          }}
        >
          {icon}
          <Text color="grey.400" noWrap>
            {label}
          </Text>
        </Stack>
      </AccordionSummary>
      {children}
    </Accordion>
  );
};

export default memo(Collapse);
