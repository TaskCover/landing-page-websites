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
};

export const ModalAtom: FunctionComponent<Props> = (props) => {
  const { width, children } = props;

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: width ? width : 400 }}>{children}</Box>
      </Modal>
    </div>
  );
};
