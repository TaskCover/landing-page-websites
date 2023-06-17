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
import { DEFAULT_PAGING } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { usePathname, useRouter } from "next/navigation";
import { getPath } from "utils/index";
import { IconButton, Text, Checkbox } from "components/shared";
import { useCompanies } from "store/company/selectors";
import ConfirmDialog from "components/ConfirmDialog";
import { Company } from "store/company/reducer";
import { DataAction } from "constant/enums";
import { MobileContentCell, DesktopCells } from "./components";
import useBreakpoint from "hooks/useBreakpoint";
import CircleTickIcon from "icons/CircleTickIcon";
import CloseSquareIcon from "icons/CloseSquareIcon";

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
    onGetCompanies,
  } = useCompanies();

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();

  const [item, setItem] = useState<Company | undefined>();
  const [ids, setIds] = useState<string[]>([]);
  const [action, setAction] = useState<DataAction | undefined>();

  const isCheckedAll = useMemo(
    () => Boolean(ids.length && ids.length === items.length),
    [ids.length, items.length],
  );

  const onChangeAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setIds(items.map((item) => item.id));
      } else {
        setIds([]);
      }
    },
    [items],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? MOBILE_HEADER_LIST
      : DESKTOP_HEADER_LIST;

    return [
      {
        value: <Checkbox checked={isCheckedAll} onChange={onChangeAll} />,
        width: isMdSmaller ? "10%" : "3%",
      },
      ...additionalHeaderList,
      { value: "", width: isMdSmaller ? "20%" : "8%" },
    ] as CellProps[];
  }, [isMdSmaller, isCheckedAll, onChangeAll]);

  const onToggleSelect = (id: string, indexSelected: number) => {
    return () => {
      if (indexSelected === -1) {
        setIds((prevIds) => [...prevIds, id]);
      } else {
        setIds((prevIds) => {
          const newIds = [...prevIds];
          newIds.splice(indexSelected, 1);
          return newIds;
        });
      }
    };
  };

  const onActionToItem = (action: DataAction, item?: Company) => {
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
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);

    onGetCompanies(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  const onApproveOrReject = () => {
    //
  };

  useEffect(() => {
    if (!isIdle || !isReady) return;
    onGetCompanies({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isIdle, isReady, onGetCompanies]);

  useEffect(() => {
    setIds([]);
  }, [pageIndex]);

  return (
    <>
      <Stack flex={1} px={{ xs: 1, md: 3 }}>
        {!!ids.length && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            p={3}
            pb={0.25}
          >
            <IconButton
              size="small"
              onClick={onApproveOrReject}
              tooltip="Thanh toán"
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
              onClick={onApproveOrReject}
              tooltip="Xóa bỏ"
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
          pb={3}
        >
          {items.map((item) => {
            const indexSelected = ids.findIndex(
              (idValue) => idValue === item.id,
            );
            return (
              <TableRow key={item.id}>
                <BodyCell>
                  <Checkbox
                    checked={indexSelected !== -1}
                    onChange={onToggleSelect(item.id, indexSelected)}
                  />
                </BodyCell>
                {isMdSmaller ? (
                  <MobileContentCell item={item} />
                ) : (
                  <DesktopCells item={item} />
                )}

                <ActionsCell
                  onChildClick={onActionToItem(DataAction.OTHER, item)}
                >
                  <>
                    <CircleTickIcon
                      filled={false}
                      sx={{ color: "grey.400" }}
                      fontSize="medium"
                    />
                    <Text ml={2} variant="body2" color="grey.400">
                      Approve
                    </Text>
                  </>
                </ActionsCell>
              </TableRow>
            );
          })}
        </TableLayout>
      </Stack>

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
    </>
  );
};

export default memo(ItemList);

const DESKTOP_HEADER_LIST = [
  { value: "Họ tên", width: "15%", align: "left" },
  { value: "Email", width: "15%", align: "left" },
  { value: "Chức vụ", width: "15%" },
  { value: "Ngày tạo", width: "13.5%" },
  { value: "Ngày hết hạn", width: "13.5%" },
  { value: "Trạng thái", width: "17%" },
];

const MOBILE_HEADER_LIST = [
  { value: "Nhân viên", width: "70%", align: "left" },
];
