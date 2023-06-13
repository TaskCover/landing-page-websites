"use client";

import { memo, useState } from "react";
import { Stack } from "@mui/material";
import AppLogo from "components/AppLogo";
import { Button, Input, Text } from "components/shared";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import CrownIcon from "icons/CrownIcon";
import { SUFFIX_EMAIL_REGEX } from "constant/regex";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";

const Verify = () => {
  const { onAddSnackbar } = useSnackbar();

  const [isShow, onShow, onHide] = useToggle();

  const [suffixEmail, setSuffixEmail] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (newValue?: string | number) => {
    const newText = `${newValue ?? ""}`;
    setSuffixEmail(newText);

    setError(
      SUFFIX_EMAIL_REGEX.test(newText) ? undefined : "Suffix email is invalid.",
    );
  };

  const onSubmit = async () => {
    if (!suffixEmail) return;
    setIsSubmitting(true);
    try {
      //TODO: Join workspace
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
            <Text variant="h3" textAlign="center" mt={3} mb={2}>
              Enter your workspace
            </Text>
            <Input
              rootSx={{
                backgroundColor: "grey.50",
                height: 58,
              }}
              title="Your work email"
              value={suffixEmail}
              onChangeValue={onChange}
              error={error}
              fullWidth
            />
            <Button
              onClick={onShow}
              disabled={!suffixEmail || isSubmitting}
              variant="primary"
              sx={{ mt: 3 }}
              fullWidth
            >
              Get Started
            </Button>

            <Text
              variant="body2"
              textAlign="center"
              mt={{ xs: 3, sm: 10 }}
              mb={2}
              color="common.black"
              maxWidth={280}
            >
              You want to create your own company. Click button below to upgrade
              to a corporate account
            </Text>

            <Button
              variant="secondary"
              startIcon={<CrownIcon color="primary" sx={{ fontSize: 24 }} />}
              fullWidth
            >
              Upgrade account
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <ConfirmDialog
        open={isShow}
        onClose={onHide}
        onSubmit={onSubmit}
        title="Confirm to Join"
        content="Are you sure to join AI Company"
        submitText="Join now"
      />
    </>
  );
};

export default memo(Verify);
