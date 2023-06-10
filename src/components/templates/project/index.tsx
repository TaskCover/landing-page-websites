import { FunctionComponent, useEffect, useState } from "react";
import { ButtonIconMuiAtom } from "../../atoms/ButtonAtom/ButtonIconMuiAtom";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { SwitchAtom } from "../../atoms/SwitchAtom";
import { MenuAtom } from "../../atoms/MenuAtom";
import { ListProjectComponent } from "./ListProjectComponent";
import { ManageLayoutAtom } from "../../atoms/LayoutAtom/ManageLayoutAtom";
import { apiProjectGet } from "../../../utils/apis";
import { ProjectGet } from "../../../utils/model";
import { showErrorNotify } from "../../molecules/NotificationMolecule";
import { InputSearchAtom } from "../../atoms/InputAtom/InputSearchAtom";
import {
  useModalContextMolecule,
  useModalLv2ContextMolecule,
} from "../../molecules/ModalContextMolecule";
import { CreateProjectTemplate } from "./createproject";
import { useProject } from "./useProject";

export type Props = {
  page?: number;
  pageSize?: number;
  name?: string;
  status?: string;
  update_date?: boolean;
  saved?: boolean;
};

export const ProjectTemplate: FunctionComponent<Props> = (props) => {
  const [values, handlers] = useProject(props);
  const [projectList, setProjectList] = useState<ProjectGet["responseBody"]>();
  const { openModal, closeModal } = useModalContextMolecule();

  const getListProject = async (
    page?: number,
    size?: number,
    sort?: string,
    others?: { name?: string; status?: string; saved?: boolean }
  ) => {
    try {
      const querySearch = `like(name,"${others?.name}")`;
      const querySaved = others?.saved ? `,eq(saved,true)` : "";
      const query = "and(" + querySearch + querySaved + ")";
      const data = await apiProjectGet({
        page: page,
        size: size,
        sort: sort,
        query: query,
      });
      setProjectList(data);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  const submitSearch = (value: string) => {
    handlers.setFilterState({ ...values.filterState, name: value });
  };

  const submitFilterUpdateRecentProject = (value: boolean) => {
    handlers.setFilterState({
      ...values.filterState,
      update_date: value,
    });
  };

  const submitFilterSavedProject = (value: boolean) => {
    handlers.setFilterState({
      ...values.filterState,
      saved: value,
    });
  };

  return (
    <ManageLayoutAtom
      appbarContentLeft={<h5>{"Quản lý dự án"}</h5>}
      appbarContentRight={
        <InputSearchAtom
          placeholder="Tìm kiếm dự án"
          onSubmitInput={submitSearch}
          className={styles["project__container__appbar__search"]}
        />
      }
    >
      <div className={styles["project__container"]}>
        <div className={styles["project__container__header"]}>
          <ButtonIconMuiAtom
            label="Thêm mới"
            icon={<AddIcon sx={{ width: "16px", height: "16px" }} />}
            onClick={() => {
              openModal(
                <CreateProjectTemplate
                  handleClose={() => {
                    closeModal();
                    getListProject();
                  }}
                />,
                700
              );
            }}
          />
          <div className={styles["project__container__header__filter"]}>
            <div className={styles["project__container__header__filter__item"]}>
              <h6>{"Dự án gần đây"}</h6>
              <SwitchAtom
                getChecked={submitFilterUpdateRecentProject}
                checked={values.filterState.update_date}
              />
            </div>
            <div className={styles["project__container__header__filter__item"]}>
              <h6>{"Dự án đã lưu"}</h6>
              <SwitchAtom
                getChecked={submitFilterSavedProject}
                checked={values.filterState.saved}
              />
            </div>
            <div className={styles["project__container__header__filter__item"]}>
              <MenuAtom
                label={"Trạng thái"}
                items={[
                  { label: "Hoạt động", value: "ACTIVE" },
                  { label: "Tạm dừng", value: "PAUSE" },
                  { label: "Kết thúc", value: "CLOSE" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className={styles["project__container__header-res"]}>
          <div className={styles["project__container__header__head-res"]}>
            <h3>Quản lý dự án</h3>
            <Button
              variant="contained"
              endIcon={<AddIcon sx={{ width: "16px", height: "16px" }} />}
              sx={{
                textTransform: "none",
                fontSize: "1.4rem",
              }}
              onClick={() => {
                openModal(
                  <CreateProjectTemplate
                    handleClose={() => {
                      closeModal();
                      getListProject(
                        values.filterState.page - 1,
                        values.filterState.pageSize
                      );
                    }}
                  />,
                  700
                );
              }}
            >
              Thêm dự án
            </Button>
          </div>
          <InputSearchAtom
            placeholder="Tìm kiếm dự án"
            onSubmitInput={submitSearch}
            className={styles["project__container__appbar__search"]}
          />
          <div className={styles["project__container__header__filter"]}>
            <div className={styles["project__container__header__filter__item"]}>
              <h6>{"Dự án gần đây"}</h6>
              <SwitchAtom
                getChecked={submitFilterUpdateRecentProject}
                checked={values.filterState.update_date}
              />
            </div>
            <div className={styles["project__container__header__filter__item"]}>
              <h6>{"Dự án đã lưu"}</h6>
              <SwitchAtom
                getChecked={submitFilterSavedProject}
                checked={values.filterState.saved}
              />
            </div>
            <div className={styles["project__container__header__filter__item"]}>
              <MenuAtom
                label={"Trạng thái"}
                items={[
                  { label: "Hoạt động", value: "Hoạt động" },
                  { label: "Tạm dừng", value: "Tạm dừng" },
                  { label: "Kết thúc", value: "Kết thúc" },
                ]}
              />
            </div>
          </div>
        </div>
        <Divider sx={{ mt: 1.5, display: { xs: "none", sm: "block" } }} />
        <ListProjectComponent
          pageSizeOptions={values.pageSizeOptions}
          filterState={values.filterState}
          setFilterState={handlers.setFilterState}
          projectList={projectList}
          getListProject={getListProject}
          openEditModal={(
            projectUpdate: ProjectGet["responseBody"]["data"][0]
          ) => {
            openModal(
              <CreateProjectTemplate
                handleClose={() => {
                  closeModal();
                  getListProject();
                }}
                projectUpdate={projectUpdate}
              />,
              700
            );
          }}
        />
      </div>
    </ManageLayoutAtom>
  );
};
