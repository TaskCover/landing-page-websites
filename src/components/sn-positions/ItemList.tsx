"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, CellProps, ActionsCell } from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import { useParams, useRouter } from "next/navigation";
import useBreakpoint from "hooks/useBreakpoint";
import { DataAction } from "constant/enums";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";
import { Position } from "store/company/reducer";
import { usePositions } from "store/company/selectors";
import { PositionData } from "store/company/actions";
import Form from "./Form";
import { getDataFromKeys } from "utils/index";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    onGetPositions,
    onUpdatePosition: onUpdatePositionAction,
  } = usePositions();

  const { isReady } = useQueryParams();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();

  const params = useParams();

  const [item, setItem] = useState<Position | undefined>();
  const [action, setAction] = useState<DataAction | undefined>();

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? MOBILE_HEADER_LIST
      : DESKTOP_HEADER_LIST;

    return [
      ...additionalHeaderList,
      { value: "", width: isMdSmaller ? "25%" : "10%" },
    ] as CellProps[];
  }, [isMdSmaller]);

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

  const onUpdatePosition = async (data: PositionData) => {
    if (!item) return;
    return await onUpdatePositionAction(item.id, data.name);
  };

  const onDeletePosition = (id: string) => {
    return async () => {
      return await "Pending";
    };
  };

  useEffect(() => {
    if (!isIdle || !isReady) return;
    onGetPositions();
  }, [isIdle, isReady, onGetPositions]);

  return (
    <>
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && items.length === 0}
        py={3}
        px={{ xs: 1, md: 3 }}
      >
        {items.map((item, index) => {
          return (
            <TableRow key={item.id}>
              {isMdSmaller ? (
                <MobileContentCell item={item} />
              ) : (
                <DesktopCells item={item} order={index + 1} />
              )}
              <ActionsCell
                onEdit={onActionToItem(DataAction.UPDATE, item)}
                onDelete={onDeletePosition(item.id)}
                onChildClick={onActionToItem(DataAction.OTHER, item)}
              />
            </TableRow>
          );
        })}
      </TableLayout>
      {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={getDataFromKeys(item, ["name"]) as PositionData}
          onSubmit={onUpdatePosition}
        />
      )}
    </>
  );
};

export default memo(ItemList);

const DESKTOP_HEADER_LIST = [
  { value: "STT", width: "5%", align: "center" },
  {
    value: "Tên chức vụ",
    width: "25%",
    align: "left",
  },
  {
    value: "Người tạo",
    width: "20%",
    align: "left",
  },
  { value: "Ngày tạo", width: "20%" },
  { value: "Số người giữ chức vụ", width: "20%" },
  { value: "", width: "10%" },
];

const MOBILE_HEADER_LIST = [{ value: "Chức vụ", width: "75%", align: "left" }];
