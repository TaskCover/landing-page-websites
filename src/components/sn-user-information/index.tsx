"use client";

import { Box, Stack } from "@mui/material";
import { Button, IconButton, Input, Text } from "components/shared";
import {
  AN_ERROR_TRY_RELOAD_PAGE,
  IMAGES_ACCEPT,
  NS_ACCOUNT,
  NS_COMMON,
} from "constant/index";
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
import { client, Endpoint } from "api";
import { useTranslations } from "next-intl";
import useBreakpoint from "hooks/useBreakpoint";
import FixedLayout from "components/FixedLayout";

const UserInformation = () => {
  const { user } = useAuth();
  const { onUpdateUserInfo } = useUserInfo();
  const commonT = useTranslations(NS_COMMON);
  const accountT = useTranslations(NS_ACCOUNT);

  const { isSmSmaller } = useBreakpoint();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [isEdit, onEditTrue, onEditFalse] = useToggle();

  const { onAddSnackbar } = useSnackbar();

  const onSubmit = async (values: UpdateUserInfoData) => {
    try {
      const newData = { ...values };
      if (typeof values["avatar"] === "object") {
        const avatarUrl: string = await client.upload(
          Endpoint.UPLOAD,
          values["avatar"] as unknown as File,
        );
        newData["avatar"] = [avatarUrl];
      } else {
        delete newData["avatar"];
      }

      await onUpdateUserInfo(newData);
      onEditFalse();
      onAddSnackbar(
        accountT("accountInformation.notification.updateSuccess"),
        "success",
      );
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
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
    if (IMAGES_ACCEPT.includes(files[0].type)) {
      formik.setFieldValue("avatar", files[0]);
    } else {
      onAddSnackbar(commonT("form.notification.imageTypeInvalid"), "error");
    }
  };

  const initialValues = useMemo(
    () => ({
      ...getDataFromKeys(user, Object.keys(INITIAL_VALUES)),
      avatar: user?.avatar?.link,
    }),
    [user],
  ) as UpdateUserInfoData;

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const previewImage = useMemo(() => {
    if (typeof formik.values?.avatar === "object") {
      return URL.createObjectURL(formik.values.avatar as unknown as File);
    }
    return formik.values?.avatar as string | undefined;
  }, [formik.values?.avatar]);

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
        {commonT(AN_ERROR_TRY_RELOAD_PAGE)}
      </Text>
    );
  }

  return (
    <FixedLayout flex={1}>
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
          {accountT("accountInformation.title")}
        </Text>
        <Stack width={90} height={90} borderRadius="50%" position="relative">
        <Avatar
          size={90}
          src={previewImage}
          alt={user.fullname}
          onClick={isEdit ? onChooseFile : onEditTrue}
          style={{ cursor: "pointer" }}
        />
          {isEdit && (
            <>
              <IconButton
                onClick={onChooseFile}
                noPadding
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: "grey.50",
                  "&:hover": {
                    backgroundColor: "grey.50",
                  },
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
                accept={IMAGES_ACCEPT.join(", ")}
                display="none"
                ref={inputFileRef}
                onChange={onChangeFile}
              />
            </>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <BagIcon sx={{ color: "grey.400" }} fontSize="medium" />
          <Text color="grey.400">{`${commonT("position")}: ${
            user?.position?.name ?? "--"
          }`}</Text>
        </Stack>
        {!isEdit && (
          <Button onClick={onEditTrue} variant="secondary" size="small">
            {accountT("accountInformation.changeInformation")}
          </Button>
        )}

        <Input
          rootSx={sxConfig.input}
          title={commonT("fullName")}
          fullWidth
          name="fullname"
          disabled={!isEdit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.fullname}
          error={commonT(touchedErrors?.fullname, {
            name: commonT("fullName"),
            min: 6,
          })}
          required={isEdit}
        />
        <Input
          rootSx={sxConfig.input}
          title={commonT("phone")}
          fullWidth
          name="phone"
          disabled={!isEdit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.phone}
          error={commonT(touchedErrors?.phone, {
            name: commonT("phone"),
          })}
        />
        <Input
          rootSx={sxConfig.input}
          title="Email"
          fullWidth
          name="email"
          disabled
          value={user.email}
          tooltip={
            isEdit
              ? accountT("accountInformation.notAllowUpdate", { name: "Email" })
              : undefined
          }
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
              size={isSmSmaller ? "medium" : "small"}
              fullWidth
            >
              {commonT("form.cancel")}
            </Button>
            <Button
              disabled={disabled}
              pending={formik.isSubmitting}
              sx={{ ...sxConfig.button }}
              variant="primary"
              size={isSmSmaller ? "medium" : "small"}
              type="submit"
              fullWidth
            >
              {commonT("form.confirm")}
            </Button>
          </Stack>
        )}
      </Stack>
    </FixedLayout>
  );
};

export default memo(UserInformation);

const INITIAL_VALUES = {
  fullname: "",
  phone: "",
  avatar: "",
};

export const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .trim()
    .required("form.error.required")
    .min(6, "form.error.min"),
  // phone: Yup.string().trim().matches(VN_PHONE_REGEX, "form.error.invalid"),
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
