import { FunctionComponent } from "react";
import { ButtonIconMuiAtom } from "../../atoms/ButtonAtom/ButtonIconMuiAtom";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider } from "@mui/material";
import styles from "./styles.module.css";
import { SwitchAtom } from "../../atoms/SwitchAtom";
import { MenuAtom } from "../../atoms/MenuAtom";
import { ListProjectComponent } from "./listproject/";

export const ProjectTemplate: FunctionComponent = () => {
  return (
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
      <ListProjectComponent />
    </div>
  );
};
