"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, CellProps } from "components/Table";
import { useMembersOfProject } from "store/project/selectors";
import { DEFAULT_PAGING } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getPath } from "utils/index";
import useBreakpoint from "hooks/useBreakpoint";
import { DataAction } from "constant/enums";
import { Member } from "store/project/reducer";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";

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
    id,
    onGetMembersOfProject,
  } = useMembersOfProject();

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();

  const params = useParams();

  const projectId = useMemo(() => params.id, [params.id]);

  const [item, setItem] = useState<Member | undefined>();
  const [action, setAction] = useState<DataAction | undefined>();

  const headerList = useMemo(() => {
    return isMdSmaller ? MOBILE_HEADER_LIST : DESKTOP_HEADER_LIST;
  }, [isMdSmaller]) as CellProps[];

  const onActionToItem = (action: DataAction, item?: Member) => {
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
    const path = getPath(pathname, newQueries, { id: projectId });
    push(path);

    onGetMembersOfProject(projectId, newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  useEffect(() => {
    if (!isReady || !projectId || id === projectId) return;
    onGetMembersOfProject(projectId, { ...DEFAULT_PAGING, ...initQuery });
  }, [id, initQuery, isReady, onGetMembersOfProject, projectId]);

  return (
    <>
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        py={3}
        px={{ xs: 1, md: 3 }}
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

const DESKTOP_HEADER_LIST = [
  { value: "#", width: "5%", align: "center" },
  {
    value: "Member",
    width: "20%",
    align: "left",
  },
  {
    value: "Email",
    width: "15%",
    align: "left",
  },
  { value: "Position", width: "20%" },
  { value: "Hours worked", width: "15%" },
  { value: "Date added project", width: "15%" },
  { value: "", width: "10%" },
];

const MOBILE_HEADER_LIST = [{ value: "#", width: "75%", align: "left" }];
