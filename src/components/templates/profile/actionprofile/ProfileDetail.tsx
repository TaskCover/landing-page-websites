import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import { ManageLayoutAtom } from "../../../atoms/LayoutAtom/ManageLayoutAtom";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useRouter } from "next/router";
import { apiUsersProfileDetailGet } from "../../../../utils/apis";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { useHandleError } from "../../../../utils/useHandleError";

const ProfileDetailTemplate: FunctionComponent = () => {
  const router = useRouter();

  const header = null;
  const params = null;

  const { getErrorMessage, handleError } = useHandleError();

  const [fullname, setFullname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //======================handle show password===================================================

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //=========================================================================

  const getDetailProfile = async (userId: string | null) => {
    try {
      const response = await apiUsersProfileDetailGet(userId, header, params);

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
      <ManageLayoutAtom
      // appbarContent={
      //   <Typography variant="h5" noWrap component="div">
      //     {"Quản lý dự án"}
      //   </Typography>
      // }
      >
        <Box component="div" sx={{ textAlign: "center", paddingTop: "3.2rem" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  Thông tin tài khoản
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{ width: "4.8rem", height: "4.8rem" }}
                  alt="Pham Huy Duy"
                  src="/static/images/avatar/1.jpg"
                />
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                alignItems="stretch"
                sx={{ fontSize: "1.6rem", margin: "1.2rem 0 1.2rem 0" }}
              >
                <Grid item sx={{ margin: "0 0.4rem 0 0" }}>
                  <BusinessCenterOutlinedIcon />
                </Grid>
                <Grid item sx={{ fontSize: "1.6rem" }}>
                  <Typography>Chức vụ: Trưởng phòng</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => router.push("/profile-detail/edit")}
                  variant="outlined"
                >
                  Chỉnh sửa tài khoản
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ marginTop: "1.6rem", padding: "0 20rem 0 20rem" }}
            >
              <Grid item md={12}>
                <TextField
                  fullWidth
                  sx={{ width: "100%" }}
                  id="outlined-name"
                  variant="standard"
                  disabled
                  defaultValue="Le Duc Hieu"
                  value={fullname}
                  label="Họ tên"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  sx={{ width: "100%" }}
                  id="outlined-phonenumber"
                  disabled
                  defaultValue="08757645"
                  value={phone}
                  variant="standard"
                  label="Số điện thoại"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  sx={{ width: "100%" }}
                  id="outlined-email"
                  disabled
                  value={email}
                  variant="standard"
                  defaultValue="lethaihieu@gmail.com@gmail.com"
                  label="Email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "400",
                    }}
                    shrink={true}
                    htmlFor="standard-adornment-password"
                  >
                    Mật khẩu
                  </InputLabel>
                  <Input
                    fullWidth
                    sx={{
                      width: "100%",
                      fontSize: "1.4rem",
                      fontWeight: "400",
                    }}
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    disabled
                    value={password}
                    defaultValue="123456"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ManageLayoutAtom>
    </React.Fragment>
  );
};

export default ProfileDetailTemplate;
