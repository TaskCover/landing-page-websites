import React, { memo } from "react";
import DesktopCells from "./DesktopCells";
import { TableRow } from "@mui/material";
import { Employee } from "store/company/reducer";

interface ItemDocsProps {
  item: Employee;
}

const ItemDocs = ({ item }: ItemDocsProps) => {
  return (
    <div>
      <TableRow>
        <DesktopCells item={item} />
      </TableRow>
    </div>
  );
};

export default memo(ItemDocs);
