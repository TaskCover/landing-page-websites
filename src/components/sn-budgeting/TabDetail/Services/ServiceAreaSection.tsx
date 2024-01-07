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
import ServiceAreaSectionRow from "./ServiceAreaSectionRow";

export type TSection = {
  id: string;
  name: string;
  workingTime: string;
  price: string;
  cost: string;
  description: string;
};

const TemplateData: TSection[] = [
  {
    id: "aa11",
    name: "Acquiring new clients",
    workingTime: "8,23 / 20 hrs",
    price: "$25,10",
    cost: "$250,10",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione reiciendis dolore eius eum temporibus magni vero voluptate. Quae eaque consectetur exercitationem necessitatibus ducimus atque eius! Dignissimos consequuntur rerum nemo quibusdam?",
  },
  {
    id: "aa22",
    name: "Acquiring new clients",
    workingTime: "8,23 / 20 hrs",
    price: "$25,10",
    cost: "$250,10",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione reiciendis dolore eius eum temporibus magni vero voluptate. Quae eaque consectetur exercitationem necessitatibus ducimus atque eius! Dignissimos consequuntur rerum nemo quibusdam?",
  },
];
export const ServiceAreaSection = ({
  onOpenEdit,
  openModalTime = () => {},
  openModalExpense = () => {},
}: {
  onOpenEdit?: () => void;
  openModalTime?: () => void;
  openModalExpense?: () => void;
}) => {
  const [sections, setSections] = useState<TSection[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { id: idBudget } = useParams();
  const serviceQuery = useBudgetGetServiceQuery(String(idBudget));

  const budgetT = useTranslations(NS_BUDGETING);

  useEffect(() => {
    if (!serviceQuery) return;
    const sectionData: TSection[] = [];
    serviceQuery.data?.map((section) => {
      sectionData.push({
        id: section.id,
        name: section.name,
        workingTime: "0 / 0 hrs",
        price: "0",
        cost: "0",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, at nam! Id!",
      });
    });
    setSections(sectionData);
  }, [serviceQuery]);
  console.log('sections', sections);

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
        {TemplateData.map((data, index) => {
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
                  onClick={() => openModalTime()}
                  component={ButtonBase}
                  sx={{ width: "100%", py: 1, px: 2 }}
                >
                  <Text ml={2} variant="body2" color="grey.400">
                    Add time entry
                  </Text>
                </MenuItem>
                <MenuItem
                  onClick={() => openModalExpense()}
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
