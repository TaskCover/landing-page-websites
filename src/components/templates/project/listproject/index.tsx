import { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, TableFooter, styled } from "@mui/material";
import styles from "./styles.module.css";
import { TagComponent } from "./tag";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useRouter } from "next/router";

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  border: "none",
}));
const TableCellBody = styled(TableCell)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const tableData = [
  {
    id: "1",
    name: "Chiến dịch marketing",
    pic: "Nguyễn Ngọc Khánh",
    status: "active",
  },
  {
    id: "1",
    name: "Chiến dịch marketing",
    pic: "Nguyễn Ngọc Khánh",
    status: "pending",
  },
  {
    id: "1",
    name: "Chiến dịch marketing",
    pic: "Nguyễn Ngọc Khánh",
    status: "finish",
  },
  {
    id: "1",
    name: "Chiến dịch marketing",
    pic: "Nguyễn Ngọc Khánh",
    status: "finish",
  },
];

export const ListProjectComponent: FunctionComponent = () => {
  const router = useRouter();

  const openDetail = (id: string) => {
    router.push(`/project/${id}`);
  };

  const openEdit = (id: string) => {
    console.log("edit");
  };

  return (
    <div className={styles["listproject__container"]}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead sx={{ bgcolor: "#F7F7FD" }}>
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
        </TableHead>
        <TableBody>
          {tableData &&
            tableData.length > 0 &&
            tableData.map((item, index) => (
              <TableRow
                hover
                className={styles["listproject__tablerow"]}
                key={index}
                onClick={() => openDetail(item.id)}
              >
                <TableCellBody align="center">
                  <h6>{index + 1}</h6>
                </TableCellBody>
                <TableCellBody>
                  <h6>{item.name}</h6>
                </TableCellBody>
                <TableCellBody>{item.pic}</TableCellBody>
                <TableCellBody>
                  <TagComponent status={item.status} />
                </TableCellBody>
                <TableCellBody>
                  <BookmarkBorderIcon sx={{ width: "20px", height: "20px" }} />
                </TableCellBody>
                <TableCellBody>
                  <img
                    src="/images/icon_edit.png"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(item.id);
                    }}
                  />
                </TableCellBody>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={styles["listproject__pagination"]}>
        <div>Hiển thị</div>
        <div>Hiển thị</div>
      </div>
    </div>
  );
};
