"use client";

import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import { Button, Input } from "components/shared";
import Link from "components/Link";
import { FORGOT_PASSWORD_PATH } from "constant/paths";
import * as Yup from "yup";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { useFormik, FormikErrors } from "formik";
import { SigninData } from "store/app/actions";
import { EMAIL_REGEX } from "constant/regex";
import { getMessageErrorByAPI } from "utils/index";
import { useSnackbar, useAuth } from "store/app/selectors";

const Form = () => {
  const { onSignin } = useAuth();
  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values: SigninData) => {
    try {
      const newData = await onSignin(values);

      if (newData) {
        onAddSnackbar("Đăng nhập thành công!", "success");
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
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
        title="Mật khẩu"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.password}
        error={touchedErrors?.password}
      />
      <Link
        sx={{
          mt: 1,
          fontSize: 14,
          alignSelf: "flex-end",
          "&:hover": {
            color: "grey.900",
          },
        }}
        href={FORGOT_PASSWORD_PATH}
        color="grey.400"
        underline="none"
      >
        Quên mật khẩu?
      </Link>
      <Button
        type="submit"
        disabled={disabled}
        sx={{ mt: 4 }}
        variant="primary"
        fullWidth
        pending={formik.isSubmitting}
      >
        Đăng nhập
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
    .required("Email là bắt buộc.")
    .matches(EMAIL_REGEX, "Email không hợp lệ!"),
  password: Yup.string().trim().required("Mật khẩu là bắt buộc."),
});

const sxConfig = {
  input: {
    height: 58,
  },
};
