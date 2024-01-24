import React, { memo } from "react";
import { Stack, Container } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import AgenciesImg from "public/images/about-us/img-agencies.png";
import AirBnbImg from "public/images/about-us/icon-airbnb.svg";
import StarYellowIcon from "public/images/about-us/icon-star-yellow.svg";

type AgenciesLayoutProps = {};

const AgenciesLayout = (props: AgenciesLayoutProps) => {
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
      <Stack
        sx={[
          sectionContainerSx,
          { p: { xs: "60px 16px", md: "100px 0px " } },
        ]}
      >
        <Text variant="h1" sx={[textHeadSx, {}]}>
          Agencies find TaskCover
        </Text>
        <Text
          variant="h1"
          sx={[
            textHeadSx,
            textGradientSx,
          ]}
        >
          to be a reliable and trusted partner
        </Text>

        <Stack direction="column" alignItems='center' mt={{ xs: "40px", md: "48px" }} display={{ xs: "flex", md: "grid" }} gridTemplateColumns="2fr 1fr">
          <Image src={AgenciesImg} style={{
            width: '100%',
            height: "auto"
          }} alt="image" />
          <Stack
            sx={{
              borderRadius: "24px",
              border: "1px solid #fff",
              background: "rgba(255, 255, 255, 0.60)",
              boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
              padding: { xs: "24px 27px", md: "80px 32px 90px" }
            }}
          >
            <Image src={AirBnbImg} style={{
              width: '161px',
              height: "auto",
              marginBottom: "24px"
            }} alt="image"
            />
            <Text variant="h5" fontWeight={400}>
              Thu May 23 2023 03 : 48 :12 GMT +7
            </Text>
            <Stack width="100%"
              gap="8px"
              justifyContent="center"
              alignItems="center"
              mt={{ xs: "24px", md: "40px" }}
              p={{ xs: " 12px 38px", md: "36px 51px" }}
              sx={{
                borderRadius: "8px",
                background: "linear-gradient(352deg, #6731EC 1.65%, #44CFFF 100%)",
              }}>
              <Stack direction="row" gap="8px" alignItems='center'>
                <Text variant="h2" color="#FFF500">
                  4.5
                </Text>
                <Image src={StarYellowIcon} style={{
                  width: '43px',
                  height: "auto",
                  marginBottom: "24px",
                }} alt="image"
                />
              </Stack>
              <Text variant="h5" color="#FFF500" lineHeight="24px">
                Satisfied numerous customers
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      </Container>
    </Stack>
  );
};

export default memo(AgenciesLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "60px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 700,
  textAlign: "center",
};

const textGradientSx = {
  background:
    "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}
