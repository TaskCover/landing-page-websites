"use client";

import { Snackbar, Stack } from "@mui/material";
import AppLoading from "components/AppLoading";
import Header, { HEADER_HEIGHT } from "./Header";
import { memo, useEffect, useMemo } from "react";
import { Sidebar } from "./components";
import { useAppSelector } from "store/hooks";
import { shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";
import { SIGNIN_PATH } from "constant/paths";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const { push } = useRouter();

  const { appReady, token, user } = useAppSelector(
    (state) => state.app,
    shallowEqual,
  );

  const isLoggedIn = useMemo(() => !!token, [token]);

  useEffect(() => {
    if (isLoggedIn) return;
    push(SIGNIN_PATH);
  }, [isLoggedIn, push]);

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
          {children}
        </Stack>
      </Stack>
      <Snackbar />
    </>
  );
};

export default memo(MainLayout);
