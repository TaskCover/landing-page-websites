"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useBudgets } from "store/project/budget/selector";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslations } from "next-intl";
import {
  DATE_TIME_FORMAT_SLASH,
  DEFAULT_PAGING,
  NS_PROJECT,
} from "constant/index";
import { useParams } from "next/navigation";
import { BodyCell, CellProps, TableLayout } from "components/Table";
import { HEADER_HEIGHT } from "../../../layouts/Header";
import { Stack, TableRow } from "@mui/material";
import MobileContentCell from "components/sn-project-detail/Members/MobileContentCell";
import Pagination from "components/Pagination";
import FixedLayout from "components/FixedLayout";
import { formatDate, getPath } from "utils/index";
import { useMembersOfProject } from "store/project/selectors";
import { TProjectBudgets } from "store/project/budget/action";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import useQueryParams from "hooks/useQueryParams";
import { usePathname, useRouter } from "next-intl/client";

const Item = () => {
  const [budgets, setBudgets] = useState<TProjectBudgets>([]);

  const {
    items: budgetItems,
    isFetching,
    isIdle,
    error,
    totalItems,
    pageSize,
    pageIndex,
    totalPages,
    get: getBudget,
  } = useBudgets();

  const { items: members, onGetMembersOfProject } = useMembersOfProject();

  const { isMdSmaller } = useBreakpoint();
  const projectT = useTranslations(NS_PROJECT);
  const params = useParams();
  const pathname = usePathname();
  const { initQuery, isReady, query } = useQueryParams();
  const { push } = useRouter();

  const projectId = useMemo(() => params.id, [params.id]) as string;

  useEffect(() => {
    if (!isReady || !projectId) return;
    getBudget({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isReady, getBudget, projectId]);

  useEffect(() => {
    onGetMembersOfProject(projectId, {});
  }, []);

  useEffect(() => {
    if (!budgetItems || !members || budgetItems.length == 0) return;
    const newBudgetData: TProjectBudgets = [];
    budgetItems.map((budget) => {
      budget = { ...budget };
      members.map((member) => {
        if (member.id === budget.owner) {
          budget.owner = member;
        }
      });
      if (typeof budget.owner === "string") {
        budget.owner = null;
      }
      budget.created_time = formatDate(
        budget.created_time,
        DATE_TIME_FORMAT_SLASH,
      );
      budget.start_date = formatDate(budget.start_date, DATE_TIME_FORMAT_SLASH);
      budget.end_date = formatDate(budget.end_date, DATE_TIME_FORMAT_SLASH);
      newBudgetData.push(budget);
    });
    setBudgets(newBudgetData);
  }, [budgetItems, members]);

  const desktopHeaderList: CellProps[] = useMemo(
    () => [
      { value: projectT("budget.table.budget"), width: "20%", align: "center" },
      { value: projectT("budget.table.owner"), width: "20%", align: "left" },
      { value: projectT("budget.table.cost"), width: "10%", align: "center" },
      {
        value: projectT("budget.table.budgetTimeUsed"),
        width: "25%",
        align: "center",
      },
      { value: projectT("budget.table.workTime"), width: "17.5%" },
      { value: projectT("budget.table.estimateTime"), width: "17.5%" },
    ],
    [projectT],
  );

  const mobileHeaderList = [{ value: "#", width: "75%", align: "left" }];

  const headerList = useMemo(
    () => (isMdSmaller ? mobileHeaderList : desktopHeaderList),
    [desktopHeaderList, isMdSmaller],
  ) as CellProps[];

  const onChangeQueries = (queries: { [key: string]: any }) => {
    const newQueries = { ...query, ...queries };
    const path = getPath(pathname, newQueries);
    push(path);
  };

  const onChangePage = (newPage: number) => {
    onChangeQueries({ pageIndex: newPage, pageSize });
  };

  const onChangeSize = (newPageSize: number) => {
    onChangeQueries({ pageIndex: 1, pageSize: newPageSize });
  };

  return (
    <>
      <FixedLayout>
        <TableLayout
          headerList={headerList}
          pending={isFetching}
          error={error as string}
          noData={!isIdle && totalItems === 0}
          px={{ xs: 0, md: 3 }}
          containerHeaderProps={{
            sx: {
              maxHeight: { xs: 0, md: undefined },
              minHeight: { xs: 0, md: HEADER_HEIGHT },
            },
          }}
        >
          {budgets?.map((budget) => {
            return (
              <TableRow key={budget.id}>
                {isMdSmaller ? (
                  <MobileContentCell item={budget} />
                ) : (
                  <>
                    <BodyCell align="center">{budget.name}</BodyCell>
                    <BodyCell align="left">
                      {budget.owner && typeof budget.owner === "object" && (
                        <Stack direction="row" alignItems="center">
                          <Avatar src={budget?.owner?.avatar?.link} size={35} />
                          <Text
                            paddingLeft="5px"
                            sx={{ width: "calc(100% - 35px)" }}
                          >
                            {budget.owner?.fullname}
                          </Text>
                        </Stack>
                      )}
                    </BodyCell>
                    <BodyCell align="center">--</BodyCell>
                    <BodyCell align="center">--</BodyCell>
                    <BodyCell align="center">--</BodyCell>
                    <BodyCell align="center">--</BodyCell>
                  </>
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

export default memo(Item);
