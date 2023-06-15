import { memo, useId, MouseEvent, useState } from "react";
import {
  AlertColor,
  Box,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  TableCellProps,
  popoverClasses,
} from "@mui/material";
import { BodyCell } from "components/Table";
import { IconButton, Text } from "components/shared";
import MoreSquareIcon from "icons/MoreSquareIcon";
import PencilIcon from "icons/PencilIcon";
import TrashIcon from "icons/TrashIcon";
import ConfirmDialog from "components/ConfirmDialog";
import useToggle from "hooks/useToggle";

type ActionsCellProps = {
  onChildClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
} & TableCellProps;

const ActionsCell = (props: ActionsCellProps) => {
  const { children, onChildClick, onEdit, onDelete, ...rest } = props;

  const [isShow, onShow, onHide] = useToggle();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverId = useId();

  const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onShowDialogConfirm = () => {
    onShow();
    onClose();
  };
  const onCloseDialogDelete = () => {
    onClose();
    onHide();
  };

  return (
    <BodyCell align="left" {...rest}>
      <IconButton
        size="small"
        onClick={onOpen}
        sx={{ backgroundColor: "primary.light", color: "grey.400", p: 1 }}
        variant="contained"
      >
        <MoreSquareIcon sx={{ fontSize: 24 }} />
      </IconButton>
      <Popover
        id={popoverId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: "none",
            minWidth: 150,
            maxWidth: 150,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              mt: 0.5,
            },
          },
        }}
      >
        <Stack
          py={2}
          sx={{
            boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderTopWidth: 0,
            borderColor: "grey.100",
            borderRadius: 1,
          }}
        >
          <MenuList component={Box} sx={{ py: 0 }}>
            {!!children && (
              <MenuItem
                component={ButtonBase}
                sx={sxConfig.item}
                onClick={onChildClick}
              >
                {children}
              </MenuItem>
            )}
            {!!onEdit && (
              <MenuItem
                component={ButtonBase}
                onClick={onEdit}
                sx={sxConfig.item}
              >
                <PencilIcon sx={{ color: "grey.400" }} fontSize="medium" />
                <Text ml={2} variant="body2" color="grey.400">
                  Sửa
                </Text>
              </MenuItem>
            )}
            {!!onDelete && (
              <MenuItem
                component={ButtonBase}
                onClick={onShowDialogConfirm}
                sx={sxConfig.item}
              >
                <TrashIcon color="error" fontSize="medium" />
                <Text ml={2} variant="body2" color="grey.400">
                  Xóa bỏ
                </Text>
              </MenuItem>
            )}
          </MenuList>
        </Stack>
      </Popover>
      <ConfirmDialog
        onSubmit={onDelete}
        open={isShow}
        onClose={onCloseDialogDelete}
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa?"
      />
    </BodyCell>
  );
};

export default memo(ActionsCell);

const sxConfig = {
  item: {
    width: "100%",
    py: 1,
    px: 2,
  },
};
