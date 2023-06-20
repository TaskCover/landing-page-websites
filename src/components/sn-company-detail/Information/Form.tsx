import { Stack } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { FormikErrors, useFormik } from "formik";
import { memo, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { getMessageErrorByAPI } from "utils/index";
import { Input } from "components/shared";
import { VN_PHONE_REGEX } from "constant/regex";
import { CompanyData } from "store/company/actions";

type FormProps = {
  initialValues: CompanyData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: CompanyData) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values: CompanyData) => {
    try {
      const newItem = await onSubmitProps(values);

      if (newItem) {
        onAddSnackbar("Company information updated successfully!", "success");
        props.onClose();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<CompanyData>, [key, error]) => {
        if (formik.touched[key]) {
          out[key] = error;
        }
        return out;
      },
      {},
    );
  }, [formik.touched, formik.errors]);

  const disabled = useMemo(
    () => !!Object.values(touchedErrors)?.length || formik.isSubmitting,
    [touchedErrors, formik.isSubmitting],
  );

  return (
    <FormLayout
      sx={{
        minWidth: { xs: "calc(100vw - 24px)", lg: 500 },
        maxWidth: { xs: "calc(100vw - 24px)", sm: 500 },
        minHeight: "auto",
      }}
      label="Edit Company Information"
      submitting={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} py={3}>
        <Input
          title="Company name"
          name="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          error={touchedErrors?.name}
          rootSx={sxConfig.input}
        />
        <Input
          title="Address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.address}
          error={touchedErrors?.address}
          rootSx={sxConfig.input}
        />
        <Input
          title="Phone number"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.phone}
          error={touchedErrors?.phone}
          rootSx={sxConfig.input}
        />
        <Input
          title="Tax code"
          name="tax_code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.tax_code}
          error={touchedErrors?.tax_code}
          rootSx={sxConfig.input}
        />
      </Stack>
    </FormLayout>
  );
};

export default memo(Form);

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Company name is required."),
  address: Yup.string().trim(),
  // .required("Chức vụ là bắt buộc."),
  phone: Yup.string()
    .trim()
    .matches(VN_PHONE_REGEX, "Phone number is invalid!"),
  tax_code: Yup.string().trim(),
  // .required("Tax code là bắt buộc."),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
