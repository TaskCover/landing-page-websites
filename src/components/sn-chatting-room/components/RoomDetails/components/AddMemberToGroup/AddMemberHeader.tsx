import React from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "icons/SearchIcon";

interface AddMemberHeaderProps {
  onClose?: () => void;
}

const AddMemberHeader: React.FC<AddMemberHeaderProps> = ({ onClose }) => {
  return (
    <Box
      sx={{
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        gap: "24px",
        width: "100%",
      }}
    >
      <IconButton sx={{ width: "12px", height: "21px", color: "#999999" }}>
        <ArrowBackIosNewIcon onClick={onClose} />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "292px",
          height: "46px",
          padding: "10px",
          border: "1px solid #E0E0E0",
          borderRadius: "10px",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              stroke="#999999"
              sx={{
                width: "20px",
              }}
            />
          </IconButton>

          <InputBase
            size="small"
            placeholder="Search name"
            sx={{
              color: " var(--Gray3, #999)",
              backgroundColor: "transparent",
              fontSize: 16,
              "& .MuiInputBase-input": {
                padding: "0px !important",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddMemberHeader;
