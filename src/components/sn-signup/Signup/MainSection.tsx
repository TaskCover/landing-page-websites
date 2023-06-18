"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import Image from "next/image";
import AppLogo from "public/images/img-app-logo.webp";
import { Text } from "components/shared";
import Link from "components/Link";
import { SIGNIN_PATH } from "constant/paths";
import Form from "./Form";

const MainSection = () => {
  return (
    <Stack
      overflow="hidden"
      flex={{ sm: 1 }}
      width="100%"
      maxHeight={({ spacing }) => ({
        xs: `calc(100vh - ${spacing(2 * 2)})`,
        sm: "100%",
      })}
      alignItems="center"
      m={{ xs: 2, sm: 0 }}
      justifyContent="center"
      bgcolor={{ xs: "rgba(255, 255, 255, 0.9)", sm: undefined }}
      boxShadow={{ xs: "0px 4px 12px rgba(0, 0, 0, 0.15)", sm: undefined }}
      borderRadius={{ xs: 2, sm: undefined }}
      py={{ xs: 2, sm: undefined }}
    >
      <Image src={AppLogo} alt="App logo" width={152} />

      <Stack
        flex={1}
        mt={{ xs: 3, sm: 6 }}
        alignItems="center"
        maxWidth={340}
        width="100%"
        overflow="hidden"
      >
        <Text variant="h3">Sign up</Text>
        <Stack mt={1} direction="row" alignItems="center" spacing={0.5}>
          <Text variant="body2">or already have an account?</Text>
          <Link
            href={SIGNIN_PATH}
            fontWeight={600}
            sx={{
              fontSize: 14,
              "&:hover": {
                color: "primary.dark",
              },
            }}
            color="primary.main"
            underline="none"
          >
            Sign in now
          </Link>
        </Stack>

        <Form />
      </Stack>
    </Stack>
  );
};

export default memo(MainSection);
