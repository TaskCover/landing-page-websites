import { memo } from "react";
import DialogLayout, { DialogLayoutProps } from "./DialogLayout";
import { Button, Text } from "./shared";

type ConfirmDialogProps = Omit<DialogLayoutProps, "children"> & {
  title: string;
  content: string;
  cancelText?: string;
  submitText?: string;
  pending?: boolean;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title,
    content,
    cancelText = "Cancel",
    submitText = "Submit",
    onClose,
    onSubmit,
    pending,
    sx,
    ...rest
  } = props;
  return (
    <DialogLayout
      hasDialogClose={false}
      sx={{ ...defaultSx.root, ...sx }}
      renderHeader={title}
      headerProps={{
        sx: defaultSx.header,
      }}
      bottomProps={{
        sx: defaultSx.bottom,
      }}
      contentProps={{ sx: { mt: 3 } }}
      renderBottom={
        <>
          <Button
            type="button"
            variant="primaryOutlined"
            size="small"
            sx={defaultSx.button}
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            sx={defaultSx.button}
            type="button"
            size="small"
            onClick={onSubmit}
            pending={pending}
          >
            {submitText}
          </Button>
        </>
      }
      onClose={onClose}
      {...rest}
    >
      <Text variant="body2" textAlign="center">
        {content}
      </Text>
    </DialogLayout>
  );
};

export default memo(ConfirmDialog);

const defaultSx = {
  root: {
    minWidth: 500,
    minHeight: 230,
    px: 3,
  },
  bottom: {
    p: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    borderBottom: "1px solid",
    borderColor: "grey.100",
    pb: 3,
    mx: 0,
    "& > p": {
      textAlign: "center",
    },
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
