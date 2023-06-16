import { memo } from "react";
import { TableCell, TableCellProps } from "@mui/material";
import { Text, TextProps } from "components/shared";
import Link from "components/Link";

export type BodyCellProps = {
  children?: string | React.ReactNode;
  textProps?: TextProps;
  fallback?: string | React.ReactNode;
  noWrap?: boolean;
  tooltip?: string;
  href?: string;
} & TableCellProps;

const BodyCell = (props: BodyCellProps) => {
  const {
    children,
    textProps = {},
    sx,
    fallback = "--",
    noWrap,
    tooltip,
    href,
    ...rest
  } = props;

  const renderContent = () => {
    return (
      <>
        {!children || typeof children === "string" ? (
          <Text
            variant="body2"
            color={href ? "inherit" : "grey.400"}
            noWrap={noWrap}
            tooltip={
              (noWrap && children) || tooltip
                ? ((tooltip ?? children) as string)
                : undefined
            }
            {...textProps}
          >
            {children ?? fallback}
          </Text>
        ) : (
          children
        )}
      </>
    );
  };

  return (
    <TableCell
      sx={{
        py: 0,
        height: HEIGHT_ROW,
        borderColor: "grey.100",
        fontSize: 14,
        ...sx,
      }}
      align="center"
      {...rest}
    >
      {href ? (
        <Link
          href={href}
          sx={{
            color: "grey.400",
            "&:hover": {
              color: "primary.main",
            },
          }}
          underline="none"
        >
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </TableCell>
  );
};

export default memo(BodyCell);

export const HEIGHT_ROW = 48;
