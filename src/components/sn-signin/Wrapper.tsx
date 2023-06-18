"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "constant/paths";
import { useAppReady, useAuth } from "store/app/selectors";
import AppLoading from "components/AppLoading";
import useWindowSize from "hooks/useWindowSize";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  const { isLoggedIn } = useAuth();
  const { appReady } = useAppReady();
  const { replace } = useRouter();

  const { height } = useWindowSize();

  const isSmallHeight = useMemo(() => height && height < 768, [height]);

  useEffect(() => {
    if (!isLoggedIn) return;
    replace(HOME_PATH);
  }, [isLoggedIn, replace]);

  if (!appReady || isLoggedIn) return <AppLoading />;

  return (
    <Stack
      flex={1}
      mx={{ sm: 6, lg: 8 }}
      my={{ sm: isSmallHeight ? 3 : 6, lg: isSmallHeight ? 3 : 8 }}
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
        sm: `calc(100vh - ${spacing((isSmallHeight ? 3 : 6) * 2)})`,
        lg: `calc(100vh - ${spacing((isSmallHeight ? 3 : 8) * 2)})`,
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
