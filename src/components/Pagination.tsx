import { ChangeEvent, memo } from "react";
import {
  Pagination as MuiPagination,
  PaginationProps as MuiPaginationProps,
  Stack,
  StackProps,
  paginationItemClasses,
} from "@mui/material";
import { Select, Text } from "./shared";

type PaginationProps = Omit<MuiPaginationProps, "count"> & {
  totalPages?: number;
  totalItems?: number;
  pageSize: number;
  onChangePage: (newPage: number) => void;
  onChangeSize: (newSize: number, keepPageIndex?: boolean) => void;
  containerProps?: StackProps;
};

const Pagination = (props: PaginationProps) => {
  const {
    totalPages,
    totalItems,
    pageSize,
    onChangePage,
    onChangeSize,
    containerProps,
    sx,
    ...rest
  } = props;

  const onChange = (_, newPage: number) => {
    onChangePage(newPage);
  };

  const onChangePageSize = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeSize(event.target.value as unknown as number);
  };

  if (!totalPages || !totalItems) return null;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      {...containerProps}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Text variant="body2" fontWeight={600}>
          Hiển thị
        </Text>
        <Select
          rootSx={{ borderColor: "#DDDDDD", borderRadius: 2, height: 40 }}
          options={OPTIONS}
          onChange={onChangePageSize}
          value={pageSize}
          size="small"
        />
        <Text
          variant="body2"
          fontWeight={600}
        >{`trên tổng ${totalItems}`}</Text>
      </Stack>

      <MuiPagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={onChange}
        sx={{
          [`& .${paginationItemClasses.root}`]: {
            fontWeight: 600,
          },
          [`& .${paginationItemClasses.selected}`]: {
            backgroundColor: ({ palette }) =>
              `${palette.primary.main}!important`,
            borderColor: "primary.main",
            color: "common.white",
          },
          ...sx,
        }}
        {...rest}
      />
    </Stack>
  );
};

export default memo(Pagination);

export const OPTIONS = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
];
