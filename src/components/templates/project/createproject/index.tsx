import { FunctionComponent, useEffect } from "react";
import { ModalHeaderAtom } from "../../../atoms/ModalAtom/ModalHeaderAtom";
import { ModalBodyAtom } from "../../../atoms/ModalAtom/ModalBodyAtom";
import { InputAtom } from "../../../atoms/InputAtom";
import styles from "./styles.module.css";

export type Props = {
  handleClose: () => void;
};

export const CreateProjectTemplate = (props: Props) => {
  return (
    <>
      <ModalHeaderAtom label="Thêm mới dự án" handleClose={props.handleClose} />
      <ModalBodyAtom>
        <InputAtom label="Tên dự án" className={styles["input"]} />
      </ModalBodyAtom>
    </>
  );
};
