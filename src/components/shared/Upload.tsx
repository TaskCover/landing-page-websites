import { Stack, Box } from "@mui/material";
import { Button, Text } from "components/shared";
import { ChangeEvent, memo, useMemo, useRef, useState } from "react";
import UserPlaceholderImage from "public/images/img-user-placeholder.webp";
import Image from "next/image";
import UploadIcon from "icons/UploadIcon";
import { IMAGES_ACCEPT, NS_COMMON } from "constant/index";
import { useSnackbar } from "store/app/selectors";
import { useTranslations } from "next-intl";

export type UploadProps = {
  title: string;
  name: string;
  required?: boolean;
  onChange: (name: string, file?: File) => void;
  value?: File | string;
};

const Upload = (props: UploadProps) => {
  const { title, name, required, onChange, value } = props;
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { onAddSnackbar } = useSnackbar();
  const t = useTranslations(NS_COMMON);

  const previewImage = useMemo(() => {
    if (typeof value === "object") {
      return URL.createObjectURL(value);
    }
    return (value as string | undefined) ?? UserPlaceholderImage;
  }, [value]);

  const onChooseFile = () => {
    inputFileRef?.current?.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (IMAGES_ACCEPT.includes(files[0].type)) {
      onChange(name, files[0]);
    } else {
      onAddSnackbar(t("notification.imageTypeInvalid"), "error");
    }
  };

  return (
    <Stack spacing={1} flex={1}>
      <Text variant="caption" color="grey.300">
        {title}
        {required ? "*" : ""}
      </Text>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Image
          src={previewImage}
          alt="Avatar"
          width={64}
          height={64}
          className="rounded"
        />
        <Button
          variant="secondary"
          sx={{
            height: 32,
            fontSize: 14,
            lineHeight: 18,
          }}
          onClick={onChooseFile}
          size="extraSmall"
          startIcon={<UploadIcon color="inherit" sx={{ fontSize: 16 }} />}
        >
          {t("form.title.uploadImage")}
        </Button>
      </Stack>

      <Box
        type="file"
        accept={IMAGES_ACCEPT.join(", ")}
        component="input"
        display="none"
        onChange={onChangeFile}
        ref={inputFileRef}
      />
    </Stack>
  );
};

export default memo(Upload);
