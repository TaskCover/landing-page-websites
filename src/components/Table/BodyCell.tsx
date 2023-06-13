import { memo } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "components/shared";

export type BodyCellProps = {
  children?: string | React.ReactNode;
  textProps?: TextProps;
  fallback?: string | React.ReactNode;
} & TableCellProps;

const BodyCell = (props: BodyCellProps) => {
  const { children, textProps = {}, sx, fallback = "--", ...rest } = props;

  return (
    <TableCell
      sx={{
        py: 0,
        height: HEIGHT_ROW,
        borderColor: "grey.100",
        fontSize: 14,
        ...sx,
      }}
      {...rest}
    >
      <Text variant="body2" color="grey.400" {...textProps}>
        {children}
      </Text>
    </TableCell>
  );
};

export default memo(BodyCell);

export const HEIGHT_ROW = 48;
