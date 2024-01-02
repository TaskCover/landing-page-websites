import { useState, useEffect, useRef, memo, Fragment } from "react";
import { Popper, Paper, Stack, Button } from "@mui/material";
import dynamic from "next/dynamic"; // Sử dụng dynamic để load ReactQuill chỉ khi cần thiết
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useOnClickOutside } from "hooks/useOnClickOutside";

const FormDescription = ({ task, isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  //   const quillRef = useRef(null);

  const handleClickOutside = () => {
    onClose();
  };

  const quillRef = useOnClickOutside(handleClickOutside);

  useEffect(() => {
    if (task && isOpen) {
      setDescription(task.description || "");
      setAnchorEl(quillRef.current);
      console.log(quillRef.current);
    }
  }, [task, isOpen]);

  const handleSave = () => {
    // Xử lý lưu mô tả (có thể gọi API hoặc các bước xử lý khác tùy thuộc vào ứng dụng của bạn)
    console.log("Saving description:", description);
    onClose();
  };

  const handleCancel = () => {
    // Đóng popup mà không lưu thay đổi
    onClose();
  };

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      placement="bottom-start"
      transition
    >
      {({ TransitionProps }) => (
        <Paper {...TransitionProps} sx={{ width: "300px", padding: "16px" }}>
          <Stack spacing={2}>
            <ReactQuill
              ref={quillRef}
              value={description}
              onChange={setDescription}
              theme="snow"
              placeholder="Enter task description..."
            />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Popper>
  );
};

export default memo(FormDescription);
