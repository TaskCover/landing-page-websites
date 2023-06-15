"use client";

import { memo, useEffect } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, BodyCell, CellProps, StatusCell } from "components/Table";
import { useProjects } from "store/project/selectors";
import { DEFAULT_PAGING } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { TEXT_STATUS, COLOR_STATUS } from "./helpers";
import BookmarkIcon from "icons/BookmarkIcon";
import { usePathname, useRouter } from "next/navigation";
import { cleanObject, stringifyURLSearchParams } from "utils/index";
import { IconButton } from "components/shared";
import PencilIcon from "icons/PencilIcon";

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
    onGetProjects,
  } = useProjects();

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (queries: { [key: string]: any }) => {
    let newQueries = { ...query, ...queries };
    newQueries = cleanObject(newQueries);
    const queryString = stringifyURLSearchParams(newQueries);
    push(`${pathname}${queryString}`);

    onGetProjects(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  useEffect(() => {
    if (!isIdle || !isReady) return;
    onGetProjects({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isIdle, isReady, onGetProjects]);

  return (
    <>
      <TableLayout
        headerList={HEADER_LIST}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        p={3}
      >
        {items.map((item, index) => {
          return (
            <TableRow key={item.id}>
              <BodyCell align="center">
                {(pageIndex - 1) * pageSize + (index + 1)}
              </BodyCell>
              <BodyCell>{item.name}</BodyCell>
              <BodyCell>{item.name}</BodyCell>
              {item.status ? (
                <StatusCell
                  text={TEXT_STATUS[item.status]}
                  color={COLOR_STATUS[item.status]}
                  width={93}
                />
              ) : (
                <BodyCell />
              )}

              <BodyCell align="center">
                <BookmarkIcon
                  color="primary"
                  fontSize="medium"
                  active={item.saved}
                />
              </BodyCell>
              <BodyCell>
                <IconButton tooltip="Sửa" variant="contained" size="small">
                  <PencilIcon />
                </IconButton>
              </BodyCell>
            </TableRow>
          );
        })}
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
    </>
  );
};

export default memo(ItemList);

const HEADER_LIST: CellProps[] = [
  { value: "STT", width: "5%", align: "center" },
  { value: "Tên dự án", width: "35%" },
  { value: "Người phụ trách", width: "30%" },
  { value: "Trạng thái", width: "20%" },
  { value: "", width: "5%" },
  { value: "", width: "5%" },
];
