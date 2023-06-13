"use client";

import { memo } from "react";
import { Stack } from "@mui/material";
import Image from "next/image";
import AppLogo from "public/images/img-app-logo.webp";
import { Text } from "components/shared";
import Link from "components/Link";
import { SIGNUP_PATH } from "constant/paths";
import Form from "./Form";

const MainSection = () => {
  return (
    <Stack
      overflow="hidden"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Image src={AppLogo} alt="App logo" width={152} />

      <Stack
        flex={1}
        mt={6}
        alignItems="center"
        maxWidth={340}
        width="100%"
        overflow="auto"
      >
        <Text variant="h3">Signin</Text>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Text variant="body2">{`or you don't have an account yet?`}</Text>
          <Link
            href={SIGNUP_PATH}
            fontWeight={600}
            color="primary.main"
            underline="none"
          >
            Signup now
          </Link>
        </Stack>

        <Form />
      </Stack>
    </Stack>
  );
};

export default memo(MainSection);
