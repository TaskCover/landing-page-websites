import { memo } from "react";
import { IconButton } from "components/shared";
import DeleteUserIcon from "icons/DeleteUserIcon";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";
import {
  useMembersOfProject,
  useProject,
  useProjects,
} from "store/project/selectors";
import { useSnackbar } from "store/app/selectors";
import { getMessageErrorByAPI } from "utils/index";
import { AN_ERROR_TRY_AGAIN } from "constant/index";

type DeleteUserProps = {
  id: string;
};

const DeleteUser = ({ id }: DeleteUserProps) => {
  const [isShow, onShow, onHide] = useToggle();

  const { onUpdateProject } = useProjects();
  const { item } = useProject();
  const { onAddSnackbar } = useSnackbar();
  const { onDeleteMember } = useMembersOfProject();

  const onClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onShow();
  };
  const onSubmit = async () => {
    if (!item?.id) return;
    const newMembers = [...(item?.members ?? [])];

    const indexSelected = newMembers.findIndex((member) => member.id === id);

    try {
      if (indexSelected === -1) {
        throw AN_ERROR_TRY_AGAIN;
      }
      newMembers.splice(indexSelected, 1);
      const members = newMembers.map((member) => ({
        id: member.id,
        position: member.position_project.id,
      }));
      const newData = await onUpdateProject(item.id, { members });
      if (newData) {
        onAddSnackbar("Remove member successfully!", "success");
        onDeleteMember(id);
      }
    } catch (error) {
      onAddSnackbar(getMessageErrorByAPI(error), "error");
    }
  };

  return (
    <>
      <IconButton
        onClick={onClick}
        tooltip="Remove from project"
        variant="contained"
        size="small"
        sx={{ bgcolor: "error.light" }}
      >
        <DeleteUserIcon sx={{ color: "text.primary" }} />
      </IconButton>

      <ConfirmDialog
        sx={{
          maxWidth: { xs: "calc(100vw - 24px)", sm: 420 },
          minWidth: { xs: "calc(100vw - 24px)", sm: 420 },
        }}
        open={isShow}
        onClose={onHide}
        title="Confirm remove member"
        content="Are you sure you want to remove this member from the project?"
        onSubmit={onSubmit}
      />
    </>
  );
};

export default memo(DeleteUser);
