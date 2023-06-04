import { FunctionComponent, useEffect } from "react";
import { ModalHeaderAtom } from "../../../atoms/ModalAtom/ModalHeaderAtom";
import { ModalBodyAtom } from "../../../atoms/ModalAtom/ModalBodyAtom";
import { InputAtom } from "../../../atoms/InputAtom";
import styles from "./styles.module.css";
import { InputSelectMuiAtom } from "../../../atoms/InputAtom/InputSelectMuiAtom";
import { useCreateProject } from "./useCreateProject";
import { Grid } from "@mui/material";

export type Props = {
  handleClose: () => void;
};

export const CreateProjectTemplate = (props: Props) => {
  const [value, handle] = useCreateProject();

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
        </Grid>
      </ModalBodyAtom>
    </>
  );
};
