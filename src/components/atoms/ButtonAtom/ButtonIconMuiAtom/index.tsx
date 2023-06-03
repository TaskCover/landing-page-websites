import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  forwardRef,
} from "react";

import styles from "./styles.module.css";
import { Button, styled } from "@mui/material";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string;
  icon: ReactNode;
  isEndIcon?: boolean;
};

export const ButtonIconMuiAtom = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { className, type, icon, isEndIcon, label, onClick, ...otherProp } =
      props;
    return (
      <Button
        startIcon={isEndIcon ? undefined : icon}
        variant="contained"
        color="primary"
        sx={{ fontSize: "1.4rem", padding: "12px 14px" }}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }
);

ButtonIconMuiAtom.displayName = "ButtonIconMuiAtom";
