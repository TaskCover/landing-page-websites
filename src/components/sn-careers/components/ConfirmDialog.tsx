import ConfirmDialog, { ConfirmDialogProps } from "components/ConfirmDialog";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";

type DeleteConfirmProps = ConfirmDialogProps & {
  id?: string;
  action: string;
};

const DeleteConfirm = (props: DeleteConfirmProps) => {
  const { id, onSubmit: onSubmitProps, action, ...rest } = props;
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
    </ConfirmDialog>
  );
};

export default memo(DeleteConfirm);
