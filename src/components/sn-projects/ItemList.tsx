"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { TableRow } from "@mui/material";
import { TableLayout, BodyCell, CellProps } from "components/Table";
import { useProjects } from "store/project/selectors";
import { DEFAULT_PAGING } from "constant/index";
import useQueryParams from "hooks/useQueryParams";
import Pagination from "components/Pagination";
import { usePathname, useRouter } from "next/navigation";
import { cleanObject, stringifyURLSearchParams } from "utils/index";
import { IconButton } from "components/shared";
import PencilIcon from "icons/PencilIcon";
import useBreakpoint from "hooks/useBreakpoint";
import Form, { ProjectDataForm } from "./Form";
import { Member, Project } from "store/project/reducer";
import { ProjectData, getMembersOfProject } from "store/project/actions";
import { DataAction } from "constant/enums";
import { INITIAL_VALUES } from "./components/helpers";
import { useAppDispatch } from "store/hooks";
import DesktopCells from "./DesktopCells";
import MobileContentCell from "./MobileContentCell";

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
    onUpdateProject: onUpdateProjectAction,
  } = useProjects();
  const dispatch = useAppDispatch();

  const { initQuery, isReady, query } = useQueryParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isMdSmaller } = useBreakpoint();

  const [item, setItem] = useState<Project | undefined>();
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

  const initValues = useMemo(
    () =>
      item
        ? {
            name: item.name,
            description: item.description,
            owner: item.owner.id,
            type_project: item.type_project.id,
            start_date: item.start_date,
            end_date: item.end_date,
            expected_cost: item.expected_cost,
            working_hours: item.working_hours,
            members: item.members.map(({ id, fullname, ...rest }) => ({
              id,
              fullname,
              position: rest.position_project.id,
            })),
          }
        : INITIAL_VALUES,
    [item],
  );

  const onActionToItem = (action: DataAction, item?: Project) => {
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

  const onUpdateProject = async (data: ProjectData) => {
    if (!item) return;
    return await onUpdateProjectAction(item.id, data);
  };

  useEffect(() => {
    if (!isIdle || !isReady) return;
    onGetProjects({ ...DEFAULT_PAGING, ...initQuery });
  }, [initQuery, isIdle, isReady, onGetProjects]);

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
              <BodyCell align="left">
                <IconButton
                  onClick={onActionToItem(DataAction.UPDATE, item)}
                  tooltip="Edit"
                  variant="contained"
                  size="small"
                >
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

      {action === DataAction.UPDATE && (
        <Form
          open
          onClose={onResetAction}
          type={DataAction.UPDATE}
          initialValues={initValues as unknown as ProjectDataForm}
          onSubmit={onUpdateProject}
        />
      )}
    </>
  );
};

export default memo(ItemList);

const DESKTOP_HEADER_LIST = [
  { value: "#", width: "5%", align: "center" },
  {
    value: "Name",
    width: "30%",
    align: "left",
  },
  {
    value: "Assigner",
    width: "30%",
    align: "left",
  },
  { value: "Status", width: "20%" },
  { value: "", width: "5%" },
];

const MOBILE_HEADER_LIST = [{ value: "#", width: "75%", align: "left" }];
