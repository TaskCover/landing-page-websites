"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox, Stack, TableRow } from "@mui/material";
import { TableLayout, BodyCell, CellProps } from "components/Table";
import { useProjects } from "store/project/selectors";
import { DEFAULT_PAGING, NS_BILLING, NS_COMMON } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { usePathname, useRouter } from "next-intl/client";
import { cleanObject, stringifyURLSearchParams } from "utils/index";
import { IconButton } from "components/shared";
import PencilIcon from "icons/PencilIcon";
import useBreakpoint from "hooks/useBreakpoint";
import Form, { ProjectDataForm } from "./Form";
import { Member, Project } from "store/project/reducer";
import { ProjectData, getMembersOfProject } from "store/project/actions";
import { DataAction } from "constant/enums";
import { INITIAL_VALUES } from "./components/helpers";
import { useAppDispatch } from "store/hooks";
import DesktopCells from "./DesktopCells";
import MobileContentCell from "./MobileContentCell";
import { useTranslations } from "next-intl";
import useTheme from "hooks/useTheme";
import PencilUnderlineIcon from "icons/PencilUnderlineIcon";
import FixedLayout from "components/FixedLayout";
import { Option } from "constant/types";
import { Billing } from "store/billing/reducer";
import Actions from "./Actions";
import { useBillings } from "store/billing/selectors";

const ItemList = () => {
  const {
    items,
    pageSize,
    pageIndex,
    status,
    totalPages,
    totalItems,
    isFetching,
    isIdle,
    error,
    onGetBillings,
  } = useBillings();
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const { isDarkMode } = useTheme();

  const [item, setItem] = useState<Billing | undefined>();
  const [action, setAction] = useState<DataAction | undefined>();
  const [selectedList, setSelectedList] = useState<Billing[]>([]);

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

  const initValues = useMemo(
    () =>
      item
        ? {
            avatar: item?.avatar?.link,
            // name: item.name,
            // description: item.description,
            // owner: item?.owner?.id,
            // type_project: {
            //   value: item?.type_project?.id,
            //   label: item?.type_project?.name
            // } as Option,
            // start_date: item?.start_date
            //   ? new Date(item.start_date).getTime()
            //   : undefined,
            // end_date: item?.end_date
            //   ? new Date(item.end_date).getTime()
            //   : undefined,
            // expected_cost: item?.expected_cost,
            // currency: item?.currency,
            // working_hours: item?.working_hours,
            // members: item?.members.map(({ id, fullname, ...rest }) => ({
            //   id,
            //   fullname,
            // })),
          }
        : INITIAL_VALUES,
    [item],
  );

  const onActionToItem = (action: DataAction, item?: Billing) => {
    return () => {
      item && setItem(item);
      setAction(action);
    };
  };

  const onResetAction = () => {
    setItem(undefined);
    setAction(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (queries: { [key: string]: any }) => {
    let newQueries = { ...query, ...queries };
    newQueries = cleanObject(newQueries);
    const queryString = stringifyURLSearchParams(newQueries);
    push(`${pathname}${queryString}`);
    // onGetProjects(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  const onUpdateProject = async (data: ProjectData) => {
    // if (!item) return;
    // return await onUpdateProjectAction(item.id, data);
  };

  useEffect(() => {
    if (!isReady) return;
    onGetBillings({ ...initQuery });
  }, [initQuery, isReady, onGetBillings]);

  const onToggleSelect = (item: Billing, indexSelected: number) => {
    return () => {
      if (indexSelected === -1) {
        setSelectedList((prevList) => [...prevList, item]);
      } else {
        setSelectedList((prevList) => {
          const newList = [...prevList];
          newList.splice(indexSelected, 1);
          return newList;
        });
      }
    };
  };

  return (
    <>
      <FixedLayout
        maxHeight={920}
        maxWidth={{
          xs: 1120,
          xl: 1450,
        }}
      >
        <Actions />
        <TableLayout
          headerList={headerList}
          pending={isFetching}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 } },
          }}
          error={error as string}
          noData={!isIdle && totalItems === 0}
          px={{ md: 3 }}
        >
          {items?.map((item, index) => {
            const indexSelected = selectedList.findIndex(
              (selected) => selected?.id === item.id,
            );
            return (
              <TableRow key={item.id}>
                <BodyCell sx={{ pl: { xs: 0.5, md: 2 } }}>
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
                )}
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
            );
          })}
        </TableLayout>
        <Pagination
          totalItems={totalItems}
          totalPages={totalPages}
          page={pageIndex}
          pageSize={pageSize}
          containerProps={{ px: { md: 3 }, py: 1 }}
          onChangePage={onChangePage}
          onChangeSize={onChangeSize}
        />
      </FixedLayout>

      {/* {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={initValues as unknown as ProjectDataForm}
          onSubmit={onUpdateProject}
        />
      )} */}
    </>
  );
};

export default memo(ItemList);

const MOBILE_HEADER_LIST = [{ value: "#", width: "75%", align: "left" }];
