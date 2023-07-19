import Avatar from "components/Avatar";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ItemDetail from "../components/ItemDetail";
import MoreSquareIcon from "icons/MoreSquareIcon";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { IconButton } from "components/shared";
import { useState } from "react";

interface ItemMemberDetailProp {
  admin?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  callbackAddAdmin?: () => void;
  callbackRemove?: () => void;
  onClick?: () => void;
}

const ItemMemberDetail = ({
  admin,
  data,
  callbackAddAdmin,
  callbackRemove,
  onClick,
}: ItemMemberDetailProp) => {
  const commonT = useTranslations(NS_COMMON);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickMenu = (action: "addAdmin" | "remove") => {
    setAnchorEl(null);
    if (action === "addAdmin" && callbackAddAdmin) callbackAddAdmin();
    if (action === "remove" && callbackRemove) callbackRemove();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <Avatar
          alt="Avatar"
          size={32}
          src={data?.avatar}
          style={{
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <Typography
            variant="inherit"
            color="#212121"
            fontWeight={600}
            fontSize={14}
          >
            {data?.fullname}
          </Typography>
          <Typography
            variant="caption"
            color="#666666"
            fontWeight={400}
            fontSize={12}
          >
            {`${data?.username}@`}
          </Typography>
        </Box>
      </Box>
      <Box>
        {data?.roles?.includes("owner") ? (
          <Button
            variant="primary"
            sx={{
              background: "#ECECF3",
              fontSize: "0.75rem",
              fontWeight: 400,
            }}
            type="button"
            size="small"
          >
            {commonT("form.admin")}
          </Button>
        ) : (
          <>
            <IconButton noPadding size="normal">
              <MoreSquareIcon onClick={handleClick} />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {true ? (
                <>
                  <MenuItem onClick={() => handleClickMenu("addAdmin")}>
                    Add as admin
                  </MenuItem>
                  <MenuItem onClick={() => handleClickMenu("remove")}>
                    Remove from chat{" "}
                  </MenuItem>
                </>
              ) : (
                <></>
              )}
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ItemMemberDetail;
