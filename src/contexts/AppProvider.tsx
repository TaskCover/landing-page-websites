"use client";

import Snackbar from "components/Snackbar";
import { Locale } from "constant/types";
import { AbstractIntlMessages } from "next-intl";
import { useRouter } from "next-intl/client";
import { useCallback, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "store/configureStore";
import { useAppSelector } from "store/hooks";
import NextIntlProvider from "./NextIntlProvider";
import ThemeProvider from "./ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { QueryClient, QueryClientProvider } from "react-query";

const AppProvider = ({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
}) => {
  const { replace } = useRouter();

  const replaceRef = useRef<AppRouterInstance["replace"] | undefined>();

  useEffect(() => {
    replaceRef.current = replace;
  }, [replace]);

  const onSetViewHeight = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    onSetViewHeight();

    window.addEventListener("resize", () => {
      onSetViewHeight();
    });
  }, [onSetViewHeight]);

  const queryClient: QueryClient = new QueryClient();

  return (
    <NextIntlProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <AuthWrapper>{children}</AuthWrapper>
            </Provider>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </NextIntlProvider>
  );
};

export default AppProvider;

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Snackbar />
    </>
  );
};
