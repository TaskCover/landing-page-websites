"use client";

import { Stack } from "@mui/material";
import { Button, Input, Text } from "components/shared";
import { memo, useMemo } from "react";
import { useSnackbar, useUserInfo } from "store/app/selectors";
import * as Yup from "yup";
import { useFormik, FormikErrors } from "formik";
import { getMessageErrorByAPI } from "utils/index";
import { ChangePasswordData } from "store/app/actions";
import { formErrorCode } from "api/formErrorCode";
import { ErrorResponse } from "constant/types";

const ChangePassword = () => {
  const { onChangePassword } = useUserInfo();

  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values: ChangePasswordData) => {
    try {
      await onChangePassword(values);
      onAddSnackbar("Change password successfully!", "success");
      formik.resetForm();
    } catch (error) {
      if ((error as ErrorResponse)["code"] === formErrorCode.INVALID_DATA) {
        formik.setFieldError("old_password", "Old password is incorrect.");
      } else {
        onAddSnackbar(getMessageErrorByAPI(error), "error");
      }
    }
  };

  const onCancel = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (out: FormikErrors<typeof INITIAL_VALUES>, [key, error]) => {
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
    <Stack
      flex={1}
      justifyContent="center"
      alignItems="center"
      spacing={3}
      maxWidth={({ spacing }) => ({
        xs: `calc(100vw - ${spacing(3 * 2)})`,
        sm: 340,
      })}
      alignSelf="center"
      width="100%"
      py={3}
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Text variant="subtitle1" fontWeight={700}>
        Change password
      </Text>
      <Input
        rootSx={sxConfig.input}
        fullWidth
        title="Old password"
        name="old_password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.old_password}
        error={touchedErrors?.old_password}
        required
      />
      <Input
        rootSx={sxConfig.input}
        fullWidth
        title="New password"
        name="new_password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.new_password}
        error={touchedErrors?.new_password}
        required
      />
      <Input
        rootSx={sxConfig.input}
        fullWidth
        title="Confirm new password"
        name="renew_password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.renew_password}
        error={touchedErrors?.renew_password}
        required
      />

      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        alignItems="center"
        spacing={{ xs: 2, sm: 3 }}
        width="100%"
      >
        <Button
          type="button"
          onClick={onCancel}
          sx={sxConfig.button}
          variant="primaryOutlined"
          size="small"
          fullWidth
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          pending={formik.isSubmitting}
          sx={{ ...sxConfig.button }}
          variant="primary"
          size="small"
          type="submit"
          fullWidth
        >
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(ChangePassword);

const INITIAL_VALUES = {
  old_password: "",
  new_password: "",
  renew_password: "",
};

export const validationSchema = Yup.object().shape({
  old_password: Yup.string().trim().required("Old password is required."),
  new_password: Yup.string()
    .trim()
    .required("New password is required.")
    .test(
      "is-diff-old-pass",
      "The new password cannot be the same as the old password.",
      (value, { parent }) => {
        if (value && parent["old_password"] && value === parent["old_password"])
          return false;
        return true;
      },
    ),
  renew_password: Yup.string()
    .oneOf(
      [Yup.ref("new_password"), ""],
      "Confirm new password does not match.",
    )
    .required("Confirm new password is required."),
});

const sxConfig = {
  input: {
    height: 58,
    "& input": {
      color: ({ palette }) => `${palette.grey[900]}!important`,
    },
  },
  button: {
    minWidth: 150,
  },
};
