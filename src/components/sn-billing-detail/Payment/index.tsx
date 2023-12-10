import { Box, Menu, MenuItem, Stack, TableRow } from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { IconButton } from "components/shared";
import { NS_BILLING, NS_COMMON } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslations } from "next-intl";
import { memo, useMemo, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PencilUnderlineIcon from "icons/PencilUnderlineIcon";
import TrashIcon from "icons/TrashIcon";
import PaymentModal from "../components/PaymentModal";

type TabProps = {
  title: string;
};

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

const TabPayment = (props: TabProps) => {
  const { title } = props;

  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: "", width: "5%", align: "center" },
      {
        value: billingT("list.table.subject"),
        align: "left",
      },
      {
        value: billingT("list.table.invoiceNumber"),
        align: "left",
      },
      {
        value: billingT("list.table.date"),
        align: "left",
      },
      { value: billingT("list.table.budgets") },
      { value: billingT("list.table.att") },
      { value: billingT("list.table.amount") },
      { value: billingT("list.table.amountUnpaid") },
      { value: billingT("list.table.dueDate") },
    ],
    [billingT],
  );
  const mobileHeaderList: CellProps[] = useMemo(
    () => [
      { value: "", width: "5%", align: "center" },
      {
        value: billingT("list.table.subject"),
        align: "left",
      },
      {
        value: billingT("list.table.invoiceNumber"),
        align: "left",
      },
      {
        value: billingT("list.table.date"),
        align: "left",
      },
      { value: billingT("list.table.budgets") },
      { value: billingT("list.table.att") },
      { value: billingT("list.table.amount") },
      { value: billingT("list.table.amountUnpaid") },
      { value: billingT("list.table.dueDate") },
    ],
    [billingT],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? mobileHeaderList
      : desktopHeaderList;
    return [
      ...additionalHeaderList,
      { value: "", width: "10%" },
    ] as CellProps[];
  }, [desktopHeaderList, isMdSmaller, mobileHeaderList]);

  return (
    <Box>
      <Stack gap={2} borderBottom={"1px solid #ECECF3"} pb={2}>
        <TableLayout
          headerList={headerList}
          // pending={isFetching}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 } },
          }}
          // error={error as string}
          // noData={!isIdle && totalItems === 0}
          // px={{ md: 3 }}
        >
          {/* {items?.map((item, index) => {
            const indexSelected = selectedList.findIndex(
              (selected) => selected?.id === item.id,
            );
            return ( */}
          <TableRow
          // key={item?.id}
          >
            {/* <BodyCell sx={{ pl: { xs: 0.5, md: 2 } }}>
                  <Checkbox
                    checked={indexSelected !== -1}
                    onChange={onToggleSelect(item, indexSelected)}
                  />
                </BodyCell>
                {isMdSmaller ? (
                  <MobileContentCell />
                ) : (
                  <DesktopCells
                    item={item}
                    order={(pageIndex - 1) * pageSize + (index + 1)}
                  />
                )} */}
            {/* <BodyCell align="left" sx={{ px: { xs: 0.5, md: 2 } }}>
                  <IconButton
                    onClick={onActionToItem(DataAction.UPDATE, item)}
                    tooltip={commonT("edit")}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: isDarkMode ? "grey.50" : "primary.light",
                      color: "text.primary",
                      p: { xs: "4px!important", md: 1 },
                      "&:hover svg": {
                        color: "common.white",
                      },
                    }}
                  >
                    <PencilUnderlineIcon sx={{ fontSize: 24 }} />
                  </IconButton>
                </BodyCell> */}
          </TableRow>
          {/* );
          })} */}
        </TableLayout>
        {/* <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Link href={""} sx={{ textDecoration: "none", display: "flex" }}>
            <PlusIcon sx={{ color: "#1BC5BD", mr: 1 }} />
            <Text variant={"body1"} color={"#1BC5BD"}>
              Add new row
            </Text>
          </Link>
        </Stack> */}
      </Stack>
      <Stack gap={2} borderBottom={"1px solid #ECECF3"} pb={2}>
        <TableLayout
          headerList={headerList}
          // pending={isFetching}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 } },
          }}
          // error={error as string}
          // noData={!isIdle && totalItems === 0}
          // px={{ md: 3 }}
        >
          {/* {items?.map((item, index) => {
            const indexSelected = selectedList.findIndex(
              (selected) => selected?.id === item.id,
            );
            return ( */}
          <TableRow
          // key={item?.id}
          >
            {/* <BodyCell sx={{ pl: { xs: 0.5, md: 2 } }}>
                  <Checkbox
                    checked={indexSelected !== -1}
                    onChange={onToggleSelect(item, indexSelected)}
                  />
                </BodyCell>
                {isMdSmaller ? (
                  <MobileContentCell />
                ) : (
                  <DesktopCells
                    item={item}
                    order={(pageIndex - 1) * pageSize + (index + 1)}
                  />
                )} */}
            <BodyCell align="left" sx={{ px: { xs: 0.5, md: 2 } }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option === "Edit" ? (
                      <>
                        <PencilUnderlineIcon sx={{ mr: 2 }} /> {option}
                      </>
                    ) : (
                      <Box sx={{ color: "#F64E60" }}>
                        <TrashIcon fontSize="small" sx={{ mr: 1.5 }} />
                        {option}
                      </Box>
                    )}

                    {/* {option} */}
                  </MenuItem>
                ))}
              </Menu>
            </BodyCell>
          </TableRow>
          {/* );
          })} */}
        </TableLayout>
        {/* <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Link href={""} sx={{ textDecoration: "none", display: "flex" }}>
            <PlusIcon sx={{ color: "#1BC5BD", mr: 1 }} />
            <Text variant={"body1"} color={"#1BC5BD"}>
              Add new row
            </Text>
          </Link>
        </Stack> */}
      </Stack>
      <PaymentModal />
    </Box>
  );
};
export default memo(TabPayment);
