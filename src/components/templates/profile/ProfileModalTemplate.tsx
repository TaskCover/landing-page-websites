import React, { FunctionComponent, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useRouter } from "next/router";
import { apiUsersProfileDetailGet } from "../../../utils/apis";
import { showErrorNotify } from "../../molecules/NotificationMolecule";
import { useHandleError } from "../../../utils/useHandleError";

// const useIconStyles = makeStyles({
//   customIconChangePassword: {
//     transform: "rotate(65deg)",
//   },
// });

export const ProfileModalTemplate: FunctionComponent = () => {
  return (
    <Box>
      <Grid container direction="row" alignItems="center">
        <Avatar
          sx={{ width: 24, height: 24 }}
          alt="Pham Huy Duy"
          src="/static/images/avatar/1.jpg"
        />

        <TypographyMenu />
      </Grid>
    </Box>
  );
};

export const TypographyMenu: FunctionComponent = () => {
  // const iconClasses = useIconStyles();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //=========================================================================

  const header = null;
  const params = null;

  const { getErrorMessage, handleError } = useHandleError();

  const [fullname, setFullname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const getDetailProfile = async (userId: string | null) => {
    try {
      const response = await apiUsersProfileDetailGet(userId, header, params);

      // console.log("show ", response);

      setFullname(response.fullname);
      setPhone(response.phone);
      setEmail(response.email);
      // setPassword(response.fullname);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };

  useEffect(() => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    getDetailProfile(userId);
  }, []);

  //=========================================================================

  return (
    <React.Fragment>
      <IconButton
        aria-label="show"
        color="primary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ExpandMoreIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          width: "21.6rem",
          height: "23.1rem",
          padding: "0 1.6rem 0 1.6rem",
        }}
      >
        <Box>
          <Grid container direction={"row"}>
            <Grid item lg={4} sx={{ margin: "0 -0.2rem 0 0.2rem" }}>
              <Avatar alt="Pham Huy Duy" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item container direction={"column"} lg={6}>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "9rem",
                }}
              >
                {fullname}
              </Typography>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "9rem",
                }}
              >
                {"ADMIN"}
              </Typography>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "9rem",
                }}
              >
                {email}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <MenuList sx={{ borderTop: "0.3px solid lightgray" }}>
          <MenuItem
            onClick={() => {
              router.push("/profile-detail");
            }}
          >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Thông tin tài khoản</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/profile-detail/change-password");
            }}
          >
            <ListItemIcon
            //  className={iconClasses.customIconChangePassword}
            >
              <VpnKeyOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Đổi mật khẩu</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/login");
            }}
          >
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Đăng xuất
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
};
