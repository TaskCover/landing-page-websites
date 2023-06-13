import { Stack, Box } from "@mui/material";
import { Button, Text } from "components/shared";
import { ChangeEvent, memo, useMemo, useRef, useState } from "react";
import UserPlaceholderImage from "public/images/img-user-placeholder.webp";
import Image from "next/image";
import UploadIcon from "icons/UploadIcon";

const AvatarUpload = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>();

  const previewImage = useMemo(
    () => (file ? URL.createObjectURL(file) : UserPlaceholderImage),
    [file],
  );

  const onChooseFile = () => {
    inputFileRef?.current?.click();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setFile(files[0]);
  };

  return (
    <Stack spacing={1}>
      <Text variant="caption" color="grey.300">
        Ảnh đại diện
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
          variant="text"
          sx={{
            backgroundColor: "primary.light",
            color: "primary.main",
            height: 32,
            fontSize: 14,
            lineHeight: 18,
            "&:hover": {
              color: "primary.dark",
              backgroundColor: "primary.light",
            },
          }}
          onClick={onChooseFile}
          size="extraSmall"
          startIcon={<UploadIcon color="primary" sx={{ fontSize: 16 }} />}
        >
          Tải ảnh lên
        </Button>
      </Stack>

      <Box
        type="file"
        accept="image/*"
        component="input"
        display="none"
        onChange={onChange}
        ref={inputFileRef}
      />
    </Stack>
  );
};

export default memo(AvatarUpload);
