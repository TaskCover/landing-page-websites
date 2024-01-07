/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  ButtonBase,
  Grow,
  MenuItem,
  MenuList,
  Popper,
  Stack,
  popoverClasses,
} from "@mui/material";
import { CellProps, TableLayout } from "components/Table";
import { NS_BUDGETING } from "constant/index";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Text } from "components/shared";
import ServiceAreaSectionRow from "./ServiceAreaSectionRow";
import {
  TSection,
  budgetDetailRef,
} from "components/sn-budgeting/BudgetDetail";

export const ServiceAreaSection = ({
  sections = [],
}: {
  sections: TSection[];
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const budgetT = useTranslations(NS_BUDGETING);

  const refClickOutSide = useOnClickOutside(() => setAnchorEl(null));

  const headerList: CellProps[] = [
    { value: budgetT("tabService.section.serviceName"), align: "left" },
    {
      value: budgetT("tabService.index.workingTime"),
      align: "center",
      data: "13,23 / 30 hrs",
    },
    { value: budgetT("tabService.index.price"), align: "center" },
    { value: budgetT("tabService.index.cost"), align: "center" },
    { value: "", align: "left", width: "3%" },
  ];

  return (
    <Box>
      <TableLayout headerList={headerList} noData={false} titleColor="grey.300">
        {sections.map((data: TSection, index) => {
          return (
            <ServiceAreaSectionRow
              key={`budget-sevice-section-${index}`}
              section={data}
              setAnchorEl={setAnchorEl}
              anchorEl={anchorEl}
            />
          );
        })}
      </TableLayout>
      <Popper
        ref={refClickOutSide}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "white",
            minWidth: 150,
            maxWidth: 250,
          },
          zIndex: 1000,
        }}
        transition
        placement={"bottom-end"}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Stack
              py={2}
              sx={{
                boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.2)",
                border: "1px solid",
                borderTopWidth: 0,
                borderColor: "grey.100",
                borderRadius: 1,
                bgcolor: "background.paper",
              }}
            >
              <MenuList component={Box} sx={{ py: 0 }}>
                <MenuItem
                  onClick={() => {
                    budgetDetailRef.current?.openModalTime();
                  }}
                  component={ButtonBase}
                  sx={{ width: "100%", py: 1, px: 2 }}
                >
                  <Text ml={2} variant="body2" color="grey.400">
                    Add time entry
                  </Text>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    budgetDetailRef.current?.openModalExpense();
                  }}
                  component={ButtonBase}
                  sx={{ width: "100%", py: 1, px: 2 }}
                >
                  <Text ml={2} variant="body2" color="grey.400">
                    Add expense
                  </Text>
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                  component={ButtonBase}
                  sx={{ width: "100%", py: 1, px: 2 }}
                >
                  <Text ml={2} variant="body2" color="grey.400">
                    View time entries
                  </Text>
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                  component={ButtonBase}
                  sx={{ width: "100%", py: 1, px: 2 }}
                >
                  <Text ml={2} variant="body2" color="grey.400">
                    View expenses
                  </Text>
                </MenuItem>
              </MenuList>
            </Stack>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
