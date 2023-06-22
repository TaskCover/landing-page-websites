"use client";

import { Snackbar, Stack } from "@mui/material";
import AppLoading from "components/AppLoading";
import Header, { HEADER_HEIGHT } from "./Header";
import { memo, useEffect, useMemo } from "react";
import { Sidebar } from "./components";
import { useAppSelector } from "store/hooks";
import { shallowEqual } from "react-redux";
import { usePathname, useRouter } from "next-intl/client";
import {
  AUTHORIZED_PATHS,
  FORGOT_PASSWORD_PATH,
  HOME_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
} from "constant/paths";
import { Text } from "components/shared";
import { useParams } from "next/navigation";

type MainLayoutProps = {
  children: React.ReactNode;
};

const AUTH_PATHS = [SIGNUP_PATH, FORGOT_PASSWORD_PATH];

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const { push } = useRouter();
  const pathname = usePathname();
  const { id } = useParams();

  const { appReady, token, user } = useAppSelector(
    (state) => state.app,
    shallowEqual,
  );

  const isLoggedIn = useMemo(() => !!token, [token]);

  const isAuthorized = useMemo(() => {
    if (!user?.roles?.length) return false;
    return user.roles.some((role) => {
      const basePath = id ? pathname.replace(id, "{id}") : pathname;
      return AUTHORIZED_PATHS[role].includes(basePath);
    });
  }, [user?.roles, pathname, id]);

  useEffect(() => {
    if (isLoggedIn || AUTH_PATHS.includes(pathname)) return;

    push(SIGNIN_PATH);
  }, [isLoggedIn, push, pathname]);

  if (!appReady || !token || !user) return <AppLoading />;

  return (
    <>
      <Stack
        direction="row"
        width="100vw"
        height="100vh"
        flex={1}
        overflow="hidden"
      >
        <Sidebar />
        <Stack flex={1} width="100%" height="100%" overflow="hidden">
          <Header />
          <Stack p={{ xs: 1, sm: 3 }} overflow="auto" flex={1}>
            <Stack
              bgcolor={pathname === HOME_PATH ? "transparent" : "common.white"}
              flex={1}
              height="fit-content"
              spacing={3}
              justifyContent={isAuthorized ? undefined : "center"}
              alignItems={isAuthorized ? undefined : "center"}
            >
              {isAuthorized ? (
                children
              ) : (
                <Text variant="body2" fontWeight={600}>
                  Unauthorized
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Snackbar />
    </>
  );
};

export default memo(MainLayout);
