import { memo, useMemo } from "react";
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
import { useSidebar } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslations } from "next-intl";
import { NS_LAYOUT } from "constant/index";

type CollapseProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  initCollapse?: boolean;
};

const Collapse = (props: CollapseProps) => {
  const { label, icon, children, initCollapse = false } = props;
  const t = useTranslations(NS_LAYOUT);

  const { isExpandedSidebar } = useSidebar();
  const { isLgSmaller, isSmSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

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
          {(isShowLarge || isSmSmaller) && (
            <Text
              color="grey.400"
              variant={{ xs: "body2", sm: "body1" }}
              noWrap
            >
              {t(label)}
            </Text>
          )}
        </Stack>
      </AccordionSummary>
      {children}
    </Accordion>
  );
};

export default memo(Collapse);
