"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, CellProps, ActionsCell } from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import useBreakpoint from "hooks/useBreakpoint";
import { DataAction } from "constant/enums";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";
import { ProjectType } from "store/company/reducer";
import { useProjectTypes } from "store/company/selectors";
import { ProjectTypeData } from "store/company/actions";
import Form from "./Form";
import { getDataFromKeys } from "utils/index";

const ItemList = () => {
  const {
    items,
    isFetching,
    isIdle,
    error,
    onGetProjectTypes,
    onUpdateProjectType,
    onDeleteProjectType,
  } = useProjectTypes();

  const { isReady } = useQueryParams();
  const { isMdSmaller } = useBreakpoint();

  const [item, setItem] = useState<ProjectType | undefined>();
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

  const onActionToItem = (action: DataAction, item?: ProjectType) => {
    return () => {
      item && setItem(item);
      setAction(action);
    };
  };

  const onResetAction = () => {
    setItem(undefined);
    setAction(undefined);
  };

  const onUpdate = async (data: ProjectTypeData) => {
    if (!item) return;
    return await onUpdateProjectType(item.id, data.name);
  };

  const onDelete = (id: string) => {
    return async () => {
      return await onDeleteProjectType(id);
    };
  };

  useEffect(() => {
    if (!isIdle || !isReady) return;
    onGetProjectTypes();
  }, [isIdle, isReady, onGetProjectTypes]);

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
                onDelete={onDelete(item.id)}
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
          initialValues={getDataFromKeys(item, ["name"]) as ProjectTypeData}
          onSubmit={onUpdate}
        />
      )}
    </>
  );
};

export default memo(ItemList);

const DESKTOP_HEADER_LIST = [
  { value: "STT", width: "10%", align: "center" },
  {
    value: "Tên loại dự án",
    width: "30%",
    align: "left",
  },
  {
    value: "Người tạo",
    width: "30%",
    align: "left",
  },
  { value: "Ngày tạo", width: "20%" },
];

const MOBILE_HEADER_LIST = [{ value: "Chức vụ", width: "75%", align: "left" }];
