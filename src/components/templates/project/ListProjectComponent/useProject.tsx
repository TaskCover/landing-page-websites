import react, { useEffect, useState } from "react";
import { Props } from ".";
import { useRouter } from "next/router";
import { ProjectGet } from "../../../../utils/model";
import { apiProjectPut } from "../../../../utils/apis";
import { SnackStatusAtom } from "../../../atoms/SnackAtom/SnackStatusAtom";
import { useModalContextMolecule } from "../../../molecules/ModalContextMolecule";

export const useProject = (props: Props) => {
  const { filterState, setFilterState, pageSizeOptions } = props;

  const router = useRouter();
  const { openModal, closeModal } = useModalContextMolecule();

  useEffect(() => {
    props.getListProject();
  }, [filterState]);

  const openDetail = (id: string) => {
    router.push(`/project/${id}`);
  };

  const openEdit = (projectUpdate: ProjectGet["responseBody"]["data"][0]) => {
    props.openEditModal(projectUpdate);
  };

  const handleSaveProject = async (id: string, isSaved: boolean) => {
    await apiProjectPut(id, { saved: !isSaved });
    await props.getListProject();
  };

  const onPageSizeChange = (value: string) => {
    setFilterState({ ...filterState, pageSize: Number(value) });
  };

  const onPageChange = (page: number) => {
    setFilterState({ ...filterState, page: page });
  };

  const getStatusSnack = (status: string, projectId: string) => {
    switch (status) {
      case "ACTIVE":
        return <SnackStatusAtom label="Hoạt động" color="green" />;
      case "PAUSE":
        return <SnackStatusAtom label="Tạm dừng" color="yellow" />;
      case "CLOSE":
        return <SnackStatusAtom label="Kết thúc" color="pink" />;
      default:
        return <></>;
    }
  };

  return [
    { pageSizeOptions, filterState },
    {
      openDetail,
      openEdit,
      onPageSizeChange,
      onPageChange,
      handleSaveProject,
      getStatusSnack,
    },
  ] as const;
};
