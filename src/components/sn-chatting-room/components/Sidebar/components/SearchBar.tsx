import { Box, InputBase, Paper } from "@mui/material"
import { IconButton } from "components/shared"
import SearchIcon from "icons/SearchIcon"

const SearchBar = () => {
    return <Box
        sx={{
            backgroundColor: "var(--brand-primary, #3699FF)",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "8px",
            minWidth: '293px'
        }}
    >
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                height: "40px",
                width: "273px",
                borderRadius: "8px",
                boxShadow: 'none'
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
                    '& .MuiInputBase-input': {
                        padding: '0px !important',
                    }
                }}
            />
        </Paper>
    </Box>
}

export default SearchBar