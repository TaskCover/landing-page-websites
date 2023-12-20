import { Endpoint, client } from "api";
import { NS_COMMON, NS_SALES, SALE_API_URL } from "constant/index";
import FileSaver from "file-saver";
import { useTranslations } from "next-intl";
import React from "react";
import {
  EXPORT_ORIENTATION_OPTIONS,
  EXPORT_PAGE_SIZE_OPTIONS,
  EXPORT_TYPE_OPTIONS,
} from "../helpers";
import { useSnackbar } from "store/app/selectors";

const useExportDeal = () => {
  const salesT = useTranslations(NS_SALES);
  const [isFetching, setIsFetching] = React.useState(false);
  const { onAddSnackbar } = useSnackbar();

  const exportDeal = async () => {
    setIsFetching(true);
    await client
      .get(
        Endpoint.SALES_DEAL_EXPORT,
        {},
        { responseType: "arraybuffer", baseURL: SALE_API_URL },
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        setIsFetching(false);
        FileSaver.saveAs(blob, `${salesT("list.title")}.xlsx`);
      })
      .catch((error) => {
        console.log(error);
        onAddSnackbar(salesT("list.exportView.error"), "error");
        setIsFetching(false);
      });
  };
  return { exportDeal, isFetching };
};

export const useGetExportOption = () => {
  const salesT = useTranslations(NS_SALES);
  const commonT = useTranslations(NS_COMMON);

  const EXPORT_TYPE = [
    {
      label: "Exel (xlsx)",
      value: EXPORT_TYPE_OPTIONS.XLS,
    },
    // {
    //   label: "PDF",
    //   value: EXPORT_TYPE_OPTIONS.PDF,
    // },
    // {
    //   label: "CSV",
    //   value: EXPORT_TYPE_OPTIONS.CSV,
    // },
  ];

  const ORIENTATION_TYPE = [
    {
      label: salesT("list.exportView.orientationOption.portrait"),
      value: EXPORT_ORIENTATION_OPTIONS.PORTRAIT,
    },
    {
      label: salesT("list.exportView.orientationOption.landscape"),
      value: EXPORT_ORIENTATION_OPTIONS.LANDSCAPE,
    },
  ];

  const PAGE_SIZE_TYPE = [
    {
      label: EXPORT_PAGE_SIZE_OPTIONS.A3,
      value: EXPORT_PAGE_SIZE_OPTIONS.A3,
    },
    {
      label: EXPORT_PAGE_SIZE_OPTIONS.A4,
      value: EXPORT_PAGE_SIZE_OPTIONS.A4,
    },
    {
      label: EXPORT_PAGE_SIZE_OPTIONS.A5,
      value: EXPORT_PAGE_SIZE_OPTIONS.A5,
    },
  ];

  const INCLUDE_ATTACHMENT_TYPE = [
    {
      label: commonT("yes"),
      value: "yes",
    },
    {
      label: commonT("no"),
      value: "no",
    },
  ];

  return {
    EXPORT_TYPE,
    ORIENTATION_TYPE,
    PAGE_SIZE_TYPE,
    INCLUDE_ATTACHMENT_TYPE,
  };
};

export default useExportDeal;
