import { Box, Stack } from "@mui/material";
import React, { memo, useState } from "react";
import FormLayout from "components/FormLayout";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { NS_BILLING, NS_COMMON, NS_SALES, SALE_API_URL } from "constant/index";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select } from "components/shared";
import axios from "axios";
import { Endpoint, client } from "api";
import FileSaver from "file-saver";
import path from "path";
import { BILLING_EXPORT_PATH } from "constant/paths";
import { useRouter } from "next-intl/client";
import { Billing } from "store/billing/reducer";
import { getPath } from "utils/index";
// import useExportDeal from "../hooks/useExportDeal";

interface IProps {
  open: boolean;
  onClose(): void;
  item: Billing;
}

const salesFormTranslatePrefix = "list.modalExport";

const EXPORT_TYPE = [
  {
    label: "PDF",
    value: "PDF",
  },
];
const ORIENTATION = [
  {
    label: "Poitrait",
    value: "POITRAIT",
  },
];
const PAGE_SIZE = [
  {
    label: "A4",
    value: "A4",
  },
];

const ExportModal = ({ open, onClose, item }: IProps) => {
  //create form
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);
  const { push } = useRouter();
  //   const { exportDeal, isFetching } = useExportDeal();
  const schema = yup.object().shape({
    type: yup.string(),
  });

  const { handleSubmit, control, reset, getValues } = useForm({});

  const [selected, setSelected] = useState({
    document: "",
    orient: "",
    page: "",
  });

  const onSubmit = async () => {
    // return await exportDeal().then(() => {
    //   onClose();
    // });
    push(getPath(BILLING_EXPORT_PATH, undefined, { id: item?.id ?? "" }));
  };

  return (
    <Box>
      <FormLayout
        sx={{
          minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
          maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
          minHeight: "auto",
        }}
        open={open}
        label={billingT(`${salesFormTranslatePrefix}.title`)}
        submitText={billingT(`${salesFormTranslatePrefix}.button.export`)}
        cancelText={commonT("form.cancel")}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        //   submitting={isFetching}
      >
        <Stack gap={2} direction="column" sx={{ mb: 4 }}>
          <Controller
            control={control}
            name="type"
            render={({ field, fieldState: { error } }) => (
              <Stack spacing={2}>
                <Select
                  options={EXPORT_TYPE}
                  fullWidth
                  error={error?.message}
                  {...field}
                  title={billingT(`${salesFormTranslatePrefix}.documentFormat`)}
                  value={selected.document}
                  onChange={(e) => {
                    setSelected({ ...selected, document: e.target.value });
                  }}
                />
                <Select
                  options={ORIENTATION}
                  fullWidth
                  error={error?.message}
                  {...field}
                  title={billingT(`${salesFormTranslatePrefix}.orientation`)}
                  value={selected.orient}
                  onChange={(e) => {
                    setSelected({ ...selected, orient: e.target.value });
                  }}
                />
                <Select
                  options={PAGE_SIZE}
                  fullWidth
                  error={error?.message}
                  {...field}
                  title={billingT(`${salesFormTranslatePrefix}.pageSize`)}
                  value={selected.page}
                  onChange={(e) => {
                    setSelected({ ...selected, page: e.target.value });
                  }}
                />
              </Stack>
            )}
          />
        </Stack>
      </FormLayout>
    </Box>
  );
};

export default memo(ExportModal);
