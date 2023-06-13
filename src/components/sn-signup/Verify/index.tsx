"use client";

import { memo, useState } from "react";
import { Stack } from "@mui/material";
import AppLogo from "components/AppLogo";
import { Button, Input, Text } from "components/shared";
import { useAuth, useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { formErrorCode } from "api/formErrorCode";
import { ErrorResponse } from "constant/types";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { useRouter } from "next/navigation";
import { SIGNIN_PATH } from "constant/paths";

const Verify = () => {
  const { onVerify } = useAuth();
  const { onAddSnackbar } = useSnackbar();
  const { push } = useRouter();

  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (newValue?: string | number) => {
    setCode(`${newValue ?? ""}`);
    setError(undefined);
  };

  const onSubmit = async () => {
    if (!code) return;
    setIsSubmitting(true);
    try {
      const newData = await onVerify(code);
      if (newData) {
        onAddSnackbar("Đăng ký thành công, vui lòng đăng nhập!", "success");
        push(SIGNIN_PATH);
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      if ((error as ErrorResponse)["code"] === formErrorCode.INVALID_CODE) {
        setError("Mã code không chính xác.");
      } else {
        onAddSnackbar(getMessageErrorByAPI(error), "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        >
          <AppLogo width={188} />
          <Text variant="h3" textAlign="center" mt={3}>
            Xác thực tài khoản
          </Text>
          <Text
            variant="body2"
            display={{ xs: "none", sm: "initial" }}
            textAlign="center"
            mt={1}
            mb={2}
          >
            Một mã code đã được gửi đến email đăng ký của bạn
            <br />
            Vui lòng kiểm tra mail và điền mã code để hoàn thành đăng ký
          </Text>
          <Text
            variant="body2"
            display={{ sm: "none" }}
            textAlign="center"
            mt={1}
            mb={2}
          >
            Một mã code đã được gửi đến email đăng ký của bạn. Vui lòng kiểm tra
            mail và điền mã code để hoàn thành đăng ký
          </Text>
          <Input
            titleSx={{ left: "33%" }}
            rootSx={{
              backgroundColor: "grey.50",
              height: 58,
              "& input": { textAlign: "center" },
            }}
            title="Mã code"
            value={code}
            onChangeValue={onChange}
            error={error}
            fullWidth
          />
          <Button
            onClick={onSubmit}
            disabled={!code || isSubmitting}
            variant="primary"
            sx={{ mt: 3, minHeight: 48 }}
            fullWidth
            pending={isSubmitting}
          >
            Xác thực
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Verify);
