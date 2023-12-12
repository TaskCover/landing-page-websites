import { TableRow } from "@mui/material";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { IconButton } from "components/shared";
import { NS_BILLING, NS_COMMON } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import TrashIcon from "icons/TrashIcon";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";

const TableLinkBudget = () => {
  const { isMdSmaller } = useBreakpoint();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);

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
    <>
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
              // onClick={onActionToItem(DataAction.UPDATE, item)}
              tooltip={commonT("delete")}
              variant="normal"
              size="small"
              sx={{
                // backgroundColor: isDarkMode ? "grey.50" : "primary.light",
                color: "text.primary",
                p: { xs: "4px!important", md: 1 },
                "&:hover svg": {
                  color: "common.white",
                },
              }}
            >
              <TrashIcon fontSize="small" />
            </IconButton>
          </BodyCell>
        </TableRow>
        {/* );
            })} */}
      </TableLayout>
    </>
  );
};
export default memo(TableLinkBudget);
