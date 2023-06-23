import {
  Box,
  BoxProps,
  CircularProgress,
  Stack,
  StackProps,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
} from "@mui/material";
import { AN_ERROR_TRY_RELOAD_PAGE, NS_COMMON } from "constant";
import {
  createRef,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CellBody, { HEIGHT_ROW } from "./BodyCell";
import CellHeader, { HEIGHT_HEADER } from "./HeaderCell";
import useWindowSize from "hooks/useWindowSize";
import { useSidebar } from "store/app/selectors";
import { useTranslations } from "next-intl";

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
  containerHeaderProps?: BoxProps;
  accessKey?: string;
  onLayout?: (refs) => void;
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
    containerHeaderProps = {},
    onLayout,
    ...rest
  } = props;
  const commonT = useTranslations(NS_COMMON);

  const { sx: sxHeaderProps, ...restHeaderProps } = headerProps;
  const { sx: sxContainerHeaderProps, ...restContainerHeaderProps } =
    containerHeaderProps;

  const [bodySx, setBodySx] = useState<SxProps>({});
  const size = useWindowSize();
  const { isExpandedSidebar } = useSidebar();

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

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const newBodySx = refs?.reduce((out, item, index) => {
        out[`& td:nth-of-type(${index + 1}), & th:nth-of-type(${index + 1})`] =
          {
            minWidth: item?.current?.offsetWidth,
            width: item?.current?.offsetWidth,
            maxWidth: item?.current?.offsetWidth,
            overflowX: "hidden",
          };
        return out;
      }, {});
      setBodySx(newBodySx);
    }, 250);
  }, [headerList, refs, children, size, isExpandedSidebar]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      onLayout && onLayout(refs.map((ref) => ref.current?.offsetWidth));
    }, 250);
  }, [onLayout, headerList, refs, size, isExpandedSidebar]);

  return (
    <Stack
      flex={1}
      maxHeight={HEIGHT_ROW * (numberOfRows + 1) + HEIGHT_HEADER + 10}
      overflow="hidden"
      {...rest}
    >
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          minHeight: HEIGHT_HEADER,
          ...sxContainerHeaderProps,
        }}
        {...restContainerHeaderProps}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headerList.map(({ sx: sxItem, ...item }, index) => (
                <CellHeader
                  key={index}
                  {...item}
                  width={item.width ?? `${100 / nOfColumnsNotWidthFixed}%`}
                  sx={
                    {
                      maxWidth:
                        item.width ?? `${100 / nOfColumnsNotWidthFixed}%`,
                      minWidth: item?.minWidth,
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
        maxHeight={HEIGHT_ROW * numberOfRows}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
        ref={ref}
      >
        <Table>
          <TableBody sx={bodySx}>
            {hasAdditionalRow ? (
              <TableRow>
                <CellBody colSpan={headerList.length} align="center">
                  {pending ? (
                    <CircularProgress size={20} color="primary" />
                  ) : Boolean(error) ? (
                    error ?? AN_ERROR_TRY_RELOAD_PAGE
                  ) : noData ? (
                    commonT("noData")
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
