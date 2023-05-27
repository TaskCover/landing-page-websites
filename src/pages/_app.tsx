import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import styles from "../styles/styles.module.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer className={styles["notification__container"]} />
    </>
  );
}

export default MyApp;
