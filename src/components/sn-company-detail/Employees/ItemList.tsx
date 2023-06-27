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
import { DEFAULT_PAGING, NS_COMMON, NS_MANAGER } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { usePathname, useRouter } from "next-intl/client";
import { getPath } from "utils/index";
import { IconButton, Checkbox } from "components/shared";
import { useEmployeesOfCompany } from "store/manager/selectors";
import { Employee } from "store/company/reducer";
import DesktopCells from "./DesktopCells";
import MobileContentCell from "./MobileContentCell";
import { ApproveOrRejectConfirm } from "./components";
import useBreakpoint from "hooks/useBreakpoint";
import CircleTickIcon from "icons/CircleTickIcon";
import CloseSquareIcon from "icons/CloseSquareIcon";
import { PaymentStatus } from "components/sn-employees/helpers";
import { useParams } from "next/navigation";
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
    onApproveOrReject: onApproveOrRejectAction,
  } = useEmployeesOfCompany();
  const commonT = useTranslations(NS_COMMON);
  const managerT = useTranslations(NS_MANAGER);

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();
  const { id: companyId } = useParams();

  const [selectedList, setSelectedList] = useState<Employee[]>([]);
  const [action, setAction] = useState<PaymentStatus | undefined>();
  const [id, setId] = useState<string | undefined>();

  const nOfWaitings = useMemo(
    () => items.filter((item) => item?.is_pay_user === null).length,
    [items],
  );

  const isCheckedAll = useMemo(
    () => Boolean(selectedList.length && selectedList.length === nOfWaitings),
    [selectedList.length, nOfWaitings],
  );

  const textAction = useMemo(
    () => (action !== undefined ? TEXT_ACTION[action] : ""),
    [action],
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
      { value: commonT("name"), width: "20%", align: "left" },
      { value: "Email", width: "20%", align: "left" },
      { value: commonT("creator"), width: "17%", align: "left" },
      { value: commonT("creationDate"), width: "15%" },
      { value: commonT("status"), width: "17%" },
    ],
    [commonT],
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

  const onResetAction = () => {
    setAction(undefined);
    setId(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (queries: { [key: string]: any }) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);
    if (!companyId) return;
    onGetEmployees(companyId, newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  const onApproveOrReject = (type: PaymentStatus, id?: string) => {
    return () => {
      setAction(type);
      setId(id);
    };
  };

  const onSubmitApproveOrReject = async () => {
    if (action === undefined) return;
    const ids = id ? [id] : selectedList.map((item) => item.id);
    try {
      const idsResponse = await onApproveOrRejectAction(ids, action);
      if (idsResponse.length) {
        setAction(undefined);
        setSelectedList([]);
        setId(undefined);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!isReady || !companyId) return;
    onGetEmployees(companyId, { ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, companyId, onGetEmployees]);

  useEffect(() => {
    setSelectedList([]);
  }, [pageIndex]);

  return (
    <>
      {!!selectedList.length && (
        <Stack direction="row" alignItems="center" spacing={3} p={3} pb={0.25}>
          <IconButton
            size="small"
            onClick={onApproveOrReject(PaymentStatus.PAID)}
            tooltip={managerT("companyList.approve")}
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
            <CircleTickIcon filled={false} fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onApproveOrReject(PaymentStatus.UNPAID)}
            tooltip={managerT("companyList.reject")}
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
            <CloseSquareIcon fontSize="small" />
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
                {item.is_pay_user === null && (
                  <Checkbox
                    checked={indexSelected !== -1}
                    onChange={onToggleSelect(item, indexSelected)}
                  />
                )}
              </BodyCell>
              {isMdSmaller ? (
                <MobileContentCell item={item} />
              ) : (
                <DesktopCells item={item} />
              )}

              <ActionsCell
                options={
                  item.is_pay_user === null
                    ? [
                        {
                          content: managerT("companyList.approve"),
                          onClick: onApproveOrReject(
                            PaymentStatus.PAID,
                            item.id,
                          ),
                          icon: (
                            <CircleTickIcon filled={false} fontSize="small" />
                          ),
                        },
                        {
                          content: managerT("companyList.reject"),
                          onClick: onApproveOrReject(
                            PaymentStatus.UNPAID,
                            item.id,
                          ),
                          icon: <CloseSquareIcon fontSize="small" />,
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
      <ApproveOrRejectConfirm
        open={action !== undefined}
        onClose={onResetAction}
        title={managerT("employeeList.confirm.title", { label: textAction })}
        content={managerT("employeeList.confirm.content", {
          label: textAction,
          count: id ? 1 : selectedList.length,
        })}
        items={id ? undefined : selectedList}
        onSubmit={onSubmitApproveOrReject}
        action={textAction}
      />
    </>
  );
};

export default memo(ItemList);

const MOBILE_HEADER_LIST = [{ value: "#", width: "70%", align: "left" }];

const TEXT_ACTION: { [key in PaymentStatus]: string } = {
  [PaymentStatus.PAID]: "companyList.approve",
  [PaymentStatus.UNPAID]: "companyList.reject",
};
