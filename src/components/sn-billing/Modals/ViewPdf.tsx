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
import React, { memo, useCallback, useEffect } from "react";
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
import { BILLING_EXPORT_PATH, BILLING_INFO_PATH } from "constant/paths";
import { getPath } from "utils/index";
import { useRouter } from "next-intl/client";

const ViewPdf = () => {
  const { push } = useRouter();
  const { fileExport, dataExport } = useBillings();

  const file = localStorage.getItem("file");

  const downloadFile = useCallback(() => {
    if (fileExport || file) {
      const link = document.createElement("a");
      link.href = fileExport ?? file ?? "";
      link.setAttribute("download", `${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      localStorage.removeItem("file");
    }
  }, [fileExport, file]);

  const openNewTab = () => {
    window.open(getPath(BILLING_EXPORT_PATH));
  };
  const onInsertComment = () => {
    if (dataExport && dataExport.length > 0) {
      push(
        getPath(BILLING_INFO_PATH, undefined, {
          id: dataExport[0]?.id ?? "",
        }),
      );
    }
    // window.open(getPath(BILLING_EXPORT_PATH, undefined, { id: id ?? "" }), "");
  };

  // useEffect(() => {
  //   const iframe = document.querySelector("iframe");
  //   if (iframe?.src) iframe.src = fileExport ?? "";
  // }, [fileExport]);

  return (
    <FixedLayout
      // maxHeight={920}
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
        {dataExport && dataExport.length !== 0 && dataExport.length === 1 && (
          <Button
            variant="secondary"
            startIcon={<Textsms />}
            onClick={() => onInsertComment()}
          >
            Insert comment
          </Button>
        )}

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
      <Stack style={{ background: "#898989" }} height={750}>
        <iframe
          src={fileExport ?? file ?? ""}
          width="100%"
          height="100%"
        ></iframe>
      </Stack>
    </FixedLayout>
  );
};

export default memo(ViewPdf);
