"use client";
import FixedLayout from "components/FixedLayout";
import ItemDocs from "./components/ItemDocs";
import Pagination from "components/Pagination";
import useQueryParams from "hooks/useQueryParams";
import { CellProps, TableLayout } from "components/Table";
import { DEFAULT_PAGING, NS_COMMON, NS_COMPANY } from "constant/index";
import { Employee } from "store/company/reducer";
import { getPath } from "utils/index";
import { HEADER_HEIGHT } from "layouts/Header";
import { memo, useEffect, useMemo, useState } from "react";
import { useEmployees } from "store/company/selectors";
import { usePathname, useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";

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
    onGetEmployees,
  } = useEmployees();
  const companyT = useTranslations(NS_COMPANY);
  const commonT = useTranslations(NS_COMMON);

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [selectedList, setSelectedList] = useState<Employee[]>([]);

  const headerList: CellProps[] = useMemo(
    () => [
      { value: "Document", width: "35%", align: "left" },
      { value: "Created at", width: "21.666%", align: "left" },
      { value: "Last edited", width: "21.666%" },
      { value: "Creator", width: "21.666%" },
    ],
    [commonT, companyT],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (queries: { [key: string]: any }) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);

    onGetEmployees(newQueries);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  useEffect(() => {
    if (!isReady) return;
    onGetEmployees({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, onGetEmployees]);

  useEffect(() => {
    setSelectedList([]);
  }, [pageIndex]);

  return (
    <FixedLayout>
      <TableLayout
        headerList={headerList}
        pending={isFetching}
        error={error as string}
        noData={!isIdle && totalItems === 0}
        px={{ xs: 0, md: 3 }}
        containerHeaderProps={{
          sx: {
            maxHeight: { md: HEADER_HEIGHT },
            minHeight: { md: HEADER_HEIGHT },
          },
        }}
        sx={{ bgcolor: { xs: "grey.50", md: "transparent" } }}
      >
        {items.map((item) => (
          <ItemDocs item={item} key={item.id}></ItemDocs>
        ))}
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
  );
};

export default memo(ItemList);
