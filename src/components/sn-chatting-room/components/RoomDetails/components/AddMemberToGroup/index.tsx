import { Avatar, Box, Button, Drawer, Typography } from "@mui/material";
import AddMemberHeader from "./AddMemberHeader";
import AddMemberItem from "./AddMemberItem";
import { UserInfo } from "store/app/reducer";
import { Employee } from "store/company/reducer";

interface AddMemberProps {
  isOpen: boolean;
  onClose?: () => void;
  items?: Employee[];
}

const AddMemberToGroup: React.FC<AddMemberProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const styleOpen = isOpen
    ? {
        width: "100%",
      }
    : {
        width: "0",
      };
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          height: "100%",
          boxSizing: "border-box",
          border: "none",
          ...styleOpen,
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          height: "100%",
          gap: "16px",
          position: "relative",
        }}
      >
        <AddMemberHeader onClose={onClose} />
        {items?.map((item) => (
          <AddMemberItem key={item.id} item={item} />
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            gap: "16px",
          }}
        >
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "48%", textTransform: "Capitalize" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "48%", textTransform: "Capitalize" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddMemberToGroup;
