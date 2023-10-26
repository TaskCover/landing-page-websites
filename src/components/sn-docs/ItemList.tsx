"use client";

import { memo, useEffect, useMemo } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, CellProps } from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";
import useBreakpoint from "hooks/useBreakpoint";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";
import { usePositions } from "store/company/selectors";
import { getPath } from "utils/index";
import { DEFAULT_PAGING, NS_COMMON, NS_COMPANY } from "constant/index";
import Pagination from "components/Pagination";
import { useTranslations } from "next-intl";
import FixedLayout from "components/FixedLayout";
import ItemDoc from "./ItemDoc";

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
  } = usePositions();

  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();

  const pathname = usePathname();
  const { initQuery, isReady, query } = useQueryParams();

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: "Document",
        width: "30%",
        align: "left",
      },
      {
        value: "Created at",
        width: "23.333%",
      },
      { value: "Last edited", width: "23.333%" },
      { value: "Creator", width: "23.333%" },
    ],
    [],
  );
  const mobileHeaderList: CellProps[] = useMemo(
    () => [
      {
        value: "Document",
        width: "23.333%",
        align: "left",
      },
      {
        value: "Created at",
        width: "23.333%",
      },
      { value: "Last edited", width: "23.333%" },
      { value: "Creator", width: "30%" },
    ],
    [],
  );

  const headerList = useMemo(() => {
    const additionalHeaderList = isMdSmaller
      ? mobileHeaderList
      : desktopHeaderList;

    return [...additionalHeaderList] as CellProps[];
  }, [desktopHeaderList, isMdSmaller, mobileHeaderList]);

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
            sx: { px: { xs: 0.5, md: 2 } },
          }}
        >
          {items.map((item) => {
            return (
              <TableRow key={item.id}>
                <ItemDoc></ItemDoc>
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
    </>
  );
};

export default memo(ItemList);
