"use client";

import { memo, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "constant/paths";
import { useAppReady, useAuth } from "store/app/selectors";
import AppLoading from "components/AppLoading";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  const { isLoggedIn } = useAuth();
  const { appReady } = useAppReady();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return;
    replace(HOME_PATH);
  }, [isLoggedIn, replace]);

  if (!appReady || isLoggedIn) return <AppLoading />;

  return (
    <Stack
      flex={1}
      height={({ spacing }) => `calc(100vh - ${spacing(8 * 2)})`}
      m={8}
      direction="row"
      bgcolor="common.white"
    >
      {props.children}
    </Stack>
  );
};

export default memo(Wrapper);
