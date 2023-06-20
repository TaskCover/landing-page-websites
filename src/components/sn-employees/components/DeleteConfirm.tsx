import React, { memo, useState } from "react";
import { Stack } from "@mui/material";
import ConfirmDialog, { ConfirmDialogProps } from "components/ConfirmDialog";
import { Company, Employee } from "store/company/reducer";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { AN_ERROR_TRY_AGAIN } from "constant/index";

type DeleteConfirmProps = ConfirmDialogProps & {
  items?: Employee[];
};

const DeleteConfirm = (props: DeleteConfirmProps) => {
  const { items = [], onSubmit: onSubmitProps, ...rest } = props;

  const { onAddSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      const ids = onSubmitProps && (await onSubmitProps());

      if (ids?.length) {
        onAddSnackbar("Delete employees successfully!", "success");
        props?.onClose();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfirmDialog onSubmit={onSubmit} pending={isSubmitting} {...rest}>
      <Stack alignItems="center" spacing={2} my={3} flex={1}>
        {items.map((item) => (
          <Stack direction="row" width={275} key={item.id} spacing={1.5}>
            <Avatar size={40} src={item.avatar?.link} />
            <Stack>
              <Text variant="h6">{item.fullname}</Text>
              <Text variant="body2">{item.email}</Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </ConfirmDialog>
  );
};

export default memo(DeleteConfirm);
