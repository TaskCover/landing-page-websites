import React, { memo } from "react";
import { Stack, Container } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import { StatsList } from "../configs";
import StarOrangeIc from "public/images/about-us/icon-star-orange.svg";
type StatsLayoutProps = {};

const StatsLayout = (props: StatsLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      width="100%"
      sx={{
        background: "rgba(255, 255, 255, 0.30)",
        boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
      }}
    >
      <Container>
        <Stack sx={[sectionContainerSx]}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            py="56px"
            gap={isMdSmaller ? "32px" : "auto"}
            width="100%"
          >
            {StatsList.map((e, i) => (
              <Stack
                gap="4px"
                key={i}
                maxWidth={{ xs: "150px", md: "187px" }}
                justifyContent="start"
                height="100%"
              >
                <Stack
                  gap={e.isStarIcon ? "8px" : "0"}
                  direction="row"
                  justifyContent="center"
                >
                  <Text
                    variant="h1"
                    sx={{
                      color: e.textColorTitle,
                      fontSize: { xs: "48px", md: "60px" },
                      lignHeight: { xs: "60px", md: "72px" },
                      textAlign: "center",
                    }}
                  >
                    {e.title}
                  </Text>
                  <Image
                    src={StarOrangeIc}
                    width={0}
                    height={0}
                    style={{
                      display: e.isStarIcon ? "flex" : "none",
                      width: "43px",
                      height: "60px",
                    }}
                    alt="image"
                  />
                </Stack>
                <Text
                  variant="h5"
                  sx={{
                    color: "#000",
                    fontSize: { xs: "14px", md: "16px" },
                    lignHeight: { xs: "20px", md: "24px" },
                    textAlign: "center",
                    maxHeight: "3em",
                    overflow: "hidden",
                  }}
                >
                  {e.desc}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(StatsLayout);

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
  lineHeight: { xs: "32px", md: "80px" },
  fontSize: { xs: "24px", md: "64px" },
  fontWeight: 700,
  textAlign: "center",
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
