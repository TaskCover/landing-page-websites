import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import styles from "../styles/styles.module.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3699FF",
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
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer className={styles["notification__container"]} />
    </ThemeProvider>
  );
}

export default MyApp;
