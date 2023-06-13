import {
  Box,
  CircularProgress,
  Stack,
  StackProps,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
} from "@mui/material";
import { AN_ERROR_TRY_RELOAD_PAGE } from "constant";
import { createRef, forwardRef, memo, useMemo } from "react";
import CellBody from "./BodyCell";
import CellHeader, { HEIGHT_HEADER } from "./HeaderCell";

export type CellProps = TableCellProps & {
  value: string | React.ReactNode;
  width?: string | number;
  minWidth?: number;
};

type TableLayoutProps = {
  numberOfRows?: number;
  headerList: CellProps[];
  children: React.ReactNode;
  pending?: boolean;
  error?: string;
  noData?: boolean;
  onCreate?: () => void;
  onEdit?: () => void;
  headerProps?: TableCellProps;
  accessKey?: string;
} & StackProps;

const TableLayout = forwardRef((props: TableLayoutProps, ref) => {
  const {
    numberOfRows = 10,
    headerList,
    children,
    pending,
    error,
    noData,
    onCreate,
    onEdit,
    headerProps = {},
    accessKey,
    ...rest
  } = props;

  const { sx: sxHeaderProps, ...restHeaderProps } = headerProps;

  const refs = useMemo(
    () => headerList?.map(() => createRef<HTMLTableCellElement>()),
    [headerList],
  );

  const nOfColumnsNotWidthFixed = useMemo(
    () =>
      headerList.reduce((out: number, item) => (out += !item.width ? 1 : 0), 0),
    [headerList],
  );

  const hasAdditionalRow = useMemo(
    () => Boolean(error || pending || noData),
    [error, noData, pending],
  );

  return (
    <Stack
      flex={1}
      // maxHeight={HEIGHT_ROW * numberOfRows + HEIGHT_HEADER}
      overflow="hidden"
      {...rest}
    >
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          minHeight: HEIGHT_HEADER,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headerList.map(({ sx: sxItem, ...item }, index) => (
                <CellHeader
                  key={typeof item.value === "string" ? item.value : index}
                  {...item}
                  width={item.width ?? `${100 / nOfColumnsNotWidthFixed}%`}
                  sx={
                    {
                      minWidth: item?.minWidth,
                      maxWidth:
                        item.width ?? `${100 / nOfColumnsNotWidthFixed}%`,
                      ...sxItem,
                      ...sxHeaderProps,
                    } as CellProps["sx"]
                  }
                  {...restHeaderProps}
                  ref={refs[index]}
                >
                  {item.value}
                </CellHeader>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Box>

      <Box
        // maxHeight={HEIGHT_ROW * numberOfRows}
        sx={{
          overflow: "auto",
        }}
        ref={ref}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headerList?.map((item, index) => (
                <TableCell
                  key={typeof item.value === "string" ? item.value : index}
                  width={item.width ?? refs[index]?.current?.offsetWidth}
                  height={0}
                  sx={{ p: 0, maxHeight: 0, border: "none" }}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {hasAdditionalRow ? (
              <TableRow>
                <CellBody colSpan={headerList.length} align="center">
                  {pending ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "common.white" }}
                    />
                  ) : Boolean(error) ? (
                    error ?? AN_ERROR_TRY_RELOAD_PAGE
                  ) : noData ? (
                    "No data."
                  ) : null}
                </CellBody>
              </TableRow>
            ) : (
              children
            )}
          </TableBody>
        </Table>
      </Box>
    </Stack>
  );
});

export default memo(TableLayout);

TableLayout.displayName = "TableLayout";
