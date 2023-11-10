/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, CellProps } from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";
import useBreakpoint from "hooks/useBreakpoint";
import MobileContentCell from "./MobileContentCell";
import DesktopCells from "./DesktopCells";
import { getPath } from "utils/index";
import { DEFAULT_PAGING } from "constant/index";
import Pagination from "components/Pagination";
import FixedLayout from "components/FixedLayout";
import { useDocs } from "store/docs/selectors";
import ItemDoc, { ItemDocProject } from "./ItemDoc";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const [listCreate, setListCreate] = useState([]);
  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    setListCreate([]);
    const res: any = [];
    for (let i = 0; i < items.length; i++) {
      let createdById = items[i].created_by ? items[i].created_by.id : null;

      if (!res.some((item) => item && item.id === createdById)) {
        res.push(items[i].created_by);
      }
    }
    setListCreate(res);
  }, [items]);

  useEffect(() => {
    setListProject([]);
    const res: any = [];
    for (let i = 0; i < items.length; i++) {
      let projectById = items[i].project_id ? items[i].project_id.id : null;

      if (!res.some((item) => item && item.id === projectById)) {
        res.push(items[i].project_id);
      }
    }

    let filteredArray = res.filter((item) => item !== null);
    let nullItems = res.find((item) => item === null);
    filteredArray = filteredArray.concat(nullItems);
    setListProject(filteredArray);
  }, [items]);

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
          {(!query?.group || query?.group == 1) &&
            items.length > 0 &&
            items?.map((item) => {
              return (
                <TableRow key={item.id}>
                  {!isMdSmaller ? (
                    <DesktopCells item={item} />
                  ) : (
                    <MobileContentCell item={item} />
                  )}
                </TableRow>
              );
            })}

          {query?.group == 2 &&
            listCreate.map((e: any) => {
              const data = items.filter(
                (value) => value?.created_by?.id === e?.id,
              );
              return <ItemDoc key={e?.id} items={data} data={e}></ItemDoc>;
            })}
          {query?.group == 3 &&
            listProject.map((e: any) => {
              if (e === undefined) {
                return;
              }

              const data = items.filter(
                (value) => value?.project_id?.id === e?.id,
              );
              return (
                <ItemDocProject
                  key={e?.id}
                  items={data}
                  data={e}
                ></ItemDocProject>
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
