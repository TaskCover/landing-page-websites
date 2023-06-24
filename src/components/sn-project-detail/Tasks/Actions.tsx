"use client";

import { memo, useState, useEffect, useRef, use, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import PlusIcon from "icons/PlusIcon";
import {
  Clear,
  Date,
  Dropdown,
  Refresh,
  Search,
  Switch,
} from "components/Filters";
import { useProjects, useTasksOfProject } from "store/project/selectors";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
// import Form, { ProjectDataForm } from "./Form";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT, STATUS_OPTIONS } from "constant/index";
import { AssignerFilter } from "./components";
import TaskListForm from "./TaskListForm";
import { useParams } from "next/navigation";
import { TaskListData } from "store/project/actions";

const Actions = () => {
  const {
    filters,
    pageSize,
    onCreateTaskList: onCreateTaskListAction,
    onGetTasksOfProject,
  } = useTasksOfProject();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const pathname = usePathname();
  const { push } = useRouter();
  const [isShow, onShow, onHide] = useToggle();

  const [queries, setQueries] = useState<Params>({});
  const params = useParams();

  const projectId = useMemo(() => params.id, [params.id]);

  const statusOptions = useMemo(
    () =>
      STATUS_OPTIONS.map((item) => ({ ...item, label: commonT(item.label) })),
    [commonT],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeQueries = (name: string, value: any) => {
    setQueries((prevQueries) => ({
      ...prevQueries,
      [name]: value,
    }));
  };

  const onSearch = () => {
    const path = getPath(pathname, queries);
    push(path);

    onGetTasksOfProject(projectId, { ...queries, pageIndex: 1, pageSize });
  };

  const onClear = () => {
    const newQueries = { pageIndex: 1, pageSize };
    const path = getPath(pathname, newQueries);
    push(path);
    onGetTasksOfProject(projectId, newQueries);
  };

  const onRefresh = () => {
    onGetTasksOfProject(projectId, { ...filters, pageIndex: 1, pageSize });
  };

  const onCreateTaskList = async (values: Omit<TaskListData, "project">) => {
    return await onCreateTaskListAction({
      project: projectId,
      name: values.name,
    });
  };

  useEffect(() => {
    setQueries(filters);
  }, [filters]);

  return (
    <>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ lg: "center" }}
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={{ xs: 1, md: 3 }}
        px={{ xs: 1, md: 3 }}
        pb={3}
      >
        <Button
          onClick={onShow}
          startIcon={<PlusIcon />}
          size="small"
          variant="primary"
          sx={{ height: "fit-content", width: "fit-content" }}
        >
          {commonT("createNew")}
        </Button>

        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems="center"
          spacing={{ xs: 1, md: 3 }}
          px={{ sm: 2 }}
          width={{ xs: "100%", md: "fit-content" }}
          justifyContent="flex-end"
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            alignItems="center"
            spacing={{ xs: 1.5, md: 3 }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={{ xs: 1.5, md: 3 }}
            >
              <Search
                placeholder={commonT("searchBy", {
                  name: projectT("detailTasks.key"),
                })}
                name="name"
                onChange={onChangeQueries}
                value={queries?.email}
                sx={{ width: 220 }}
              />
              <AssignerFilter
                onChange={onChangeQueries}
                value={queries?.assigner}
                hasAvatar
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 1.5, md: 3 }}
            >
              <Date
                label={commonT("form.title.startDate")}
                name="startDate"
                onChange={onChangeQueries}
                value={queries?.startDate}
              />
              <Dropdown
                placeholder={commonT("status")}
                options={statusOptions}
                name="status"
                onChange={onChangeQueries}
                value={queries?.status}
              />
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3}>
            <Button size="small" onClick={onSearch} variant="secondary">
              {commonT("search")}
            </Button>
            <Refresh onClick={onRefresh} />
            {!!Object.keys(queries).length && <Clear onClick={onClear} />}
          </Stack>
        </Stack>
      </Stack>
      {isShow && (
        <TaskListForm
          open={isShow}
          onClose={onHide}
          type={DataAction.CREATE}
          initialValues={INITIAL_VALUES}
          onSubmit={onCreateTaskList}
        />
      )}
    </>
  );
};

export default memo(Actions);

const INITIAL_VALUES = {
  name: "",
} as TaskListData;
