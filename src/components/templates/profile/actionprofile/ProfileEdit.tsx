import React, { FunctionComponent, useEffect, useState } from "react";

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

import { useForm } from "react-hook-form";
import { useHandleError } from "../../../../utils/useHandleError";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { useRouter } from "next/router";
import {
  apiUsersProfileDetailGet,
  apiUsersProfileEditPut,
} from "../../../../utils/apis";

const ProfileEditTemplate: FunctionComponent = () => {
  const router = useRouter();

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  const header = null;
  const params = null;

  const { register, handleSubmit, setValue } = useForm<any>();
  const { getErrorMessage, handleError } = useHandleError();

  const onSubmit = async (data: any) => {
    try {
      await apiUsersProfileEditPut(data, userId, header);
      router.push("/login");
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };

  //======================handle show password===================================================

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //=========================================================================

  const getDetailProfile = async () => {
    try {
      const response = await apiUsersProfileDetailGet(userId, header, params);

      setValue("fullname", response.fullname);
      setValue("phone", response.phone);
      setValue("email", response.email);
      // setPassword(response.fullname);
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };

  useEffect(() => {
    getDetailProfile();
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
                <Typography
                  gutterBottom
                  sx={{ fontSize: "2rem", fontWeight: "700" }}
                >
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
              {/* <Grid item>
                <Button variant="outlined">Chỉnh sửa tài khoản</Button>
              </Grid> */}
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={2}
                sx={{ margin: "-2rem 0 2rem 0", padding: "0 20rem 0 20rem" }}
              >
                <Grid item md={12}>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-fullname"
                    variant="standard"
                    label="Họ tên"
                    {...register("fullname")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-phone"
                    variant="standard"
                    label="Số điện thoại"
                    {...register("phone")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    sx={{ width: "100%", fontSize: "1.4rem" }}
                    id="outlined-email"
                    variant="standard"
                    label="Email"
                    {...register("email")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      shrink={true}
                      htmlFor="standard-password"
                    >
                      Mật khẩu
                    </InputLabel>
                    <Input
                      sx={{
                        width: "100%",
                        fontSize: "1.4rem",
                        fontWeight: "400",
                      }}
                      {...register("password")}
                      id="standard-password"
                      type={showPassword ? "text" : "password"}
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

              <Grid item>
                <Button
                  sx={{
                    width: "12rem",
                    height: "3rem",
                    margin: "0 1.2rem 0 1.2rem",
                  }}
                  variant="outlined"
                >
                  Hủy
                </Button>
                <Button
                  sx={{
                    width: "12rem",
                    height: "3rem",
                    margin: "0 1.2rem 0 1.2rem",
                  }}
                  variant="contained"
                  type={"submit"}
                >
                  Thêm mới
                </Button>
              </Grid>
            </form>
          </Grid>
        </Box>
      </ManageLayoutAtom>
    </React.Fragment>
  );
};

export default ProfileEditTemplate;
