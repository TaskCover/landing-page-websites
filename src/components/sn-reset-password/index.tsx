"use client";

import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import AppLogo from "components/AppLogo";
import { Button, Input, Text } from "components/shared";
import { useAuth, useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik, FormikErrors } from "formik";
import { formErrorCode } from "api/formErrorCode";
import { ErrorResponse } from "constant/types";
import { SIGNIN_PATH } from "constant/paths";

const Reset = () => {
  const { onResetPassword, onSignOut } = useAuth();
  const { onAddSnackbar } = useSnackbar();
  const { push } = useRouter();

  const params = useParams();
  const token = useMemo(() => params.token, [params.token]);

  const onSubmit = async (values: typeof INITIAL_VALUES) => {
    try {
      await onResetPassword({ password: values.password, token });
      onSignOut();
      onAddSnackbar(
        "Đổi mật khẩu thành công, vui lòng đăng nhập lại.",
        "success",
      );
      push(SIGNIN_PATH);
    } catch (error) {
      let msg = "";
      if ((error as ErrorResponse)["code"] === formErrorCode.INVALID_DATA) {
        msg = "Link không chính xác hoặc đã hết hạn sử dụng.";
      }
      onAddSnackbar(
        msg ?? getMessageErrorByAPI(error),
        "error",
        msg ? 10000 : undefined,
      );
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
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        m={{ xs: 2, sm: 8 }}
        justifyContent="center"
        alignItems="center"
        bgcolor="common.white"
        p={3}
        flex={{ sm: 1 }}
        width={({ spacing }) => ({
          xs: `calc(100vw - ${spacing(2 * 2)})`,
          sm: `calc(100vw - ${spacing(8 * 2)})`,
        })}
        height={({ spacing }) => ({
          xs: "fit-content",
          sm: `calc(100vh - ${spacing(8 * 2)})`,
        })}
        maxHeight={{ xs: "fit-content", sm: "100%" }}
        borderRadius={2}
        overflow="auto"
      >
        <Stack
          minWidth={340}
          maxWidth={340}
          justifyContent="center"
          alignItems="center"
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <AppLogo width={188} />
          <Text variant="h3" textAlign="center" mt={3} mb={5}>
            Đặt lại mật khẩu mới
          </Text>

          <Input
            rootSx={sxConfig.input}
            fullWidth
            title="Mật khẩu mới"
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
            sx={{ mt: 3 }}
            fullWidth
            title="Nhập lại mật khẩu"
            name="rePassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.rePassword}
            error={touchedErrors?.rePassword}
            required
          />

          <Button
            type="submit"
            disabled={disabled}
            variant="primary"
            sx={{ mt: 3, minHeight: 48 }}
            fullWidth
            pending={formik.isSubmitting}
          >
            Xác nhận
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Reset);

const INITIAL_VALUES = {
  password: "",
  rePassword: "",
};

export const validationSchema = Yup.object().shape({
  password: Yup.string().trim().required("Mật khẩu mới là bắt buộc."),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Nhập lại mật khẩu không khớp.")
    .required("Nhập lại mật khẩu là bắt buộc."),
});

const sxConfig = {
  input: {
    backgroundColor: "grey.50",
    height: 58,
  },
};
