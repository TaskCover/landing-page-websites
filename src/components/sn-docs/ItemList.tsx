"use client";

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { Skeleton, TableCell, TableRow } from "@mui/material";
import FixedLayout from "components/FixedLayout";
import Pagination from "components/Pagination";
import { CellProps, TableLayout } from "components/Table";
import { DEFAULT_PAGING } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";
import { memo, useEffect, useMemo } from "react";
import { useDocs } from "store/docs/selectors";
import { getPath } from "utils/index";
import DesktopCells from "./DesktopCells";
import { RowGroup } from "./ItemDoc";
import MobileContentCell from "./MobileContentCell";
import { DocGroupByEnum } from "constant/enums";

export declare type TDocumentGroup = {
  _id: string;
  name: string;
  documents: Array<{ [key: string]: any }>;
};

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
    filters,
    onGetDocs,
  } = useDocs();
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
  const onChangeQueries = (queries) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);

    onGetDocs(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ page: newPage, size: pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ page: 1, size: newPageSize });
  };

  useEffect(() => {
    if (!isReady) return;
    onGetDocs({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetDocs]);

  return (
    <>
      <FixedLayout>
        <TableLayout
          headerList={headerList}
          pending={isFetching}
          error={error as string}
          noData={!isIdle && items?.length === 0}
          px={{ xs: 0, md: 3 }}
          headerProps={{
            sx: { px: { xs: 0.5, md: 2 } },
          }}
        >
          {isFetching && <TablePending prepareCols={headerList.length} />}
          {!query?.group &&
            Array.isArray(items[0]?.docs) &&
            items[0]?.docs.map((item) => {
              return (
                <TableRow key={item._id}>
                  {!isMdSmaller ? (
                    <DesktopCells item={item} />
                  ) : (
                    <MobileContentCell item={item} />
                  )}
                </TableRow>
              );
            })}

          {query?.group_by == DocGroupByEnum.CREATED_BY &&
            items.map((item) => {
              return (
                <RowGroup
                  key={item?._id}
                  title={item.groupInfo?.fullname || "Unknown"}
                  item={item}
                />
              );
            })}
          {query?.group_by === DocGroupByEnum.PROJECT_ID &&
            items.map((item) => {
              return (
                <RowGroup
                  key={item?._id}
                  title={item.groupInfo?.name || "No name"}
                  item={item}
                />
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

const TablePending = ({ prepareRows = 5, prepareCols }) => {
  const preRenderCells = Array.apply(null, Array(prepareCols)).map((_, i) => i);
  const preRenderRows = Array.apply(null, Array(prepareRows)).map((_, j) => j);
  return preRenderRows.map((_, i) => (
    <TableRow key={i}>
      {preRenderCells.map((_, j) => (
        <TableCell key={j}>
          <Skeleton height={100} width="100%" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default memo(ItemList);
