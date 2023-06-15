import { Stack } from "@mui/material";
import { DialogLayoutProps } from "components/DialogLayout";
import FormLayout from "components/FormLayout";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { Option } from "constant/types";
import { FormikErrors, useFormik } from "formik";
import { memo, useEffect, useMemo } from "react";
import { useSnackbar } from "store/app/selectors";
import * as Yup from "yup";
import { getMessageErrorByAPI } from "utils/index";
import { DataAction } from "constant/enums";
import { Input, Select } from "components/shared";
import { EmployeeData } from "store/company/actions";
import { usePositions } from "store/global/selectors";
import { EMAIL_REGEX } from "constant/regex";

type FormProps = {
  initialValues: EmployeeData;
  type: DataAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: EmployeeData) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, type, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();

  const { options } = usePositions();

  const label = useMemo(() => {
    switch (type) {
      case DataAction.CREATE:
        return "Thêm mới";
      case DataAction.UPDATE:
        return "Cập nhật";
      default:
        return "";
    }
  }, [type]);

  const onSubmit = async (values: EmployeeData) => {
    try {
      const newItem = await onSubmitProps(values);

      if (newItem) {
        onAddSnackbar(`${label} nhân viên thành công!`, "success");
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
      (out: FormikErrors<EmployeeData>, [key, error]) => {
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
      label={`${label} nhân viên`}
      isLoading={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} py={3}>
        <Input
          title="Email"
          name="email"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.email}
          error={touchedErrors?.email}
          rootSx={sxConfig.input}
        />
        <Select
          options={options}
          title="Chức vụ"
          name="position"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.position}
          error={touchedErrors?.position}
          rootSx={sxConfig.input}
          fullWidth
        />
      </Stack>
    </FormLayout>
  );
};

export default memo(Form);

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email là bắt buộc.")
    .matches(EMAIL_REGEX, "Email không hợp lệ!"),
  position: Yup.string().trim().required("Chức vụ là bắt buộc."),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
