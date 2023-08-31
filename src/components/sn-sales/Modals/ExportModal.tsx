import { Stack } from "@mui/material";
import React, { memo } from "react";
import FormLayout from "components/FormLayout";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { NS_COMMON, NS_SALES, SALE_API_URL } from "constant/index";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select } from "components/shared";
import { CURRENCY_SYMBOL } from "../helpers";
import axios from "axios";
import { Endpoint, client } from "api";
import FileSaver from "file-saver";
import useExportDeal from "../hooks/useExportDeal";

interface IProps {
  open: boolean;
  onClose(): void;
}

const salesFormTranslatePrefix = "list.exportView";

const EXPORT_TYPE = [
  {
    label: "Exel (xlsx)",
    value: "xlsx",
  },
];

const ExportModal = ({ open, onClose }: IProps) => {
  //create form
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);
  const { exportDeal, isFetching } = useExportDeal();
  const schema = yup.object().shape({
    type: yup.string(),
  });

  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      type: "xlsx",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    return await exportDeal().then(() => {
      onClose();
    });
  };

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      open={open}
      label={salesT(`${salesFormTranslatePrefix}.title`)}
      submitText={salesT(`list.action.export`)}
      cancelText={commonT("form.cancel")}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      submitting={isFetching}
    >
      <Stack gap={2} direction="column" sx={{ mb: 4 }}>
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <Select
              options={EXPORT_TYPE}
              fullWidth
              error={error?.message}
              {...field}
              title={salesT(`${salesFormTranslatePrefix}.documentFormat`)}
            />
          )}
        />
      </Stack>
    </FormLayout>
  );
};

export default memo(ExportModal);
