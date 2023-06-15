"use client";

import { memo, useEffect, useState, useMemo } from "react";
import { Checkbox, TableRow } from "@mui/material";
import {
  TableLayout,
  BodyCell,
  CellProps,
  StatusCell,
  ActionsCell,
} from "components/Table";
import { DATE_TIME_FORMAT_SLASH, DEFAULT_PAGING } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { TEXT_STATUS, COLOR_STATUS } from "./helpers";
import { usePathname, useRouter } from "next/navigation";
import {
  cleanObject,
  formatDate,
  getDataFromKeys,
  stringifyURLSearchParams,
} from "utils/index";
import { IconButton, Text } from "components/shared";
import PencilIcon from "icons/PencilIcon";
import { useEmployees } from "store/company/selectors";
import CardSendIcon from "icons/CardSendIcon";
import ConfirmDialog from "components/ConfirmDialog";
import { Employee } from "store/company/reducer";
import { DataAction } from "constant/enums";
import { EmployeeData } from "store/company/actions";
import Form from "./Form";

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
  } = useEmployees();

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [item, setItem] = useState<Employee | undefined>();
  const [action, setAction] = useState<DataAction | undefined>();

  const headerList: CellProps[] = useMemo(() => {
    return [
      {
        value: <Checkbox />,
        width: "3%",
      },
      { value: "Họ tên", width: "15%" },
      { value: "Email", width: "15%" },
      { value: "Chức vụ", width: "15%" },
      { value: "Ngày tạo", width: "13.5%" },
      { value: "Ngày hết hạn", width: "13.5%" },
      { value: "Trạng thái", width: "17%" },
      { value: "", width: "8%" },
    ];
  }, []);

  const onActionToItem = (action: DataAction, item?: Employee) => {
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

  const onDeleteEmployee = (id: string) => {
    return async () => {
      return await "Pending";
    };
  };

  useEffect(() => {
    if (!isIdle || !isReady) return;
    onGetEmployees({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isIdle, isReady, onGetEmployees]);

  return (
    <>
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        p={3}
      >
        {items.map((item) => (
          <TableRow key={item.id}>
            <BodyCell>
              <Checkbox />
            </BodyCell>
            <BodyCell>{item.fullname}</BodyCell>
            <BodyCell noWrap>{item.email}</BodyCell>
            <BodyCell>{item.position?.name}</BodyCell>
            <BodyCell
              tooltip={formatDate(item.created_time, DATE_TIME_FORMAT_SLASH)}
            >
              {formatDate(item.created_time)}
            </BodyCell>
            <BodyCell
              tooltip={formatDate(item.date_end_using, DATE_TIME_FORMAT_SLASH)}
            >
              {formatDate(item.date_end_using)}
            </BodyCell>
            <StatusCell
              text={TEXT_STATUS[Number(item.is_pay_user)]}
              color={COLOR_STATUS[Number(item.is_pay_user)]}
              width={93}
            />

            <ActionsCell
              onEdit={onActionToItem(DataAction.UPDATE, item)}
              onDelete={onDeleteEmployee(item.id)}
              onChildClick={onActionToItem(DataAction.OTHER, item)}
            >
              <CardSendIcon sx={{ color: "grey.400" }} fontSize="medium" />
              <Text ml={2} variant="body2" color="grey.400">
                Thanh toán
              </Text>
            </ActionsCell>
          </TableRow>
        ))}
      </TableLayout>

      <Pagination
        totalItems={totalItems}
        totalPages={totalPages}
        page={pageIndex}
        pageSize={pageSize}
        containerProps={{ px: 3, pb: 3 }}
        onChangePage={onChangePage}
        onChangeSize={onChangeSize}
      />
      {action === DataAction.OTHER && (
        <ConfirmDialog
          open
          onClose={onResetAction}
          title="Xác nhận thanh toán"
          content="Bạn có chắc chắn thanh toán tất cả sự lựa chọn?"
        />
      )}
      {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={
            getDataFromKeys(item, ["email", "position"]) as EmployeeData
          }
          onSubmit={onUpdateEmployee}
        />
      )}
    </>
  );
};

export default memo(ItemList);
