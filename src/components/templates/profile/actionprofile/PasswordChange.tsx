import React, { FunctionComponent } from "react";

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
import { apiAuthUpdatePasswordPostPost } from "../../../../utils/apis";
import { useHandleError } from "../../../../utils/useHandleError";
import { showErrorNotify } from "../../../molecules/NotificationMolecule";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const PasswordChangeTemplate: FunctionComponent = () => {
  const router = useRouter();

  const header = null;

  const { register, handleSubmit, setValue } = useForm<any>();
  const { getErrorMessage, handleError } = useHandleError();

  const onSubmit = async (data: any) => {
    try {
      await apiAuthUpdatePasswordPostPost(data, header);
      router.push("/login");
    } catch (e: any) {
      showErrorNotify(e?.response?.data?.description);
      handleError(e);
    }
  };

  //======================handle show password===================================================

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    Thay đổi mật khẩu
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{ margin: "-2rem 0 2rem 0", padding: "0 24rem 0 24rem" }}
              >
                <Grid item md={12}>
                  <FormControl
                    required
                    variant="standard"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel
                      sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      shrink={true}
                      htmlFor="standard-adornment-password"
                    >
                      Mật khẩu
                    </InputLabel>
                    <Input
                      fullWidth
                      {...register("old_password")}
                      sx={{
                        width: "100%",
                        fontSize: "1.4rem",
                        fontWeight: "400",
                      }}
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      required
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
                <Grid item md={12}>
                  <FormControl
                    required
                    variant="standard"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel
                      sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      shrink={true}
                      htmlFor="standard-adornment-password"
                    >
                      Mật khẩu mới
                    </InputLabel>
                    <Input
                      sx={{
                        width: "100%",
                        fontSize: "1.4rem",
                        fontWeight: "400",
                      }}
                      {...register("new_password")}
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      required
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
                <Grid item md={12}>
                  <FormControl
                    required
                    variant="standard"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel
                      sx={{ fontSize: "1.2rem", fontWeight: "400" }}
                      shrink={true}
                      htmlFor="standard-adornment-password"
                    >
                      Nhập lại mật khẩu
                    </InputLabel>
                    <Input
                      sx={{
                        width: "100%",
                        fontSize: "1.4rem",
                        fontWeight: "400",
                      }}
                      {...register("repeat_new_password")}
                      id="standard-adornment-password"
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
            </Grid>

            <Grid item spacing={3}>
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
        </Box>
      </ManageLayoutAtom>
    </React.Fragment>
  );
};

export default PasswordChangeTemplate;
