import { Stack, Box } from "@mui/material";
import { Button, Text } from "components/shared";
import { ChangeEvent, memo, useMemo, useRef, useState } from "react";
import UserPlaceholderImage from "public/images/img-user-placeholder.webp";
import Image from "next/image";
import UploadIcon from "icons/UploadIcon";

export type UploadProps = {
  title: string;
  name: string;
  required?: boolean;
};

const Upload = (props: UploadProps) => {
  const { title, name, required } = props;
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

export default memo(Upload);
