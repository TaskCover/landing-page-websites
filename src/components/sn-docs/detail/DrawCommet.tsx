import { Box, Drawer } from "@mui/material";
import React, { memo, useState } from "react";

interface IDrawCommet {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawCommet = ({ open, setOpen }: IDrawCommet) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box>ahihi</Box>
    </Drawer>
  );
};

export default memo(DrawCommet);
