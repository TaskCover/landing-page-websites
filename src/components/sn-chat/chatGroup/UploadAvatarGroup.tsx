import { Box, Fab } from "@mui/material";
import UploadImageIcon from "icons/UploadImageIcon";
import { useChat } from "store/chat/selectors";

export const UploadAvatarGroup = () => {
  const { dataTransfer, onChangeGroupAvatar} = useChat();
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        right: "-22px",
        boxShadow: "2px 2px 24px 0px rgba(0, 0, 0, 0.10)",
        cursor: "pointer",
        borderRadius: "50%",
      }}
    >
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={async (e) => {
            if (e.currentTarget.files?.length) {
              onChangeGroupAvatar(e.currentTarget.files[0], dataTransfer?._id);
            }
          }}
        />
        <Fab
          color="primary"
          size="small"
          component="span"
          aria-label="add"
          sx={{
            background: "#fff",
            padding: "10px",
            "&:hover": {
              background: "#fff",
            },
          }}
        >
          <UploadImageIcon />
        </Fab>
      </label>
    </Box>
  );
};
