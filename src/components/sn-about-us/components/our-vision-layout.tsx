import React, { memo } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import OurVisionImg from "public/images/about-us/img-our-version.png";

type OurVisionLayoutProps = {};

const OurVisionLayout = (props: OurVisionLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      width="100%"
      sx={{
        background: "url(/images/about-us/bg-head.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Stack sx={[sectionContainerSx]}>
          <Stack
            width="100%"
            p={{ xs: "16px 40px", md: "64px" }}
            direction={{ xs: "column", md: "row" }}
            display={{ xs: "flex", md: "grid" }}
            gridTemplateColumns="3fr 2fr"
            gap="24px"
            sx={{
              borderRadius: "16px",
              background: "#3FC08A",
            }}
          >
            <Image
              src={OurVisionImg}
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="image"
            />
            <Stack gap="32px">
              <Text
                variant="h3"
                fontWeight={500}
                color="#fff"
                fontSize={{ xs: "24px", md: "40px" }}
                lineHeight={{ xs: "32px", md: "56px" }}
              >
                Our vision
              </Text>
              <Text
                variant="h4"
                fontWeight={400}
                color="#fff"
                fontSize={{ xs: "16px", md: "20px" }}
                lineHeight={{ xs: "24px", md: "32px" }}
              >
                Our mission is to provide efficient project management solutions
                for businesses in Vietnam. Committed to optimizing resources and
                ensuring project success, we leverage technology to deliver
                powerful and user-friendly tools. As a reliable partner, we
                accompany our clients in building and developing projects
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(OurVisionLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px", md: "100px 0px " },
};
