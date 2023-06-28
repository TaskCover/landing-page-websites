"use client";

import { typography, breakpoints } from "public/material";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import colorSchemes from "utils/colorSchemes";
import { DEFAULT_MODE } from "constant/index";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const theme = extendTheme({
  colorSchemes,
  typography,
  breakpoints,
});

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  getInitColorSchemeScript({
    defaultMode: DEFAULT_MODE,
    modeStorageKey: "app_mode",
  });
  return (
    <CssVarsProvider theme={theme} defaultMode={DEFAULT_MODE}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

export default ThemeProvider;
