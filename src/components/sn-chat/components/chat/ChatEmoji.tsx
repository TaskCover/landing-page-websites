import Popover from "@mui/material/Popover";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Box from "@mui/material/Box";
import ImojiImportIcon from "icons/ImojiImportIcon";

export interface Emoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}
interface ChatEmojiProps {
  onChange: (emoji: Emoji) => void;
}
const ChatEmoji = ({ onChange }: ChatEmojiProps) => {
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const handleOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box position="relative">
      <ImojiImportIcon
        sx={{
          fill: "transparent",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "none",
            paddingBottom: "1rem",
          },
        }}
      >
        <Box
          sx={{
            width: "352px",
            height: "435px",
            border: "1px solid #e7e7e738",
            borderRadius: "10px",
            display: "table",
          }}
        >
          <Picker data={data} onEmojiSelect={onChange} theme="light" />
        </Box>
      </Popover>
    </Box>
  );
};

export default ChatEmoji;
