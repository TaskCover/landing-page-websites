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
import { DataAction } from "constant/enums";
import { EmployeeData } from "store/company/actions";
import Form from "./Form";
import TrashIcon from "icons/TrashIcon";
import { MobileContentCell, DesktopCells } from "./components";
import useBreakpoint from "hooks/useBreakpoint";
import DeleteConfirm from "./components/DeleteConfirm";
import { useTranslations } from "next-intl";

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
      { value: commonT("fullName"), width: "15%", align: "left" },
      { value: "Email", width: "15%", align: "left" },
      { value: commonT("position"), width: "15%" },
      { value: commonT("creationDate"), width: "13.5%" },
      { value: companyT("employees.expirationDate"), width: "13.5%" },
      { value: commonT("status"), width: "17%" },
    ],
    [commonT, companyT],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? MOBILE_HEADER_LIST
      : desktopHeaderList;

    return [
      {
        value: <Checkbox checked={isCheckedAll} onChange={onChangeAll} />,
        width: isMdSmaller ? "10%" : "3%",
      },
      ...additionalHeaderList,
      { value: "", width: isMdSmaller ? "20%" : "8%" },
    ] as CellProps[];
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

  const onResetAction = () => {
    setItem(undefined);
    setAction(undefined);
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

  const onUpdateEmployee = async (data: EmployeeData) => {
    if (!item) return;
    return await onUpdateEmployeeAction(item.id, data.position);
  };

  const onPay = () => {
    setAction(DataAction.OTHER);
  };
  const onDelete = () => {
    setAction(DataAction.DELETE);
  };

  const onSubmitDelete = async () => {
    const ids = selectedList.map((item) => item.id);
    try {
      const idsResponse = await onDeleteEmployees(ids);
      if (idsResponse.length) {
        setAction(undefined);
        setSelectedList([]);
        // setId(undefined);
      }
      return idsResponse;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!isReady) return;
    onGetEmployees({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetEmployees]);

  useEffect(() => {
    setSelectedList([]);
  }, [pageIndex]);

  return (
    <>
      {!!selectedList.length && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          pb={0.25}
          border="1px solid"
          borderColor="grey.100"
          borderBottom="none"
          sx={{ borderTopLeftRadius: 1, borderTopRightRadius: 1 }}
          py={1.125}
          px={1}
        >
          <IconButton
            size="small"
            onClick={onPay}
            tooltip={companyT("employees.pay")}
            sx={{
              backgroundColor: "primary.light",
              color: "text.primary",
              p: 1,
              "&:hover svg": {
                color: "common.white",
              },
            }}
            variant="contained"
          >
            <CardSendIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onDelete}
            tooltip={commonT("delete")}
            sx={{
              backgroundColor: "primary.light",
              color: "text.primary",
              p: 1,
              "&:hover svg": {
                color: "common.white",
              },
            }}
            variant="contained"
          >
            <TrashIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        px={{ xs: 0, md: 3 }}
      >
        {items.map((item) => {
          const indexSelected = selectedList.findIndex(
            (selected) => selected.id === item.id,
          );
          return (
            <TableRow key={item.id}>
              <BodyCell>
                <Checkbox
                  checked={indexSelected !== -1}
                  onChange={onToggleSelect(item, indexSelected)}
                />
              </BodyCell>
              {isMdSmaller ? (
                <MobileContentCell item={item} />
              ) : (
                <DesktopCells item={item} />
              )}

              <ActionsCell
                onEdit={onActionToItem(DataAction.UPDATE, item)}
                onDelete={onActionToItem(DataAction.DELETE, item)}
                hasPopup={false}
                options={
                  !item.is_pay_user
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
        containerProps={{ px: 3, pt: 2.5 }}
        onChangePage={onChangePage}
        onChangeSize={onChangeSize}
      />
      {action === DataAction.OTHER && (
        <ConfirmDialog
          open
          onClose={onResetAction}
          title={companyT("employees.confirmPayment.title")}
          content={companyT("employees.confirmPayment.content", { count: 1 })}
        />
      )}
      {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={
            {
              email: item?.email,
              position: item?.position?.id,
            } as EmployeeData
          }
          onSubmit={onUpdateEmployee}
        />
      )}

      <DeleteConfirm
        open={action === DataAction.DELETE}
        onClose={onResetAction}
        title={companyT("employees.confirmRemove.title")}
        content={companyT("employees.confirmRemove.content", {
          count: selectedList.length,
        })}
        items={selectedList}
        onSubmit={onSubmitDelete}
      />
    </>
  );
};

export default memo(ItemList);

const MOBILE_HEADER_LIST = [{ value: "#", width: "70%", align: "left" }];
