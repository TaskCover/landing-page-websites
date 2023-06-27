"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, CellProps, ActionsCell } from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";
import useBreakpoint from "hooks/useBreakpoint";
import { DataAction } from "constant/enums";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";
import { Position } from "store/company/reducer";
import { usePositions } from "store/company/selectors";
import { PositionData } from "store/company/actions";
import Form from "./Form";
import { getDataFromKeys, getPath } from "utils/index";
import { DEFAULT_PAGING, NS_COMMON, NS_COMPANY } from "constant/index";
import Pagination from "components/Pagination";
import { useTranslations } from "next-intl";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    onGetPositions,
    onUpdatePosition,
    onDeletePosition,
  } = usePositions();
  const commonT = useTranslations(NS_COMMON);
  const companyT = useTranslations(NS_COMPANY);

  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();

  const pathname = usePathname();
  const { initQuery, isReady, query } = useQueryParams();

  const [item, setItem] = useState<Position | undefined>();
  const [action, setAction] = useState<DataAction | undefined>();

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: "#", width: "5%", align: "center" },
      {
        value: commonT("name"),
        width: "25%",
        align: "left",
      },
      {
        value: commonT("creator"),
        width: "20%",
        align: "left",
      },
      { value: commonT("creationDate"), width: "20%" },
      { value: companyT("positions.numberOfEmployees"), width: "20%" },
      { value: "", width: "10%" },
    ],
    [commonT, companyT],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? MOBILE_HEADER_LIST
      : desktopHeaderList;

    return [
      ...additionalHeaderList,
      { value: "", width: isMdSmaller ? "25%" : "10%" },
    ] as CellProps[];
  }, [desktopHeaderList, isMdSmaller]);

  const onActionToItem = (action: DataAction, item?: Position) => {
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

    onGetPositions(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  const onUpdate = async (data: PositionData) => {
    if (!item) return;
    return await onUpdatePosition(item.id, data.name);
  };

  const onDelete = (id: string) => {
    return async () => {
      return await onDeletePosition(id);
    };
  };

  useEffect(() => {
    if (!isReady) return;
    onGetPositions({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetPositions]);

  return (
    <>
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && items.length === 0}
        px={{ xs: 0, md: 3 }}
      >
        {items.map((item, index) => {
          return (
            <TableRow key={item.id}>
              {isMdSmaller ? (
                <MobileContentCell item={item} />
              ) : (
                <DesktopCells
                  item={item}
                  order={(pageIndex - 1) * pageSize + (index + 1)}
                />
              )}
              <ActionsCell
                onEdit={onActionToItem(DataAction.UPDATE, item)}
                onDelete={onDelete(item.id)}
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
      {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={getDataFromKeys(item, ["name"]) as PositionData}
          onSubmit={onUpdate}
        />
      )}
    </>
  );
};

export default memo(ItemList);

const MOBILE_HEADER_LIST = [{ value: "#", width: "75%", align: "left" }];
