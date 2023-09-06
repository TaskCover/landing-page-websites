import { Drawer, Box, Typography, IconButton, Avatar } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";

interface ChatDetailInfoProps {
  onClose: () => void;
}

const ChatDetailInfoHeader: React.FC<ChatDetailInfoProps> = ({ onClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "76px",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        padding: "16px 8px",
        backgroundColor: "var(--White, #fff)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            transform: "rotate(0deg)",
          }}
        >
          <IconButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M9.5999 16C9.5999 15.0667 9.9599 14.1334 10.6666 13.4267L19.3599 4.73336C19.7466 4.34669 20.3866 4.34669 20.7732 4.73336C21.1599 5.12003 21.1599 5.76003 20.7732 6.14669L12.0799 14.84C11.4399 15.48 11.4399 16.52 12.0799 17.16L20.7732 25.8534C21.1599 26.24 21.1599 26.88 20.7732 27.2667C20.3866 27.6534 19.7466 27.6534 19.3599 27.2667L10.6666 18.5734C9.9599 17.8667 9.5999 16.9334 9.5999 16Z"
                fill="#212121"
              />
            </svg>
          </IconButton>
        </Box>
        <Typography
          variant="h5"
          color="var(--Black, #212121)"
          sx={{ width: "200px", textAlign: "center" }}
        >
          Chat detail info
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatDetailInfoHeader;
