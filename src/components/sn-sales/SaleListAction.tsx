import { Icon, Modal, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { NS_COMMON, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useState } from "react";
import AddDealModal from "./Modals/AddDealsModal";
import ArrowExport from "icons/ArrowExport";
import PlusIcon from "icons/PlusIcon";
import { Dropdown } from "components/Filters";

const modalName = {
  DEAL: "deal",
  EXPORT: "export",
};

const SalesListAction = () => {
  const [dealModel, setDealModal] = useState(false);
  const [exportModel, setExportModel] = useState(false);
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  const onOpenModal = (modal) => {
    switch (modal) {
      case modalName.DEAL:
        setDealModal(true);
        break;
      case modalName.EXPORT:
        setExportModel(true);
        break;
      default:
    }
  };

  const onCloseModal = (modal) => {
    switch (modal) {
      case modalName.DEAL:
        setDealModal(false);
        break;
      case modalName.EXPORT:
        setExportModel(false);
        break;
      default:
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={3}
      maxWidth="100%"
      overflow="auto"
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Button
          onClick={() => onOpenModal(modalName.DEAL)}
          size="small"
          variant="contained"
          startIcon={<PlusIcon />}
          sx={{ height: 40 }}
        >
          {salesT("list.action.deal")}
        </Button>
        <Button
          onClick={() => onOpenModal(modalName.EXPORT)}
          size="small"
          variant="secondary"
          sx={{ height: 40 }}
          startIcon={<ArrowExport sx={{ backgroundColor: "transparent" }} />}
        >
          {salesT("list.action.export")}
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Dropdown
          name="Sort"
          onChange={() => console.log("change")}
          options={[{ label: "Sort", value: "sort" }]}
        />
      </Stack>
      <AddDealModal
        open={dealModel}
        onClose={() => onCloseModal(modalName.DEAL)}
      />
    </Stack>
  );
};

export default memo(SalesListAction);
