"use client";

import { Snackbar, Stack } from "@mui/material";
import { memo } from "react";
import Footer from "./Footer";
import Header from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};


const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Stack
        direction="row"
        width="100vw"
        height="calc(var(--vh, 1vh) * 100)"
        flex={1}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* <Sidebar /> */}
        <Stack width="100%" height="100%" position="relative">
          <Stack
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 99,
            }}
          >
            <Header />
          </Stack>
          <Stack spacing={{ xs: 1.5, sm: 3 }}>{children}</Stack>
          <Footer />
        </Stack>
      </Stack>
      <Snackbar />
      {/* {!isChatting ? <ChatListTemp /> : null} */}
    </>
  );
};

export default memo(MainLayout);
