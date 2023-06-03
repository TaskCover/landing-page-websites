import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import styles from "../styles/styles.module.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";
import { ModalContextMoleculeProvider } from "../components/molecules/ModalContextMolecule";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3699FF",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#666666",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h3: {
      fontWeight: 700,
      fontSize: "2.4rem",
      lineHeight: "30px",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.6rem",
      lineHeight: "20px",
      color: "#212121",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ModalContextMoleculeProvider>
        <Component {...pageProps} />
        <ToastContainer className={styles["notification__container"]} />
      </ModalContextMoleculeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
