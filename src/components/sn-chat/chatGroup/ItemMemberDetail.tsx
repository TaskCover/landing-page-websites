import Avatar from "components/Avatar";
import { Box, Button, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ItemDetail from "../components/ItemDetail";
import MoreSquareIcon from "icons/MoreSquareIcon";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { IconButton } from "components/shared";

interface ItemMemberDetailProp {
  admin?: boolean;
}

const ItemMemberDetail = ({ admin }: ItemMemberDetailProp) => {
  const commonT = useTranslations(NS_COMMON);

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px"
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
          <Button
            variant="primary"
            sx={{
              background: "#ECECF3",
              fontSize: "0.75rem",
              fontWeight: 400,
            }}
            type="button"
            size="small"
          // pending={pending}
          >
            {commonT("form.admin")}
          </Button>
          :
          <IconButton noPadding size="normal">
            <MoreSquareIcon />
          </IconButton>
        }
      </Box>
    </Box >
  );
};

export default ItemMemberDetail;
