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

type TSection = {
  id: string;
  name: string;
  workingTime: string;
  price: string;
  cost: string;
};

const TemplateData: TSection[] = [
  {
    id: "aa11",
    name: "Acquiring new clients",
    workingTime: "8,23 / 20 hrs",
    price: "$25,10",
    cost: "$250,10",
  },
  {
    id: "aa22",
    name: "Acquiring new clients",
    workingTime: "8,23 / 20 hrs",
    price: "$25,10",
    cost: "$250,10",
  },
];
export const ServiceAreaSection = ({
  onOpenEdit,
}: {
  onOpenEdit?: () => void;
}) => {
  const [sections, setSections] = useState<TSection[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const budgetT = useTranslations(NS_BUDGETING);

  useEffect(() => {
    setSections(TemplateData);
  }, []);

  const refClickOutSide = useOnClickOutside(() => setAnchorEl(null));

  const headerList: CellProps[] = [
    { value: "", align: "center" },
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
        {sections.map((data, index) => {
          return (
            <TableRow key={`budget-sevice-section-${index}`}>
              <BodyCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  onClick={onOpenEdit}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "primary.main" },
                    "&:hover svg": { color: "primary.main" },
                  }}
                >
                  <ExpandCircleDownOutlinedIcon
                    sx={{ color: "grey.300", mr: 1 }}
                  />
                  <PTag>{data.name}</PTag>
                </Stack>
              </BodyCell>
              <BodyCell>{data.workingTime}</BodyCell>
              <BodyCell>{data.price}</BodyCell>
              <BodyCell>{data.cost}</BodyCell>
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
                  onClick={() => {}}
                  component={ButtonBase}
                  sx={{ width: "100%", py: 1, px: 2 }}
                >
                  <Text ml={2} variant="body2" color="grey.400">
                    Add time entry
                  </Text>
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
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
