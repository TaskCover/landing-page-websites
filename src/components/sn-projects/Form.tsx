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

import { ProjectData } from "store/project/actions";
import { DataAction } from "constant/enums";
import { Input } from "components/shared";

type FormProps = {
  initialValues: ProjectData;
  type: DataAction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: ProjectData) => Promise<any>;
} & Omit<DialogLayoutProps, "children" | "onSubmit">;

const Form = (props: FormProps) => {
  const { initialValues, type, onSubmit: onSubmitProps, ...rest } = props;
  const { onAddSnackbar } = useSnackbar();

  const label = useMemo(() => {
    switch (type) {
      case DataAction.CREATE:
        return "Create";
      case DataAction.UPDATE:
        return "Update";
      default:
        return "";
    }
  }, [type]);

  const onSubmit = async (values: ProjectData) => {
    try {
      const newItem = await onSubmitProps(values);

      if (newItem) {
        onAddSnackbar(`${label} tournament successfully!`, "success");
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
      (out: FormikErrors<ProjectData>, [key, error]) => {
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
      sx={{ minWidth: { xs: "100%", lg: 700 }, maxWidth: 700 }}
      label={`${label} New Tournament`}
      isLoading={formik.isSubmitting}
      disabled={disabled}
      onSubmit={formik.handleSubmit}
      {...rest}
    >
      <Stack spacing={2} pt={3}>
        <Input
          title="Tên dự án"
          name="name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          error={touchedErrors?.name}
          rootSx={sxConfig.input}
        />
        <Stack direction="row" spacing={2}>
          <Input
            title="Người phụ trách"
            name="owner"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.owner}
            error={touchedErrors?.owner}
            rootSx={sxConfig.input}
            fullWidth
          />
          <Input
            title="Loại dự án"
            name="type_project"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.type_project}
            error={touchedErrors?.type_project}
            rootSx={sxConfig.input}
            fullWidth
          />
        </Stack>
      </Stack>
    </FormLayout>
  );
};

export default memo(Form);

export const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Tên dự án là bắt buộc"),
});

const sxConfig = {
  input: {
    height: 56,
  },
};
