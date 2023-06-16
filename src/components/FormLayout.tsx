import { Stack } from "@mui/material";
import { memo } from "react";
import DialogLayout, { DialogLayoutProps } from "./DialogLayout";
import { Button, Text } from "./shared";

type FormLayoutProps = {
  label: string;
  submitText?: string;
  cancelText?: string;
  disabled?: boolean;
  submitting?: boolean;
} & DialogLayoutProps;

const FormLayout = (props: FormLayoutProps) => {
  const {
    label,
    submitText = "Xác nhận",
    cancelText = "Hủy bỏ",
    children,
    disabled,
    submitting,
    sx,
    onClose,
    ...rest
  } = props;
  return (
    <DialogLayout
      sx={{ ...defaultSx.root, ...sx }}
      headerProps={{
        sx: defaultSx.header,
      }}
      bottomProps={{
        sx: defaultSx.bottom,
      }}
      renderHeader={label}
      contentProps={{ sx: { px: 3 } }}
      renderBottom={
        <>
          <Button
            type="button"
            onClick={onClose}
            variant="primaryOutlined"
            size="small"
            disabled={disabled}
            sx={defaultSx.button}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            disabled={disabled}
            sx={defaultSx.button}
            type="submit"
            size="small"
            pending={submitting}
          >
            {submitText}
          </Button>
        </>
      }
      onClose={onClose}
      {...rest}
    >
      <Stack flex={1} overflow="auto">
        {children}
      </Stack>
    </DialogLayout>
  );
};

export default memo(FormLayout);

const defaultSx = {
  root: {
    minWidth: { xs: "calc(100vw - 24px)", sm: 850 },
    minHeight: 500,
    px: 0,
  },
  bottom: {
    borderTop: "1px solid",
    borderColor: "grey.100",
    pt: 3,
    pb: 0,
    px: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    borderBottom: "1px solid",
    borderColor: "grey.100",
    pb: 3,

    "& > button": {
      top: 0,
      transform: "unset",
    },
  },
  button: {
    minWidth: 120,
    mx: 1.5,
  },
};
