import { DialogContent, Modal, Stack } from "@mui/material";
import React, { memo } from "react";
import BaseModal from "./BaseModal";

interface IProps {
  open: boolean;
  onClose(): void;
}

const AddDealModal = ({ open, onClose }: IProps) => {
  //create form

  return (
    <BaseModal open={open} onClose={onClose}>
      <div>Deal Modal</div>
    </BaseModal>
  );
};

export default memo(AddDealModal);
