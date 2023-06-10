import react, { useEffect, useState } from "react";
import { Props } from ".";
import { useRouter } from "next/router";
import { ProjectGet } from "../../../../utils/model";

export const useProject = (props: Props) => {
  const { filterState, setFilterState, pageSizeOptions } = props;

  const router = useRouter();

  useEffect(() => {
    props.getListProject(filterState.page - 1, filterState.pageSize);
  }, [filterState]);

  const openDetail = (id: string) => {
    router.push(`/project/${id}`);
  };

  const openEdit = (projectUpdate: ProjectGet["responseBody"]["data"][0]) => {
    props.openEditModal(projectUpdate);
  };

  const onPageSizeChange = (value: string) => {
    setFilterState({ ...filterState, pageSize: Number(value) });
  };

  const onPageChange = (page: number) => {
    setFilterState({ ...filterState, page: page });
  };

  return [
    { pageSizeOptions, filterState },
    { openDetail, openEdit, onPageSizeChange, onPageChange },
  ] as const;
};
