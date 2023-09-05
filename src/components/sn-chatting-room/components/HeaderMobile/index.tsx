"use client";

import React from "react";
import { Box } from "@mui/material";
import { Text } from "components/shared";

interface Props {
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  title?: string;
}

const HeaderMobile: React.FC<Props> = ({ children, prefix, suffix, title }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#3699FF",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {prefix}
          <Text
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
              ...(prefix && { marginLeft: "24px" }),
            }}
          >
            {title}
          </Text>
        </Box>

        {suffix}
      </Box>

      {children}
    </>
  );
};

export default HeaderMobile;
