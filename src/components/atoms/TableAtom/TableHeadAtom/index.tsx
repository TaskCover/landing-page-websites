import { TableHead } from "@mui/material";
import { ReactNode } from "react";

export type Props = { children: ReactNode };

export const TableHeadAtom = (props: Props) => {
  return <TableHead sx={{ bgcolor: "#F7F7FD" }}>{props.children}</TableHead>;
};
