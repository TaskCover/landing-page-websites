"use client";

import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Input } from "components/shared";
import Link from "components/Link";
import { FORGOT_PASSWORD_PATH } from "constant/paths";
import * as Yup from "yup";
import { Endpoint, client } from "api";
import { useAuth } from "store/app";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { useFormik, FormikErrors } from "formik";
import { SigninData } from "store/app/actions";
import { EMAIL_REGEX } from "constant/regex";

const Form = () => {
  const { onSignin } = useAuth();

  const onSubmit = async (values: SigninData) => {
    try {
      const newData = await onSignin(values);

      if (newData) {
        // onAddSnackbar(`${label} tournament successfully!`, "success");
        // props.onClose();
        console.info("Logged in");
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      // onAddSnackbar(getMessageErrorByAPI(error), "error");
      console.error(error);
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
      (out: FormikErrors<SigninData>, [key, error]) => {
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
      mt={3}
      onSubmit={formik.handleSubmit}
    >
      <Input
        rootSx={sxConfig.input}
        fullWidth
        title="Email"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.email}
        error={touchedErrors?.email}
      />
      <Input
        rootSx={sxConfig.input}
        sx={{ mt: 3 }}
        fullWidth
        title="Password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.password}
        error={touchedErrors?.password}
      />
      <Link
        sx={{ mt: 1, fontSize: 14, alignSelf: "flex-end" }}
        href={FORGOT_PASSWORD_PATH}
        color="grey.400"
        underline="none"
      >
        Forgot password?
      </Link>
      <Button
        type="submit"
        disabled={disabled}
        sx={{ mt: 4 }}
        variant="primary"
        fullWidth
      >
        Signin
      </Button>
    </Stack>
  );
};

export default memo(Form);

const INITIAL_VALUES = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required.")
    .matches(EMAIL_REGEX, "Email is invalid!"),
  password: Yup.string().trim().required("Password is required."),
});

const sxConfig = {
  input: {
    height: 58,
  },
};
