import { Modal, Stack } from "@mui/material";
import React from "react";

interface IProps {
  open: boolean;
  onClose(): void;
  children: React.ReactNode;
}

const BaseModal = ({ open, onClose, children }: IProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        bgcolor="common.white"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Stack>
    </Modal>
  );
};

export default BaseModal;
