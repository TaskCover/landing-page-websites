import react, { useEffect, useState } from "react";
import { Props } from ".";
import { useRouter } from "next/router";
import { ProjectGet } from "../../../../utils/model";

export const useProject = (props: Props) => {
  const pageSize = [
    {
      label: "5",
      value: "5",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "20",
      value: "20",
    },
    {
      label: "50",
      value: "50",
    },
    {
      label: "100",
      value: "100",
    },
  ];

  const router = useRouter();

  const [state, setState] = useState<{
    currentPage: number;
    sizePage: number;
  }>({ currentPage: 1, sizePage: 10 });

  useEffect(() => {
    props.getListProject(state.currentPage - 1, state.sizePage);
  }, [state]);

  const openDetail = (id: string) => {
    router.push(`/project/${id}`);
  };

  const openEdit = (projectUpdate: ProjectGet["responseBody"]["data"][0]) => {
    props.openEditModal(projectUpdate);
  };

  const onPageSizeChange = (value: string) => {
    setState({ ...state, sizePage: Number(value) });
  };

  const onPageChange = (page: number) => {
    setState({ ...state, currentPage: page });
  };

  return [
    { pageSize, state },
    { setState, openDetail, openEdit, onPageSizeChange, onPageChange },
  ] as const;
};
