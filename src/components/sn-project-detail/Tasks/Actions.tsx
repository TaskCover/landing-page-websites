"use client";

import { memo, useState, useEffect, useRef, use, useMemo } from "react";
import {
  Stack,
  Theme,
  selectClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import {
  useMemberOptions,
  useProjects,
  useTasksOfProject,
} from "store/project/selectors";
import { getPath } from "utils/index";
import { usePathname, useRouter } from "next-intl/client";
import useToggle from "hooks/useToggle";
import { DataAction } from "constant/enums";
// import Form, { ProjectDataForm } from "./Form";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useTranslations } from "next-intl";
import {
  DATE_FORMAT_HYPHEN,
  NS_COMMON,
  NS_PROJECT,
  STATUS_OPTIONS,
} from "constant/index";
import { AssignerFilter, TASK_STATUS_OPTIONS } from "./components";
import TaskListForm from "./TaskListForm";
import { useParams } from "next/navigation";
import { TaskListData } from "store/project/actions";
import { useHeaderConfig } from "store/app/selectors";
import Link from "components/Link";
import ChevronIcon from "icons/ChevronIcon";
import useBreakpoint from "hooks/useBreakpoint";

const Actions = () => {
  const {
    filters,
    pageSize,
    onCreateTaskList: onCreateTaskListAction,
    onGetTasksOfProject,
  } = useTasksOfProject();
  const { onGetOptions } = useMemberOptions();
  const { title, prevPath } = useHeaderConfig();
  const { isMdSmaller } = useBreakpoint();
  const { breakpoints } = useTheme();
  const is1440Larger = useMediaQuery(breakpoints.up(1440));

  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const pathname = usePathname();
  const { push } = useRouter();
  const [isShow, onShow, onHide] = useToggle();

  const [queries, setQueries] = useState<Params>({});
  const params = useParams();

  const projectId = useMemo(() => params.id, [params.id]) as string;

  const statusOptions = useMemo(
    () =>
      TASK_STATUS_OPTIONS.map((item) => ({
        ...item,
        label: commonT(item.label),
      })),
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

  useEffect(() => {
    if (!projectId) return;
    onGetOptions(projectId, { pageIndex: 1, pageSize: 20 });
  }, [onGetOptions, projectId]);

  return (
    <>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ lg: "center" }}
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.100"
        spacing={{ xs: 1, md: 3 }}
        px={{ xs: 1, md: 2, xl: 3 }}
        py={{ xs: 0.75 }}
        mt={{ sm: 1.25, md: 0 }}
      >
        {/* <Button
          onClick={onShow}
          startIcon={<PlusIcon />}
          size="small"
          variant="primary"
          sx={{ height: "fit-content", width: "fit-content" }}
        >
          {commonT("createNew")}
        </Button> */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 2, sm: 0 }}
          width={{ xs: "100%", sm: "fit-content" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            flex={1}
            width="50%"
          >
            {!!prevPath && (
              <Link
                href={prevPath}
                sx={{ height: isMdSmaller ? 16 : 24, display: { sm: "none" } }}
              >
                <ChevronIcon
                  sx={{
                    color: "text.primary",
                    transform: "rotate(90deg)",
                  }}
                  fontSize={isMdSmaller ? "small" : "medium"}
                />
              </Link>
            )}
            <Text variant={{ xs: "body2", md: "h4" }} display={{ sm: "none" }}>
              {title ?? ""}
            </Text>
          </Stack>

          <Button
            onClick={onShow}
            startIcon={<PlusIcon />}
            size="extraSmall"
            variant="primary"
            sx={{ height: 32, px: ({ spacing }) => `${spacing(2)}!important` }}
          >
            {projectT("detailTasks.createNewTaskList")}
          </Button>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, md: 1.5, xl: 3 }}
          width={{ xs: "100%", md: "fit-content" }}
          justifyContent="flex-end"
          flexWrap="wrap"
          rowGap={2}
        >
          <Search
            placeholder={commonT("searchBy", {
              name: projectT("detailTasks.key"),
            })}
            name="tasks.name"
            onChange={onChangeQueries}
            value={queries?.["tasks.name"]}
            sx={{
              width: { xs: is1440Larger ? 220 : 160 },
              minWidth: { xs: is1440Larger ? 220 : 160 },
            }}
          />
          <AssignerFilter
            onChange={onChangeQueries}
            value={queries?.["tasks.owner"]}
            hasAvatar
            sx={{ display: { xs: "none", md: "initial" } }}
            rootSx={{
              "& >svg": { fontSize: 16 },
              px: "0px!important",
              [`& .${selectClasses.outlined}`]: {
                pr: "0!important",
                mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                  `${spacing(4)}!important`,
                "& .sub": {
                  display: "none",
                },
              },
            }}
          />

          <Date
            label={commonT("form.title.startDate")}
            name="tasks.start_date"
            onChange={onChangeQueries}
            value={queries?.["tasks.start_date"]}
            format={DATE_FORMAT_HYPHEN}
            iconProps={{
              sx: { fontSize: 16 },
            }}
          />
          <Dropdown
            placeholder={commonT("status")}
            options={statusOptions}
            name="tasks.status"
            onChange={onChangeQueries}
            value={queries?.["tasks.status"]}
            rootSx={{
              "& >svg": { fontSize: 16 },
              px: "0px!important",
              [`& .${selectClasses.outlined}`]: {
                pr: "0!important",
                mr: ({ spacing }: { spacing: Theme["spacing"] }) =>
                  `${spacing(4)}!important`,
                "& .sub": {
                  display: "none",
                },
              },
            }}
          />

          <Button
            size="extraSmall"
            sx={{ height: 32 }}
            onClick={onSearch}
            variant="secondary"
          >
            {commonT("search")}
          </Button>
          {/* <Refresh onClick={onRefresh} />
            {!!Object.keys(queries).length && <Clear onClick={onClear} />} */}
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
