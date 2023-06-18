"use client";

import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Input } from "components/shared";
import * as Yup from "yup";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { useFormik, FormikErrors } from "formik";
import { SignupData } from "store/app/actions";
import { EMAIL_REGEX, VN_PHONE_REGEX } from "constant/regex";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar, useAuth } from "store/app/selectors";
import { AvatarUpload } from "./components";
import { formErrorCode } from "api/formErrorCode";
import { ErrorResponse } from "constant/types";

const Form = () => {
  const { onSignup } = useAuth();
  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values: SignupData) => {
    try {
      await onSignup(values);
    } catch (error) {
      if ((error as ErrorResponse)["code"] === formErrorCode.REGISTERED_EMAIL) {
        formik.setFieldError(
          "email",
          "The email address name is already in use for another account.",
        );
      } else {
        onAddSnackbar(getMessageErrorByAPI(error), "error");
      }
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (
        out: FormikErrors<SignupData & { rePassword: string }>,
        [key, error],
      ) => {
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
      component="form"
      width="100%"
      maxHeight="100%"
      mt={3}
      onSubmit={formik.handleSubmit}
      spacing={3}
      overflow="hidden"
      noValidate
    >
      <Stack flex={1} overflow="auto" spacing={3}>
        <Input
          rootSx={sxConfig.input}
          fullWidth
          title="Full name"
          name="fullname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.fullname}
          error={touchedErrors?.fullname}
          required
        />
        <Input
          rootSx={sxConfig.input}
          fullWidth
          title="Phone number"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.phone}
          error={touchedErrors?.phone}
        />
        <Input
          rootSx={sxConfig.input}
          fullWidth
          title="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.email}
          error={touchedErrors?.email}
          required
        />
        <Input
          rootSx={sxConfig.input}
          fullWidth
          title="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.password}
          error={touchedErrors?.password}
          required
        />
        <Input
          rootSx={sxConfig.input}
          fullWidth
          title="Confirm password"
          name="rePassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.rePassword}
          error={touchedErrors?.rePassword}
          required
        />
        <AvatarUpload />
      </Stack>

      <Button
        type="submit"
        disabled={disabled}
        variant="primary"
        fullWidth
        pending={formik.isSubmitting}
      >
        Sign up
      </Button>
    </Stack>
  );
};

export default memo(Form);

const INITIAL_VALUES = {
  fullname: "",
  phone: "",
  email: "",
  password: "",
  rePassword: "",
};

export const validationSchema = Yup.object().shape({
  fullname: Yup.string().trim().required("Full name is required."),
  phone: Yup.string()
    .trim()
    .matches(VN_PHONE_REGEX, "Phone number is invalid."),
  email: Yup.string()
    .trim()
    .required("Email is required.")
    .matches(EMAIL_REGEX, "Email is invalid."),
  password: Yup.string()
    .trim()
    .required("Password is required.")
    .min(6, "Password must be between 6 and 30 characters.")
    .max(30, "Password must be between 6 and 30 characters."),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Confirm password does not match.")
    .required("Confirm password is required."),
});

const sxConfig = {
  input: {
    height: 58,
  },
};
