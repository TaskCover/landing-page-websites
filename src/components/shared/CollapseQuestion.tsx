import { memo } from "react";
import {
  Accordion,
  AccordionSummary,
  SxProps,
  accordionClasses,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import useTheme from "hooks/useTheme";

type CollapseProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  initCollapse?: boolean;
  sx?: SxProps;
};

const CollapseQuestion = (props: CollapseProps) => {
  const { label, children, initCollapse = false, sx } = props;

  const { isDarkMode } = useTheme();

  return (
    <Accordion
      defaultExpanded={initCollapse}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.70)",
        backgroundImage: "none",
        boxShadow: "none",
        p: 2,
        borderRadius: 1,
        mb: 2,
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
        ...sx,
      }}
    >
      <AccordionSummary
        sx={{
          px: 0,
          borderRadius: 4,
          minHeight: "auto",
          justifyContent: "space-between",
          "&.Mui-expanded": {
            minHeight: "auto",
            "& svg:last-child": {
              transform: "rotate(180deg)",
            },
          },
          "& div": {
            m: 0,
            maxWidth: "fit-content",
            "&.Mui-expanded": {
              m: 0,
            },
          },
        }}
        expandIcon={
          <AddIcon
            sx={{
              transform: "rotate(-90deg)",
              color: "grey.900",
            }}
          />
        }
      >
        {label}
      </AccordionSummary>
      {children}
    </Accordion>
  );
};

export default memo(CollapseQuestion);
