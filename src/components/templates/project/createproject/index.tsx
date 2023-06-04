import { FunctionComponent, useEffect } from "react";
import { ModalHeaderAtom } from "../../../atoms/ModalAtom/ModalHeaderAtom";
import { ModalBodyAtom } from "../../../atoms/ModalAtom/ModalBodyAtom";
import { InputAtom } from "../../../atoms/InputAtom";
import styles from "./styles.module.css";
import { InputSelectMuiAtom } from "../../../atoms/InputAtom/InputSelectMuiAtom";
import { useCreateProject } from "./useCreateProject";
import { Grid } from "@mui/material";
import { useModalLv2ContextMolecule } from "../../../molecules/ModalContextMolecule";

export type Props = {
  handleClose: () => void;
};

export const CreateProjectTemplate = (props: Props) => {
  const [value, handle] = useCreateProject();
  const { openModalLv2 } = useModalLv2ContextMolecule();

  return (
    <>
      <ModalHeaderAtom label="Thêm mới dự án" handleClose={props.handleClose} />
      <ModalBodyAtom>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputAtom label="Tên dự án" className={styles["input"]} />
          </Grid>
          <Grid item xs={6}>
            <InputSelectMuiAtom
              label="Người phụ trách"
              options={value.picOptions}
              className={styles["input"]}
            />
          </Grid>
          <Grid item xs={6}>
            <InputSelectMuiAtom
              className={styles["input"]}
              label="Loại dự án"
              options={value.projectTypes}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelectMuiAtom
              className={styles["input"]}
              label="Danh sách thành viên"
              options={value.picOptions}
              multiple={true}
              openDialog={() => {
                openModalLv2(<h2>lkasjdlkasdjklas</h2>);
              }}
            />
          </Grid>
        </Grid>
      </ModalBodyAtom>
    </>
  );
};
