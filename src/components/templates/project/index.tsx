import { FunctionComponent, useEffect, useState } from "react";
import { ButtonIconMuiAtom } from "../../atoms/ButtonAtom/ButtonIconMuiAtom";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { SwitchAtom } from "../../atoms/SwitchAtom";
import { MenuAtom } from "../../atoms/MenuAtom";
import { ListProjectComponent } from "./listproject/";
import { ManageLayoutAtom } from "../../atoms/LayoutAtom/ManageLayoutAtom";
import { apiProjectGet } from "../../../utils/apis";
import { ProjectGet } from "../../../utils/model";
import { showErrorNotify } from "../../molecules/NotificationMolecule";
import { InputSearchAtom } from "../../atoms/InputAtom/InputSearchAtom";

export const ProjectTemplate: FunctionComponent = () => {
  const [projectList, setProjectList] = useState<ProjectGet["responseBody"]>();
  const getListProject = async (page?: number, size?: number) => {
    try {
      const data = await apiProjectGet({ page: page, size: size });
      setProjectList(data);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
    }
  };

  return (
    <ManageLayoutAtom
      appbarContent={
        <div className={styles["project__appbar"]}>
          <h5>{"Quản lý dự án"}</h5>
          <InputSearchAtom
            placeholder="Tìm kiếm dự án"
            onSubmitInput={(value: string) => {
              console.log(value);
            }}
          />
        </div>
      }
    >
      <div className={styles["project__container"]}>
        <div className={styles["project__container__header"]}>
          <ButtonIconMuiAtom
            label="Thêm mới"
            icon={<AddIcon sx={{ width: "16px", height: "16px" }} />}
          />
          <div className={styles["project__container__header__filter"]}>
            <div className={styles["project__container__header__filter__item"]}>
              <h6>{"Dự án gần đây"}</h6>
              <SwitchAtom />
            </div>
            <div className={styles["project__container__header__filter__item"]}>
              <h6>{"Dự án đã lưu"}</h6>
              <SwitchAtom />
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
        <Divider sx={{ mt: 1.5 }} />
        <ListProjectComponent
          projectList={projectList}
          getListProject={getListProject}
        />
      </div>
    </ManageLayoutAtom>
  );
};
