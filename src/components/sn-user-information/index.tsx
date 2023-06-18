"use client";

import { Box, Stack } from "@mui/material";
import { Button, IconButton, Input, Text } from "components/shared";
import { AN_ERROR_TRY_RELOAD_PAGE } from "constant/index";
import { ChangeEvent, memo, useMemo, useRef } from "react";
import { useAuth, useSnackbar, useUserInfo } from "store/app/selectors";
import Avatar from "components/Avatar";
import BagIcon from "icons/BagIcon";
import useToggle from "hooks/useToggle";
import PencilIcon from "icons/PencilIcon";
import * as Yup from "yup";
import { VN_PHONE_REGEX } from "constant/regex";
import { useFormik, FormikErrors } from "formik";
import { getDataFromKeys, getMessageErrorByAPI } from "utils/index";
import { UpdateUserInfoData } from "store/app/actions";

const UserInformation = () => {
  const { user } = useAuth();
  const { onUpdateUserInfo } = useUserInfo();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [isEdit, onEditTrue, onEditFalse] = useToggle();

  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values: UpdateUserInfoData) => {
    try {
      await onUpdateUserInfo(values);
      onEditFalse();
      onAddSnackbar("Account information updated successfully!!", "success");
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  const onCancel = () => {
    formik.resetForm();
    onEditFalse();
  };

  const onChooseFile = () => {
    inputFileRef?.current?.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    formik.setFieldValue("file", files[0]);
  };

  const initialValues = useMemo(
    () => getDataFromKeys(user, Object.keys(INITIAL_VALUES)),
    [user],
  ) as UpdateUserInfoData;

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const previewImage = useMemo(
    () =>
      formik.values["file"]
        ? URL.createObjectURL(formik.values["file"] as unknown as File)
        : undefined,
    [formik.values],
  );

  const touchedErrors = useMemo(() => {
    return Object.entries(formik.errors).reduce(
      (
        out: FormikErrors<typeof INITIAL_VALUES & { rePassword: string }>,
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

  if (!user) {
    return (
      <Text variant="body2" textAlign="center" fontWeight={600}>
        {AN_ERROR_TRY_RELOAD_PAGE}
      </Text>
    );
  }

  return (
    <Stack
      flex={1}
      justifyContent="center"
      alignItems="center"
      spacing={3}
      maxWidth={({ spacing }) => ({
        xs: `calc(100vw - ${spacing(3 * 2)})`,
        sm: 700,
      })}
      alignSelf="center"
      width="100%"
      py={3}
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Text variant="subtitle1" fontWeight={700}>
        Account Information
      </Text>
      <Stack width={90} height={90} borderRadius="50%" position="relative">
        <Avatar size={90} src={previewImage} alt={user.fullname} />
        {isEdit && (
          <>
            <IconButton
              onClick={onChooseFile}
              noPadding
              sx={{
                width: 24,
                height: 24,
                backgroundColor: "common.white",
                borderRadius: "50%",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <PencilIcon sx={{ color: "grey.400", fontSize: 24 }} />
            </IconButton>
            <Box
              component="input"
              type="file"
              accept="image/*"
              display="none"
              ref={inputFileRef}
              onChange={onChangeFile}
            />
          </>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <BagIcon sx={{ color: "grey.400" }} fontSize="medium" />
        <Text color="grey.400">{`Position: ${
          user?.position?.name ?? "--"
        }`}</Text>
      </Stack>
      {!isEdit && (
        <Button onClick={onEditTrue} variant="secondary" size="small">
          Update account
        </Button>
      )}

      <Input
        rootSx={sxConfig.input}
        title="Full name"
        fullWidth
        name="fullname"
        disabled={!isEdit}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.fullname}
        error={touchedErrors?.fullname}
        required={isEdit}
      />
      <Input
        rootSx={sxConfig.input}
        title="Phone number"
        fullWidth
        name="phone"
        disabled={!isEdit}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values?.phone}
        error={touchedErrors?.phone}
      />
      <Input
        rootSx={sxConfig.input}
        title="Email"
        fullWidth
        name="email"
        disabled
        value={user.email}
        tooltip={isEdit ? "Email is not allowed to be updated." : undefined}
      />

      {isEdit && (
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
      )}
    </Stack>
  );
};

export default memo(UserInformation);

const INITIAL_VALUES = {
  fullname: "",
  phone: "",
  file: "",
};

export const validationSchema = Yup.object().shape({
  fullname: Yup.string().trim().required("Full name is required."),
  phone: Yup.string()
    .trim()
    .matches(VN_PHONE_REGEX, "Phone number is invalid!"),
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
