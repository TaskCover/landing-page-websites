import react, { useEffect, useState } from "react";
import { Props } from ".";
import { useRouter } from "next/router";
import { ProjectGet } from "../../../../utils/model";
import { apiProjectPut } from "../../../../utils/apis";

export const useProject = (props: Props) => {
  const { filterState, setFilterState, pageSizeOptions } = props;

  const router = useRouter();

  const reloadProjectList = async () => {
    props.getListProject(
      filterState.page - 1,
      filterState.pageSize,
      filterState.update_date ? "updated_time=-1" : undefined,
      {
        name: filterState.name ? filterState.name : "",
        saved: filterState.saved ? true : undefined,
      }
    );
  };

  useEffect(() => {
    reloadProjectList();
  }, [filterState]);

  const openDetail = (id: string) => {
    router.push(`/project/${id}`);
  };

  const openEdit = (projectUpdate: ProjectGet["responseBody"]["data"][0]) => {
    props.openEditModal(projectUpdate);
  };

  const handleSaveProject = async (id: string, isSaved: boolean) => {
    await apiProjectPut(id, { saved: !isSaved });
    await reloadProjectList();
  };

  const onPageSizeChange = (value: string) => {
    setFilterState({ ...filterState, pageSize: Number(value) });
  };

  const onPageChange = (page: number) => {
    setFilterState({ ...filterState, page: page });
  };

  return [
    { pageSizeOptions, filterState },
    { openDetail, openEdit, onPageSizeChange, onPageChange, handleSaveProject },
  ] as const;
};
