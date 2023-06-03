import React, { FunctionComponent, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export type Props = {
  width?: number;
  children: ReactNode;
  handleClose: () => void;
  open: boolean;
  zIndex?: number;
};

export const ModalAtom: FunctionComponent<Props> = (props) => {
  const { width, children, zIndex } = props;

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        sx={{
          "& .MuiBox-root": {
            boxShadow: "0px 4px 20px rgba(33, 33, 33, 0.04)",
            borderRadius: "8px",
            border: "none",
          },
          zIndex: zIndex ? zIndex : 1300,
        }}
      >
        <Box sx={{ ...style, width: width ? width : 400 }}>{children}</Box>
      </Modal>
    </div>
  );
};
