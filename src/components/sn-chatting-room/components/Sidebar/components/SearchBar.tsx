import { Box, InputBase, Paper } from "@mui/material";
import { IconButton } from "components/shared";
import useGetScreenMode from "hooks/useGetScreenMode";
import useTheme from "hooks/useTheme";
import NewGroupIcon from "icons/NewGroupIcon";
import SearchIcon from "icons/SearchIcon";
import { debounce } from "utils/index";
import TuneIcon from '@mui/icons-material/Tune';

const SearchBar = ({ onSearchText }) => {
  const { mobileMode } = useGetScreenMode();

  const { isDarkMode } = useTheme();
  const debounceSearchText = debounce((text: string) => {
    onSearchText(text);
  }, 1000);

  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0px 10px",

        ...(isDarkMode
          ? {}
          : {
              backgroundColor: !mobileMode
                ? "var(--brand-primary, #3699FF)"
                : "white",
            }),
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
          background: isDarkMode ? "#3a3b3c" : "white",
        }}
      >
        <IconButton
          sx={{ p: "10px", color: isDarkMode ? "white" : "#999999" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>

        <InputBase
          size="small"
          placeholder="Search name"
          sx={{
            background: isDarkMode ? "#3a3b3c" : "white",
            color: isDarkMode ? "white" : "#999999",
            fontSize: 14,
            "& .MuiInputBase-input": {
              padding: "0px !important",
            },
          }}
          onChange={(e) => debounceSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      </Paper>
      <IconButton
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TuneIcon sx={{
          color: isDarkMode ? "white" : "white",
        }} />
      </IconButton>
      <IconButton
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NewGroupIcon fill="#999999" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
