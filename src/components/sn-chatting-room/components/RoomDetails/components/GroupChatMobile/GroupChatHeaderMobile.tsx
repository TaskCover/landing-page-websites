import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const GroupChatHeaderMobile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "54px",
        padding: "0px 16px",
        width: "100%",
      }}
    >
      <IconButton sx={{ width: "12px", height: "21px", color: "#999999" }}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Box>
  );
};

export default GroupChatHeaderMobile;
