import react, { useEffect, useState } from "react";
import { Props } from ".";
import { useRouter } from "next/router";
import { ProjectGet } from "../../../../utils/model";
import { apiProjectPut } from "../../../../utils/apis";
import { SnackStatusAtom } from "../../../atoms/SnackAtom/SnackStatusAtom";
import { useModalContextMolecule } from "../../../molecules/ModalContextMolecule";
import { UpdateStatusProjectComponent } from "./UpdateStatusProjectComponent";

export const useProject = (props: Props) => {
  const { filterState, setFilterState, pageSizeOptions } = props;

  const router = useRouter();
  const { openModal, closeModal } = useModalContextMolecule();

  const reloadProjectList = async () => {
    props.getListProject(
      filterState.page - 1,
      filterState.pageSize,
      filterState.update_date ? "updated_time=-1" : undefined,
      {
        name: filterState.name ? filterState.name : "",
        saved: filterState.saved ? true : undefined,
        status: filterState.status,
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

  const onStatusSnackClick = (status: string, projectId: string) => {
    openModal(
      <UpdateStatusProjectComponent
        currentStatus={status}
        closeModal={() => {
          closeModal();
          reloadProjectList();
        }}
        projectId={projectId}
      />,
      450
    );
  };

  const getStatusSnack = (status: string, projectId: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <SnackStatusAtom
            label="Hoạt động"
            color="green"
            onClick={() => {
              onStatusSnackClick("ACTIVE", projectId);
            }}
          />
        );
      case "PAUSE":
        return (
          <SnackStatusAtom
            label="Tạm dừng"
            color="yellow"
            onClick={() => {
              onStatusSnackClick("PAUSE", projectId);
            }}
          />
        );
      case "CLOSE":
        return (
          <SnackStatusAtom
            label="Kết thúc"
            color="pink"
            onClick={() => {
              onStatusSnackClick("CLOSE", projectId);
            }}
          />
        );
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
