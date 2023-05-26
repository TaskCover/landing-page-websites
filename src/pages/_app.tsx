import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      />
    </>
  );
}

export default MyApp;
