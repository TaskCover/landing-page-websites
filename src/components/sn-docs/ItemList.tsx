"use client";

import {
  memo,
  useEffect,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import { Stack, TableRow } from "@mui/material";
import {
  TableLayout,
  BodyCell,
  CellProps,
  ActionsCell,
} from "components/Table";
import { DEFAULT_PAGING, NS_COMMON, NS_COMPANY } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { usePathname, useRouter } from "next-intl/client";
import { getDataFromKeys, getPath } from "utils/index";
import { IconButton, Checkbox } from "components/shared";
import { useEmployees } from "store/company/selectors";
import CardSendIcon from "icons/CardSendIcon";
import ConfirmDialog from "components/ConfirmDialog";
import { Employee } from "store/company/reducer";
import { DataAction, PayStatus } from "constant/enums";
import { EmployeeData } from "store/company/actions";
import Form from "./Form";
import TrashIcon from "icons/TrashIcon";
import { MobileContentCell, DesktopCells } from "./components";
import useBreakpoint from "hooks/useBreakpoint";
import DeleteConfirm from "./components/DeleteConfirm";
import { useTranslations } from "next-intl";
import useTheme from "hooks/useTheme";
import FixedLayout from "components/FixedLayout";
import { HEADER_HEIGHT } from "layouts/Header";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    totalItems,
    pageSize,
    pageIndex,
    totalPages,
    onGetEmployees,
    onUpdateEmployee: onUpdateEmployeeAction,
    onDeleteEmployees,
  } = useEmployees();
  const companyT = useTranslations(NS_COMPANY);
  const commonT = useTranslations(NS_COMMON);

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const { isDarkMode } = useTheme();

  const [item, setItem] = useState<Employee | undefined>();
  const [selectedList, setSelectedList] = useState<Employee[]>([]);
  const [action, setAction] = useState<DataAction | undefined>();

  const isCheckedAll = useMemo(
    () => Boolean(selectedList.length && selectedList.length === items.length),
    [selectedList.length, items.length],
  );
  const onChangeAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setSelectedList(items);
      } else {
        setSelectedList([]);
      }
    },
    [items],
  );

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: "Document", width: "35%", align: "left" },
      { value: "Created at", width: "21.666%" },
      { value: "Last edited", width: "21.666%" },
      { value: "Creator", width: "21.666%" },
    ],
    [commonT, companyT],
  );

  const headerList = useMemo(() => {
    return [...desktopHeaderList] as CellProps[];
  }, [isMdSmaller, desktopHeaderList, isCheckedAll, onChangeAll]);

  const onToggleSelect = (item: Employee, indexSelected: number) => {
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

  const onActionToItem = (action: DataAction, item?: Employee) => {
    return () => {
      if (action === DataAction.DELETE) {
        item && setSelectedList([item]);
      } else {
        item && setItem(item);
      }
      setAction(action);
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (queries: { [key: string]: any }) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);

    onGetEmployees(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  useEffect(() => {
    if (!isReady) return;
    onGetEmployees({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetEmployees]);

  useEffect(() => {
    setSelectedList([]);
  }, [pageIndex]);

  return (
    <FixedLayout>
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        px={{ xs: 0, md: 3 }}
        containerHeaderProps={{
          sx: {
            maxHeight: { md: HEADER_HEIGHT },
            minHeight: { md: HEADER_HEIGHT },
          },
        }}
        sx={{ bgcolor: { xs: "grey.50", md: "transparent" } }}
      >
        {items.map((item) => {
          const indexSelected = selectedList.findIndex(
            (selected) => selected.id === item.id,
          );
          return (
            <TableRow key={item.id}>
              <BodyCell sx={{ pl: { xs: 0.5, md: 2 } }}>
                <Checkbox
                  checked={indexSelected !== -1}
                  onChange={onToggleSelect(item, indexSelected)}
                />
              </BodyCell>
              <DesktopCells item={item} />
              <ActionsCell
                sx={{
                  pl: { xs: 0.5, md: 0 },
                  verticalAlign: { xs: "top", md: "middle" },
                  pt: { xs: 2, md: 0 },
                }}
                iconProps={{
                  sx: {
                    p: { xs: "4px!important", lg: 1 },
                  },
                }}
                onEdit={onActionToItem(DataAction.UPDATE, item)}
                onDelete={onActionToItem(DataAction.DELETE, item)}
                hasPopup={false}
                options={
                  item.status === PayStatus.WAITING
                    ? [
                        {
                          content: companyT("employees.pay"),
                          onClick: onActionToItem(DataAction.OTHER, item),
                          icon: (
                            <CardSendIcon
                              sx={{ color: "grey.400" }}
                              fontSize="medium"
                            />
                          ),
                        },
                      ]
                    : undefined
                }
              />
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
  );
};

export default memo(ItemList);

const MOBILE_HEADER_LIST = [{ value: "#", width: "70%", align: "left" }];
