"use client";
import { Textsms } from "@mui/icons-material";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Text } from "components/shared";
import ArrowExport from "icons/ArrowExport";
import DownloadIcon from "icons/DownloadIcon";
import React, { memo, useEffect } from "react";
import { Billing } from "store/billing/reducer";
import { Service } from "store/sales/reducer";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useParams } from "next/navigation";
import {
  useBillings,
  useBudgets,
  useServiceBudgets,
} from "store/billing/selectors";
import useQueryParams from "hooks/useQueryParams";
import dayjs from "dayjs";
import FixedLayout from "components/FixedLayout";
import { BILLING_EXPORT_PATH } from "constant/paths";
import { getPath } from "utils/index";

const ViewPdf = () => {
  const { item, onGetBilling, updateStatus } = useBillings();
  const { arrService, sumAmount, onGetServiceBudgets } = useServiceBudgets();
  const { budgets, onGetBudgets } = useBudgets();
  const { initQuery, isReady, query } = useQueryParams();
  const printRef = React.useRef("");
  const param = useParams();

  const id = param?.id.toString();

  useEffect(() => {
    onGetBilling(id ?? "");
  }, [onGetBilling, updateStatus]);

  useEffect(() => {
    if (!isReady) return;
    onGetBudgets({ ...initQuery });
  }, [initQuery, isReady, onGetBudgets]);

  useEffect(() => {
    if (budgets && budgets?.length > 0) {
      budgets?.forEach((item) => {
        onGetServiceBudgets(item.id ?? "");
      });
    }
  }, [budgets]);

  const downloadFile = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element as unknown as HTMLElement);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, 180);
    pdf.save("print.pdf");
  };
  const openNewTab = () => {
    window.open(getPath(BILLING_EXPORT_PATH, undefined, { id: id ?? "" }), "");
  };

  return (
    <FixedLayout
      maxHeight={920}
      maxWidth={{
        xs: 1120,
        xl: 1450,
      }}
    >
      <Stack
        direction={"row"}
        gap={2}
        justifyContent={"end"}
        p={2}
        borderBottom={"1px solid #ECECF3"}
      >
        <Button variant="secondary" startIcon={<Textsms />}>
          Insert component
        </Button>
        <Button
          variant="secondary"
          startIcon={<ArrowExport />}
          onClick={() => openNewTab()}
        >
          Open new tab
        </Button>
        <Button
          variant="secondary"
          startIcon={<DownloadIcon />}
          onClick={() => downloadFile()}
        >
          Download
        </Button>
      </Stack>
      <Box style={{ background: "#898989", overflow: "scroll" }}>
        <div ref={printRef} style={{ fontSize: 20, fontWeight: 600 }}>
          <Stack
            gap={2}
            p={2}
            padding={8}
            margin={"0px auto"}
            sx={{
              width: "90%",
              background: "#fff",
              zIndex: 1,
              mt: 2,
              fontWeight: 600,
            }}
          >
            <Grid container spacing={2}>
              <Grid md={12} p={2}>
                <Text variant={"body1"}>{item?.company}</Text>
                <Text variant={"body1"}>VietNam</Text>
              </Grid>
              <Grid md={12} p={2}>
                <Text sx={{ color: "#154276", fontWeight: 600 }}>
                  Invoice {item?.invoiceNumber?.toString()}
                </Text>
              </Grid>
              <Grid md={12} p={2}>
                <Text sx={{ color: "#92a2be" }}>SUBJECT</Text>
                <Text>{item?.subject}</Text>
              </Grid>
              <Grid container md={12} p={2}>
                <Grid md={3}>
                  <Text sx={{ color: "#92a2be" }}>CLIENT</Text>
                  <Text></Text>
                </Grid>
                <Grid md={3}>
                  <Text sx={{ color: "#92a2be" }}>DATE</Text>
                  <Text>
                    {item?.date ? dayjs(item?.date).format("DD/MM/YYYY") : ""}{" "}
                  </Text>
                </Grid>
                <Grid md={3}>
                  <Text sx={{ color: "#92a2be" }}>DUE DATE</Text>
                  <Text>
                    {item?.dueDate
                      ? dayjs(item?.dueDate).format("DD/MM/YYYY")
                      : ""}
                  </Text>
                </Grid>

                <Grid md={3}>
                  <Text sx={{ color: "#92a2be", fontSize: 13 }}>
                    CREATED BY
                  </Text>
                  <Text>{item?.user ? item?.user[0]?.fullname ?? "" : []}</Text>
                </Grid>
              </Grid>
              <Grid md={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "#92a2be", fontSize: 13 }}>
                          DESCRIPTION
                        </TableCell>
                        <TableCell sx={{ color: "#92a2be", fontSize: 13 }}>
                          UNIT
                        </TableCell>
                        <TableCell sx={{ color: "#92a2be", fontSize: 13 }}>
                          QTY
                        </TableCell>
                        <TableCell sx={{ color: "#92a2be", fontSize: 13 }}>
                          RATE
                        </TableCell>
                        <TableCell sx={{ color: "#92a2be", fontSize: 13 }}>
                          AMOUNT
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {arrService?.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.desc}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item.discount}</TableCell>
                            <TableCell>{item.price}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid md={12} p={2} justifyContent={"end"} display={"flex"}>
                <Grid>
                  <Stack direction={"row"} gap={2}>
                    <Grid container>
                      <Text sx={{ color: "#92a2be", fontSize: 13 }}>
                        SUBTOTAL
                      </Text>
                    </Grid>

                    <Text>{item?.amount}</Text>
                  </Stack>
                  <Stack direction={"row"} gap={2}>
                    <Grid container>
                      <Text sx={{ color: "#92a2be", fontSize: 13 }}>
                        VAT (10%)
                      </Text>
                    </Grid>

                    <Text>{item?.vat}</Text>
                  </Stack>
                  <Stack direction={"row"} gap={2}>
                    <Grid container>
                      <Text sx={{ color: "#92a2be", fontSize: 13 }}>
                        GRAND TOTAL
                      </Text>
                    </Grid>
                    <Text sx={{ color: "#154276", fontWeight: 600 }}>
                      {item?.amount}
                    </Text>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </div>
      </Box>
    </FixedLayout>
  );
};

export default memo(ViewPdf);
