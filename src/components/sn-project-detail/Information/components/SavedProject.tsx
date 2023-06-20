import { memo } from "react";
import { IconButton } from "components/shared";
import BookmarkIcon from "icons/BookmarkIcon";
import { useProject, useProjects } from "store/project/selectors";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";

const SavedProject = () => {
  const { item } = useProject();
  const { onUpdateProject } = useProjects();
  const { onAddSnackbar } = useSnackbar();

  const [isShow, onShow, onHide] = useToggle();

  const onSubmit = async () => {
    if (!item?.id) return;
    try {
      const newData = await onUpdateProject(item.id, { saved: !item.saved });
      if (newData) {
        onAddSnackbar("Update saved status successfully!", "success");
        onHide();
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  if (!item) return null;
  return (
    <>
      <IconButton
        onClick={onShow}
        sx={{ bgcolor: "grey.50", p: 0.5, borderRadius: 1 }}
      >
        <BookmarkIcon
          sx={{ fontSize: 24 }}
          color="primary"
          active={item.saved}
        />
      </IconButton>

      <ConfirmDialog
        open={isShow}
        onClose={onHide}
        title="Confirm save status change"
        content={`Are you sure to ${item.saved ? "un" : ""} save?`}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default memo(SavedProject);
