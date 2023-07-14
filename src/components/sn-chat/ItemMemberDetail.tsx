import Avatar from "components/Avatar";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ItemDetail from "./components/ItemDetail";

interface ItemMemberDetailProp {
  admin?: boolean;
}

const ItemMemberDetail = ({ admin }: ItemMemberDetailProp) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
    }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          // src={"avatar?.link"}
          alt="Avatar"
          size={32}
          style={{
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px"
          }}
        >
          <Typography variant="inherit" color="#212121" fontWeight={600} fontSize={14}>
            {"fullname"}
          </Typography>
          <Typography variant="caption" color="#666666" fontWeight={400} fontSize={12}>
            {"email"}
          </Typography>
        </Box>
      </Box>
      <Box>
        {admin ?
          <Avatar
            // src={"avatar?.link"}
            alt="Avatar"
            size={24}
            style={{
              borderRadius: "50%",
            }}
          />
          : ""}
      </Box>
    </Box>
  );
};

export default ItemMemberDetail;
