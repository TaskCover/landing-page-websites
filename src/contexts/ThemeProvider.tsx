"use client";

import { typography, palette, breakpoints } from "public/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette,
  typography,
  breakpoints,
});

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
