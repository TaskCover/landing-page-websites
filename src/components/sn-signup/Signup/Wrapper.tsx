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
      m={{ sm: 3, lg: 4 }}
      direction="row"
      sx={{
        background: {
          xs: "url('/images/img-auth-banner.webp') no-repeat center center",
          sm: "none",
        },

        backgroundSize: { xs: "cover", sm: undefined },
      }}
      height={({ spacing }) => ({
        xs: "100vh",
        sm: `calc(100vh - ${spacing(3 * 2)})`,
        lg: `calc(100vh - ${spacing(4 * 2)})`,
      })}
      bgcolor={{ sm: "common.white" }}
      justifyContent={{ xs: "center", sm: "initial" }}
      alignItems={{ xs: "center", sm: "initial" }}
    >
      {props.children}
    </Stack>
  );
};

export default memo(Wrapper);
