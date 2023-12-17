import { Checkbox, Grid, Stack, TextField } from "@mui/material";
import FormLayout from "components/FormLayout";
import { Input, Select, Text } from "components/shared";
import { NS_BILLING, NS_COMMON } from "constant/index";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Bill } from "store/billing/reducer";

type BillModalProps = {
  open?: boolean;
  handleClose?: () => void;
  isBillTo?: boolean;
  billTo: Bill;
  billFrom: Bill;
  setBillToInfo: (value: Bill) => void;
  setBillFromInfo: (value: Bill) => void;
};

const BillModal = (props: BillModalProps) => {
  const {
    handleClose,
    open,
    isBillTo,
    billFrom,
    billTo,
    setBillFromInfo,
    setBillToInfo,
  } = props;
  const commonT = useTranslations(NS_COMMON);
  const billingT = useTranslations(NS_BILLING);

  const formik = useFormik<Bill>({
    enableReinitialize: true,
    initialValues: {},
    onSubmit(values, formikHelpers) {
      if (isBillTo) {
        setBillToInfo({ ...values });
      } else {
        setBillFromInfo({ ...values });
      }
      formik.resetForm();
      handleClose?.();
    },
  });

  useEffect(() => {
    if (isBillTo) {
      formik.setValues(billTo);
    } else {
      formik.setValues(billFrom);
    }
  }, [billTo, billFrom, isBillTo]);
  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      open={open ?? false}
      label={isBillTo ? "Bill To" : "Bill From"}
      //   submitText={billingT(`${salesFormTranslatePrefix}.button.export`)}
      cancelText={commonT("form.cancel")}
      onClose={() => handleClose?.() ?? null}
      onSubmit={formik.handleSubmit}
      //   submitting={isFetching}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={2}>
            <Input
              title={"Full company name"}
              name="fullNameCompany"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.fullNameCompany}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
            <Input
              title={"Tax ID"}
              name="taxId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.taxId}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={2}>
            <Input
              title={"Street"}
              name="street"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.street}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} gap={2}>
            <Input
              title={"City"}
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.city}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
            <Input
              title={"ZIP / Postcode"}
              name="zipCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.zipCode}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={2}>
            <Input
              title={"State / County"}
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.state}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
            <Input
              title={"Country"}
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.country}
              // error={commonT(touchedErrors?.description, {
              //   name: commonT("form.title.description"),
              // })}
              fullWidth
              rootSx={sxConfig.input}
              sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}
            />
          </Stack>
        </Grid>
        {isBillTo && (
          <Grid item xs={12}>
            <Stack direction={"row"} gap={2} alignItems={"center"} pb={2}>
              <Checkbox checked={formik.values?.save} />
              <Text variant={"body2"}>
                {"Save as default billing for client"}
              </Text>
            </Stack>
          </Grid>
        )}
      </Grid>
    </FormLayout>
  );
};
const sxConfig = {
  input: {
    height: 56,
  },
};
export default memo(BillModal);
