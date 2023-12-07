import {
  Box,
  ButtonBase,
  Grow,
  MenuItem,
  MenuList,
  popoverClasses,
  Popper,
  Stack,
  TableRow,
} from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { DATE_LOCALE_FORMAT, NS_BUDGETING } from "constant/index";
import { useTranslations } from "next-intl";
import { formatDate } from "utils/index";
import { IconButton, Text, Tooltip } from "components/shared";
import MoreDotIcon from "../../../icons/MoreDotIcon";
import HierarchyIcon from "../../../icons/HierarchyIcon";
import DuplicateIcon from "../../../icons/DuplicateIcon";
import ConvertIcon from "../../../icons/ConvertIcon";
import ChangeIcon from "../../../icons/ChangeIcon";
import MoveArrowIcon from "../../../icons/MoveArrowIcon";
import TrashIcon from "../../../icons/TrashIcon";
import { useState } from "react";
import { useOnClickOutside } from "hooks/useOnClickOutside";

type TTemplate = {
  date: string;
  service: string;
  person: string;
  notes: string;
  time: string;
  billable: string;
};

const TemplateData: TTemplate[] = [
  {
    date: "2023-12-04T16:21:21.156Z",
    service: "Service",
    person: "Persion",
    notes: "Notes",
    time: "13:14 / 13:14",
    billable: "",
  },
  {
    date: "2023-12-04T16:21:21.156Z",
    service: "Service",
    person: "Persion",
    notes: "Notes",
    time: "13:14 / 13:14",
    billable: "",
  },
];

export const Time = () => {
  const budgetT = useTranslations(NS_BUDGETING);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const headerList: CellProps[] = [
    { value: "", align: "center" },
    { value: budgetT("tabTime.service"), align: "center" },
    { value: budgetT("tabTime.person"), align: "center" },
    { value: budgetT("tabTime.notes"), align: "center" },
    { value: budgetT("tabTime.time"), data: "105:00", align: "center" },
    { value: budgetT("tabTime.billable"), data: "105:00", align: "center" },
  ];

  const refClickOutSide = useOnClickOutside(() => setAnchorEl(null));

  return (
    <>
      <TableLayout headerList={headerList} noData={false} titleColor="grey.300">
        {TemplateData.map((data, index) => {
          return (
            <TableRow key={`budget-time-${index}`}>
              <BodyCell>{formatDate(data.date, DATE_LOCALE_FORMAT)}</BodyCell>
              <BodyCell>{data.service}</BodyCell>
              <BodyCell>{data.person}</BodyCell>
              <BodyCell>{data.notes}</BodyCell>
              <BodyCell>{data.time}</BodyCell>
              <BodyCell>
                <IconButton
                  noPadding
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
                            <DuplicateIcon
                              sx={{ color: "grey.400" }}
                              fontSize="medium"
                            />
                            <Text ml={2} variant="body2" color="grey.400">
                              duplicate
                            </Text>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {}}
                            component={ButtonBase}
                            sx={{ width: "100%", py: 1, px: 2 }}
                          >
                            <TrashIcon color="error" fontSize="medium" />
                            <Text ml={2} variant="body2" color="error.main">
                              delete
                            </Text>
                          </MenuItem>
                        </MenuList>
                      </Stack>
                    </Grow>
                  )}
                </Popper>
              </BodyCell>
            </TableRow>
          );
        })}
      </TableLayout>
    </>
  );
};
