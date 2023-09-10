import { Box, InputBase, Paper } from "@mui/material";
import { IconButton } from "components/shared";
import useGetScreenMode from "hooks/useGetScreenMode";
import SearchIcon from "icons/SearchIcon";

const SearchBar = () => {
  const { mobileMode } = useGetScreenMode();
  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "8px",
        width: "100%",

        backgroundColor: !mobileMode
          ? "var(--brand-primary, #3699FF)"
          : "white",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          height: "40px",
          borderRadius: "8px",
          boxShadow: "none",
          ...(!mobileMode
            ? { width: "273px" }
            : { width: "80%", border: "1px solid" }),
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <InputBase
          size="small"
          placeholder="Search name"
          sx={{
            backgroundColor: "white",
            fontSize: 14,
            "& .MuiInputBase-input": {
              padding: "0px !important",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
