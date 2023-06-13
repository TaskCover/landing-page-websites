"use client";

import { store } from "store/configureStore";
import { Provider } from "react-redux";
import ThemeProvider from "./ThemeProvider";
import { useEffect, useRef } from "react";
import { clientStorage } from "utils/storage";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  USER_INFO_STORAGE_KEY,
} from "constant/index";
import { usePathname, useRouter } from "next/navigation";
import {
  SIGNIN_PATH,
  SIGNUP_PATH,
  FORGOT_PASSWORD_PATH,
  RESET_PASSWORD_PATH,
} from "constant/paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { updateAuth, toggleAppReady, UserInfo } from "store/app/reducer";
import Snackbar from "components/Snackbar";
import AppLoading from "components/AppLoading";
import { useAppSelector } from "store/hooks";

const AUTH_PATHS = [SIGNUP_PATH, FORGOT_PASSWORD_PATH, RESET_PASSWORD_PATH];

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { replace } = useRouter();

  const pathname = usePathname();

  const replaceRef = useRef<AppRouterInstance["replace"] | undefined>();

  useEffect(() => {
    replaceRef.current = replace;
  }, [replace]);

  useEffect(() => {
    const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
    const user = clientStorage.get(USER_INFO_STORAGE_KEY) as
      | UserInfo
      | undefined
      | null;

    const isResetPath = pathname.startsWith(RESET_PASSWORD_PATH);

    if (
      (!accessToken || !user) &&
      replaceRef.current &&
      !AUTH_PATHS.includes(pathname) &&
      !isResetPath
    ) {
      replaceRef.current(SIGNIN_PATH);
    }

    store.dispatch(updateAuth({ accessToken, user }));
    store.dispatch(toggleAppReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <AuthWrapper>{children}</AuthWrapper>
      </Provider>
    </ThemeProvider>
  );
};

export default AppProvider;

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const appReady = useAppSelector((state) => state.app.appReady);

  if (!appReady) return <AppLoading />;

  return (
    <>
      {children}
      <Snackbar />
    </>
  );
};
