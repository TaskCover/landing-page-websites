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
      flex={{ sm: 1 }}
      width="100%"
      height="fit-content"
      alignItems="center"
      m={{ xs: 2, sm: 0 }}
      justifyContent="center"
      bgcolor={{ xs: "common.white", sm: undefined }}
      py={{ xs: 2, sm: undefined }}
    >
      <Image src={AppLogo} alt="App logo" width={152} />

      <Stack
        flex={1}
        mt={{ xs: 3, sm: 6 }}
        alignItems="center"
        maxWidth={340}
        width="100%"
        overflow="auto"
      >
        <Text variant="h3">Đăng nhập</Text>
        <Stack mt={1} direction="row" alignItems="center" spacing={0.5}>
          <Text variant="body2">hoặc bạn chưa có tài khoản?</Text>
          <Link
            href={SIGNUP_PATH}
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
            Đăng ký ngay
          </Link>
        </Stack>

        <Form />
      </Stack>
    </Stack>
  );
};

export default memo(MainSection);
