import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton, styled } from "@mui/material";
import styles from "./styles.module.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { SimpleSelectAtom } from "../../../atoms/SelectAtom/SimpleSelectAtom";
import { ProjectGet } from "../../../../utils/model";
import { useProject } from "./useProject";
import { TableHeadAtom } from "../../../atoms/TableAtom/TableHeadAtom";
import { PaginationAtom } from "../../../atoms/PaginationAtom";
import { SnackStatusAtom } from "../../../atoms/SnackAtom/SnackStatusAtom";
import { Props as ProjectFilterProps } from "../";

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  border: "none",
}));
const TableCellBody = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0,
    paddingTop: "10px",
    paddingBottom: "10px",
  },
}));

export type Props = {
  projectList?: ProjectGet["responseBody"];
  getListProject: (
    page?: number,
    size?: number,
    sort?: string,
    others?: { name?: string; status?: string; saved?: boolean }
  ) => void;
  openEditModal: (projectUpdate: ProjectGet["responseBody"]["data"][0]) => void;
  filterState: Required<ProjectFilterProps>;
  setFilterState: (filterState: Required<ProjectFilterProps>) => void;
  pageSizeOptions: {
    label: string;
    value: string;
  }[];
};

export const ListProjectComponent: FunctionComponent<Props> = (props) => {
  const [value, handle] = useProject(props);

  return (
    <div className={styles["listproject__container"]}>
      <Table>
        <TableHeadAtom>
          <TableRow>
            <TableCellHeader align="center">
              <h6>STT</h6>
            </TableCellHeader>
            <TableCellHeader>
              <h6>Tên dự án</h6>
            </TableCellHeader>
            <TableCellHeader>
              <h6>Người phụ trách</h6>
            </TableCellHeader>
            <TableCellHeader>
              <h6>Trạng thái</h6>
            </TableCellHeader>
            <TableCellHeader></TableCellHeader>
            <TableCellHeader></TableCellHeader>
          </TableRow>
        </TableHeadAtom>
        <TableBody>
          {props.projectList &&
            props.projectList.data &&
            props.projectList.data.length > 0 &&
            props.projectList.data.map((item, index) => (
              <TableRow
                hover
                className={styles["listproject__tablerow"]}
                key={index}
                onClick={() => handle.openDetail(item.id)}
              >
                <TableCellBody align="center">
                  <h6>
                    {(value.filterState.page - 1) * value.filterState.pageSize +
                      index +
                      1}
                  </h6>
                </TableCellBody>
                <TableCellBody>
                  <h6>{item.name}</h6>
                </TableCellBody>
                <TableCellBody>{item.owner.fullname}</TableCellBody>
                <TableCellBody>
                  <SnackStatusAtom
                    status={item.is_active ? "active" : "finish"}
                  />
                </TableCellBody>
                <TableCellBody>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handle.handleSaveProject(item.id, item.saved);
                    }}
                  >
                    {item.saved ? (
                      <BookmarkIcon
                        sx={{ width: "20px", height: "20px" }}
                        color="primary"
                      />
                    ) : (
                      <BookmarkBorderIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    )}
                  </IconButton>
                </TableCellBody>
                <TableCellBody>
                  <img
                    src="/images/icon_edit.png"
                    onClick={(e) => {
                      e.stopPropagation();
                      handle.openEdit(item);
                    }}
                  />
                </TableCellBody>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {props.projectList && (
        <div className={styles["listproject__pagination"]}>
          <div className={styles["listproject__pagination__count"]}>
            Hiển thị{" "}
            <SimpleSelectAtom
              items={value.pageSizeOptions}
              defaultValue={String(value.filterState.pageSize)}
              onItemChange={handle.onPageSizeChange}
            />
            &nbsp;trên tổng {props.projectList.total}
          </div>
          <PaginationAtom
            currentPage={value.filterState.page}
            totalPage={props.projectList.total_page}
            onPageChange={handle.onPageChange}
          />
        </div>
      )}
    </div>
  );
};
