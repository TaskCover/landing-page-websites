import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import OurValueImg from "public/images/about-us/img-our-value.png";

type OurValueLayoutProps = {};

const OurValueLayout = (props: OurValueLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      width="100%"
    >
      <Stack
        sx={[
          sectionContainerSx,
        ]}
      >
        <Stack
          width="100%"
          gap="16px"
          p={{ xs: "16px 40px", md: "64px" }}
          direction={{ xs: "column", md: "row" }}
          display={{ xs: "flex", md: "grid" }}
          gridTemplateColumns="2fr 3fr"
          sx={{
            borderRadius: "16px",
            background: "#0676E6",
          }}>
          <Stack gap="32px">
            <Text
              variant="h3"
              fontWeight={500}
              color="#fff"
              fontSize={{ xs: "24px", md: "40px" }}
              lineHeight={{ xs: "32px", md: "56px" }}
            >
              Our value
            </Text>
            <Text
              variant="h4"
              fontWeight={400}
              color="#fff"
              fontSize={{ xs: "16px", md: "20px" }}
              lineHeight={{ xs: "24px", md: "32px" }}
            >
              Our mission is to provide efficient project management solutions for businesses in Vietnam. Committed to optimizing resources and ensuring project success, we leverage technology to deliver powerful and user-friendly tools. As a reliable partner, we accompany our clients in building and developing projects
            </Text>
          </Stack>
          <Image src={OurValueImg} style={{
            width: '100%',
            height: "auto",
          }} alt="image" />
        </Stack>


      </Stack>
    </Stack>
  );
};

export default memo(OurValueLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px", md: "100px 0px " }
};
