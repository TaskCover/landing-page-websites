"use client";

import { memo, useState } from "react";
import { Stack } from "@mui/material";
import AppLogo from "components/AppLogo";
import { Button, Input, Text } from "components/shared";
import { useAuth, useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { AN_ERROR_TRY_AGAIN } from "constant/index";
import { useRouter } from "next/navigation";
import { SIGNIN_PATH } from "constant/paths";
import { EMAIL_REGEX } from "constant/regex";
import Result from "./Result";
import { formErrorCode } from "api/formErrorCode";
import { ErrorResponse } from "constant/types";

const Forgot = () => {
  const { onForgot } = useAuth();
  const { onAddSnackbar } = useSnackbar();
  const { push } = useRouter();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (newValue?: string | number) => {
    const newText = `${newValue ?? ""}`;
    setEmail(newText);
    setError(EMAIL_REGEX.test(newText) ? undefined : "Email is invalid.");
  };

  const onSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    try {
      await onForgot(email);
      setIsSuccess(true);
    } catch (error) {
      if ((error as ErrorResponse)["code"] === formErrorCode.INVALID_DATA) {
        setError(
          "The email address does not exist in the system, please check again.",
        );
      } else {
        onAddSnackbar(getMessageErrorByAPI(error), "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <Result />;
  }

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
            Forgot password
          </Text>
          <Text variant="body2" textAlign="center" mt={1} mb={2}>
            Password reset link will be sent to your email
            <br />
            Please enter your registered email
          </Text>

          <Input
            rootSx={{
              backgroundColor: "grey.50",
              height: 58,
            }}
            title="Email"
            value={email}
            onChangeValue={onChange}
            error={error}
            fullWidth
          />
          <Button
            onClick={onSubmit}
            disabled={!email || isSubmitting}
            variant="primary"
            sx={{ mt: 3, minHeight: 48 }}
            fullWidth
            pending={isSubmitting}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Forgot);
