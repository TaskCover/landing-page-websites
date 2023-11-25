import { memo, useState } from "react";
import { Stack } from "@mui/material";
import ConfirmDialog, { ConfirmDialogProps } from "components/ConfirmDialog";
import { Employee } from "store/company/reducer";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { BlogData } from "store/blog/actions";

type ApproveOrRejectConfirmProps = ConfirmDialogProps & {
  items?: BlogData[];
  action: string;
};

const ApproveOrRejectConfirm = (props: ApproveOrRejectConfirmProps) => {
  const { items = [], onSubmit: onSubmitProps, action, ...rest } = props;
  const commonT = useTranslations(NS_COMMON);

  const { onAddSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      const ids = onSubmitProps && (await onSubmitProps());

      if (ids?.length) {
        onAddSnackbar(
          commonT("notification.success", { label: action }),
          "success",
        );
        props?.onClose();
      } else {
        throw AN_ERROR_TRY_AGAIN;
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error, commonT), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfirmDialog onSubmit={onSubmit} pending={isSubmitting} {...rest}>
      <Stack alignItems="center" spacing={2} my={3} flex={1}>
        {items.map((item) => (
          <Stack direction="row" width={275} key={item.id} spacing={1.5}>
            <Stack>
              <Text variant="body2">{item.title}</Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </ConfirmDialog>
  );
};

export default memo(ApproveOrRejectConfirm);
