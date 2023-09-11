import { Box, IconButton, Typography } from "@mui/material";

interface ChatDetailInfoMenuItemProps {
  label: string;
  value: string;
}

const AccountInfoItem: React.FC<ChatDetailInfoMenuItemProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        padding: "10px 0px",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "stretch",
        }}
      >
        <Typography variant="body2" color="var(--Black, #212121)">
          {props.label}
        </Typography>
        <Typography variant="body2" color="var(--Black, #212121)">
          {props.value}
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountInfoItem;
