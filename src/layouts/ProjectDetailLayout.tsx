"use client";

import { Endpoint } from "api";
import { TabList } from "components/sn-project-detail/components";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { PROJECTS_PATH } from "constant/paths";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useHeaderConfig } from "store/app/selectors";
import { useProject, useProjects } from "store/project/selectors";
import { cleanObject, getPath } from "utils/index";

type ProjectDetailLayoutProps = {
  children: React.ReactNode;
  id: string;
};

const ProjectDetailLayout = ({ children, id }: ProjectDetailLayoutProps) => {
  const { onGetProject, item } = useProject();
  const { filters, pageIndex, pageSize } = useProjects();
  const { onUpdateHeaderConfig } = useHeaderConfig();
  const commonT = useTranslations(NS_COMMON);
  const projectT = useTranslations(NS_PROJECT);

  const dataStringifyRef = useRef<string | undefined>();

  useEffect(() => {
    if (!id) return;
    onGetProject(id);
  }, [id, onGetProject]);

  useEffect(() => {
    dataStringifyRef.current = JSON.stringify({
      ...filters,
      pageIndex,
      pageSize,
    });
  }, [filters, pageIndex, pageSize]);

  useEffect(() => {
    const parsedQueries = dataStringifyRef.current
      ? JSON.parse(dataStringifyRef.current)
      : {};

    const prevPath = getPath(PROJECTS_PATH, parsedQueries);

    onUpdateHeaderConfig({
      title: item?.name,
      searchPlaceholder: commonT("searchBy", { name: projectT("list.key") }),
      prevPath,
      endpoint: Endpoint.PROJECTS,
      key: "name",
    });
    return () => {
      onUpdateHeaderConfig({
        title: undefined,
        searchPlaceholder: undefined,
        prevPath: undefined,
        endpoint: undefined,
        key: undefined,
      });
    };
  }, [commonT, item?.name, onUpdateHeaderConfig, projectT]);

  return (
    <>
      <TabList />
      {children}
    </>
  );
};

export default ProjectDetailLayout;
