import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Avatar from "components/Avatar";
import { NS_DOCS } from "constant/index";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useAuth } from "store/app/selectors";
import { NewPageContext } from "../../context/NewPageContext";
import { User } from "constant/types";
import { useEditor } from "@tiptap/react";
import { getExtensions } from "../../tiptap/extensions/starter-kit";
import useDocEditor from "../../hook/useDocEditor";

export class Comment {
  user: Partial<User>;
  content: string;
  id: string;
  replies: Array<Comment>;
  createdAt: Date;
  constructor(user, content) {
    this.user = user;
    this.content = content;
    this.id = `a${crypto.randomUUID()}a`;
    this.replies = [];
    this.createdAt = new Date();
  }
}

export default function CommentDialog() {
  const {
    openCommentDialog,
    setCommentDialogOpen,
    comments,
    setComments,
    setActiveCommentId,
  } = React.useContext(NewPageContext);
  const { user } = useAuth();
  const t = useTranslations(NS_DOCS);
  const [comment, setComment] = React.useState<string>("");

  const editor = useDocEditor();
  const handleClose = () => {
    setCommentDialogOpen(false);
  };

  const handleAddComment = () => {
    const newComment = new Comment(user, comment);
    setComments((prev) => {
      const latestComment = prev.at(-1);
      prev[prev.length - 1] = { ...latestComment, content: comment };
      return prev;
    });
    setActiveCommentId(newComment.id);
    editor?.commands.setComment(newComment.id);

    handleClose();
  };
  return (
    <Dialog open={openCommentDialog} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Avatar size={32} src={user?.avatar?.link} />
        <span>{user?.fullname}</span>
      </DialogTitle>
      <DialogContent sx={{ minWidth: "384px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Comment"
          type="text"
          fullWidth
          defaultValue={comment}
          onChange={(e) => setComment(e.target.value)}
          InputLabelProps={{ sx: { color: "InactiveCaptionText" } }}
          sx={{ color: "inherit" }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: "none" }} onClick={handleClose}>
          {t("button.cancel")}
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => handleAddComment()}
        >
          {t("button.comment")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
