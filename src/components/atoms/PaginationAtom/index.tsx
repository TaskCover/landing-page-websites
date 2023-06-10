import { Pagination, PaginationItem, Stack } from "@mui/material";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useEffect } from "react";

export type Props = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationAtom = (props: Props) => {
  const { currentPage, totalPage, onPageChange } = props;
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.totalPage}
        variant="outlined"
        color="primary"
        siblingCount={1}
        onChange={(_, page) => {
          onPageChange(page);
        }}
        shape="rounded"
        showFirstButton={true}
        showLastButton={true}
        page={currentPage}
        renderItem={(item) => {
          if (
            item.page &&
            (item.page - currentPage > 2 || currentPage - item.page > 2) &&
            item.page !== totalPage &&
            item.page !== 1
          ) {
            return null;
          }
          return (
            <PaginationItem
              {...item}
              className={clsx(styles["pagination"], {
                [styles["pagination-selected"]]: item.selected,
              })}
            />
          );
        }}
      />
    </Stack>
  );
};
