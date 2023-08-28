import { Icon, Modal, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import { NS_COMMON, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useMemo, useState } from "react";
import AddDealModal from "./Modals/AddDealsModal";
import ArrowExport from "icons/ArrowExport";
import PlusIcon from "icons/PlusIcon";
import { Dropdown, Search } from "components/Filters";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { SORT_OPTIONS } from "constant/enums";

const modalName = {
  DEAL: "deal",
  EXPORT: "export",
};

const SalesListAction = () => {
  const [dealModel, setDealModal] = useState(false);
  const [exportModel, setExportModel] = useState(false);
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);
  const [queries, setQueries] = useState<Params>({});

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

  const onChangeQueries = (name, value) => {
    setQueries((prevQueries) => ({ ...prevQueries, [name]: value }));
  };

  const SORT_FITLER = useMemo(
    () => [
      {
        label: salesT("list.filter.decending"),
        value: SORT_OPTIONS.DESC,
      },
      {
        label: salesT("list.filter.ascending"),
        value: SORT_OPTIONS.ASC,
      },
    ],
    [salesT],
  );

  const COMPANY_QUERIES = useMemo(
    () => [
      {
        label: "ABC",
        value: "abc",
      },
    ],
    [commonT],
  );

  return (
    <Stack
      direction={{
        md: "row",
        xs: "column",
      }}
      justifyContent={{
        xs: "flex-start",
        md: "space-between",
      }}
      alignItems={{
        xs: "stretch",
        md: "center",
      }}
      spacing={3}
      py={3}
      px={2}
      maxWidth="100%"
      overflow="auto"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={{
          md: 0,
          xs: 3,
        }}
      >
        <Text variant="h2" display={{ md: "none" }}>
          {salesT("list.title")}
        </Text>
        <Stack direction={"row"} gap={2}>
          <Button
            onClick={() => onOpenModal(modalName.DEAL)}
            size="small"
            variant="contained"
            startIcon={<PlusIcon />}
            sx={{ height: 40, width: "fit-content" }}
          >
            <Text sx={{ display: { xs: "none", md: "block" } }} color="inherit">
              {salesT("list.action.deal")}
            </Text>
          </Button>
          <Button
            onClick={() => onOpenModal(modalName.EXPORT)}
            size="small"
            variant="secondary"
            sx={{ height: 40, width: "fit-content" }}
            startIcon={
                <ArrowExport />
            }
          >
            <Text sx={{ display: { xs: "none", md: "block" } }} color="inherit">
              {salesT("list.action.export")}
            </Text>
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction={{
          md: "row",
          xs: "row-reverse",
        }}
        alignItems="flex-start"
        justifyContent={{ xs: "flex-end", md: "flex-start" }}
        spacing={3}
        overflow="auto"
        minWidth={{ md: "fit-content" }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Dropdown
            placeholder={commonT("company")}
            name="company"
            onChange={(name, value) => onChangeQueries(name, value)}
            value={queries?.company}
            options={COMPANY_QUERIES}
          />
          <Dropdown
            placeholder={"sort by"}
            name="sort"
            onChange={(name, value) => onChangeQueries(name, value)}
            options={SORT_FITLER}
            value={queries?.sort}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={2} flexWrap={"wrap"}>
          <Search
            name="search"
            placeholder={commonT("search")}
            onChange={(name, value) => onChangeQueries(name, value)}
            sx={{ width: 210 }}
            value={queries?.name}
          />
          <Button
            size="extraSmall"
            sx={{
              display: { xs: "flex", md: "none" },
              height: 32,
            }}
            onClick={() => console.log("search")}
            variant="secondary"
          >
            {commonT("search")}
          </Button>
        </Stack>
      </Stack>
      <AddDealModal
        open={dealModel}
        onClose={() => onCloseModal(modalName.DEAL)}
      />
    </Stack>
  );
};

export default memo(SalesListAction);
