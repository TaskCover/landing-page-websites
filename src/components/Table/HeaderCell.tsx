import { ForwardedRef, forwardRef, memo } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "components/shared";

export type HeaderCellProps = {
  children: string | React.ReactNode;
  textProps?: TextProps;
} & TableCellProps;

const HeaderCell = forwardRef(
  (props: HeaderCellProps, ref: ForwardedRef<HTMLTableCellElement>) => {
    const { children, textProps = {}, sx, ...rest } = props;

    return (
      <TableCell
        sx={{
          backgroundColor: "grey.50",
          borderBottom: "none",
          py: 0,
          ...sx,
        }}
        height={HEIGHT_HEADER}
        ref={ref}
        align="center"
        {...rest}
      >
        {typeof children === "string" ? (
          <Text
            color="grey.400"
            variant="body2"
            fontWeight={600}
            whiteSpace="nowrap"
            {...textProps}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </TableCell>
    );
  },
);

export default memo(HeaderCell);

HeaderCell.displayName = "HeaderCell";

export const HEIGHT_HEADER = 48;
