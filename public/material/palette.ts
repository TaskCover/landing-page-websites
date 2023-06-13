import { PaletteOptions } from "@mui/material";

// Create a theme instance.
const palette: PaletteOptions = {
  mode: "light",
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  primary: {
    main: "#3699FF", // OK
    light: "#E1F0FF", // OK
    dark: "#187DE4", // OK
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#1BC5BD", // OK
    light: "#C9F7F5", // OK
    dark: "#0BB7AF", // OK
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#F64E60", // OK
    light: "#FFE2E5", // OK
    dark: "#EE2D41", // OK
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFA800", // OK
    light: "#FFF4DE", // OK
    dark: "#EE9D01", // OK
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#29B6F6",
    light: "#4FC3F7",
    dark: "#0288d1",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#66BB6A",
    light: "#81C784",
    dark: "#388E3C",
    contrastText: "#FFFFFF",
  },
  grey: {
    50: "#F7F7FD", // OK
    100: "#ECECF3", // OK
    200: "#ECF0F3",
    300: "#999999", // OK
    400: "#666666", // OK
    500: "#B5B5C3",
    600: "#80808F",
    700: "#464E5F",
    800: "#1B283F",
    900: "#212121", // OK
    A100: "#F5F5F5",
    A200: "#BABCC6",
    A400: "#BDBDBD",
    A700: "#616161",
  },
  text: {
    primary: "#212121", // OK
    secondary: "rgba(0, 0, 0, .06)",
    disabled: "rgba(0, 0, 0, .38)",
  },
  divider: "rgba(0, 0, 0, .12)",
  background: {
    paper: "#FFFFFF",
    default: "#FFFFFF",
  },
};

export default palette;
