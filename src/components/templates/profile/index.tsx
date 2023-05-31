import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { ManageLayoutAtom } from "../../atoms/LayoutAtom/ManageLayoutAtom";

export const ProfileTemplate: FunctionComponent = () => {
  return (
    <ManageLayoutAtom
      appbarContent={<div style={{ color: "black" }}>{"Custom appbar"}</div>}
    >
      <div>{"content"}</div>
    </ManageLayoutAtom>
  );
};
