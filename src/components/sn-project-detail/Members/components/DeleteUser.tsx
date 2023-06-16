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
        onAddSnackbar("Xóa thành viên thành công!", "success");
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
        tooltip="Xóa khỏi dự án"
        variant="contained"
        size="small"
        sx={{ bgcolor: "error.light" }}
      >
        <DeleteUserIcon sx={{ color: "text.primary" }} />
      </IconButton>

      <ConfirmDialog
        sx={{
          maxWidth: { xs: "calc(100vw - 24px)", sm: 320 },
          minWidth: { xs: "calc(100vw - 24px)", sm: 320 },
        }}
        open={isShow}
        onClose={onHide}
        title="Xác nhận loại bỏ thành viên"
        content="Bạn có chắc chắn muốn loại bỏ thành viên này ra khỏi dự án?"
        onSubmit={onSubmit}
      />
    </>
  );
};

export default memo(DeleteUser);
