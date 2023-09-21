"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { TableRow, Box } from "@mui/material";
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
import { useAuth } from "store/app/selectors";
import FixedLayout from "components/FixedLayout";

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
  const { onGetProfile, user } = useAuth();

  const pathname = usePathname();
  const { initQuery, isReady, query } = useQueryParams();

  const [item, setItem] = useState<Position | undefined>();
  const [action, setAction] = useState<DataAction | undefined>();

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: "Document",
        width: "25%",
        align: "left",
      },
      {
        value: "Created at",
        width: "25%",
        align: "left",
      },
      { value: "Last edited", width: "25%" },
      { value: "Creator", width: "25%" },
    ],
    [commonT, companyT],
  );
  const mobileHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: commonT("name"),
        width: "20%",
        align: "left",
      },
      {
        value: commonT("creator"),
        width: "25%",
        align: "left",
      },
      { value: commonT("creationDate"), width: "20%" },
      { value: companyT("positions.numberOfEmployees"), width: "20%" },
    ],
    [commonT, companyT],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? mobileHeaderList
      : desktopHeaderList;

    return [...additionalHeaderList] as CellProps[];
  }, [desktopHeaderList, isMdSmaller, mobileHeaderList]);

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
    const result = await onUpdatePosition(item.id, data.name);
    if (result && item.id === user?.position?.id) {
      onGetProfile();
    }
    return result;
  };

  useEffect(() => {
    if (!isReady) return;
    onGetPositions({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetPositions]);

  return (
    <>
      <FixedLayout>
        <TableLayout
          headerList={headerList}
          pending={isFetching}
          error={error as string}
          noData={!isIdle && items.length === 0}
          px={{ xs: 0, md: 3 }}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 }, wordBreak: "break-all" },
          }}
        >
          {items.map((item) => {
            return (
              <TableRow key={item.id}>
                {isMdSmaller ? (
                  <MobileContentCell item={item} />
                ) : (
                  <DesktopCells item={item} />
                )}
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
