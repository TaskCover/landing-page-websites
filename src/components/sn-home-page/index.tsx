"use client";
import React, { memo } from "react";
import { Box, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import WatchVideoIc from "public/images/home-page/icon-watch-video.svg";
import HeadBannerImg from "public/images/home-page/banner.svg";
import BgPowerfulAgent from "public/images/home-page/bg-powerful-agent-layout.png";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import { PowerFullAgentTabs } from "./configs";

type HomePageProps = {};

const HomePage = (props: HomePageProps) => {
  return (
    <Stack>
      <Stack width="100%" sx={{ background: "gray" }}>
        <Stack
          sx={sectionContainerSx}
          p={{ sx: "60px 16px 120px", sm: "60px 0px 120px" }}
        >
          <Stack flexDirection="row" gap="16px">
            <Text variant="h1" sx={textHeadSx}>
              Your
            </Text>
            <Text
              variant="h1"
              sx={[
                textHeadSx,
                {
                  background:
                    "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              ]}
            >
              Problem
            </Text>
          </Stack>
          <Stack flexDirection="row" gap="16px">
            <Text variant="h1" sx={textHeadSx}>
              Our{" "}
            </Text>
            <Text
              variant="h1"
              sx={[
                textHeadSx,
                {
                  background:
                    "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              ]}
            >
              Pros
            </Text>
          </Stack>
          <Text
            variant="h3"
            fontSize="20px"
            fontWeight={400}
            lineHeight="32px"
            color="#111827"
            my="24px"
          >
            Tackle all your problems collaboratively and pave the way for
            success.
          </Text>
          <Stack flexDirection="row" gap="24px">
            <Button sx={btnGetStartedSx}>Get started</Button>
            <Button sx={btnWatchVideoSx}>
              <Image src={WatchVideoIc} width={32} height={32} alt="Image" />
              Watch video
            </Button>
          </Stack>
          <Image
            src={HeadBannerImg}
            width={"100%" as any}
            height={"auto" as any}
            alt="banner"
          />
        </Stack>
      </Stack>
      <Box width="100%" position="relative" sx={{}}>
        <Stack sx={sectionContainerSx}>
          <Text>AI - Powerful Agent</Text>
          <Image
            src={ImgLinePage}
            width={"176px" as any}
            height={"auto" as any}
            alt="image line"
          />

          <Stack>
            {PowerFullAgentTabs.map((item, index) => (
              <Stack>{}</Stack>
            ))}
          </Stack>
        </Stack>
        <Stack sx={{ position: "absolute", top: 0, left: 0 }}>
          <Image
            src={BgPowerfulAgent}
            width={"100%" as any}
            height={"auto" as any}
            alt="Powerful Agent background"
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default memo(HomePage);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "60px 16px 120px", sm: "60px 0px 120px" },
};

const textHeadSx = {
  lineHeight: { xs: "60px", sm: "72px" },
  fontSize: { xs: "48px", sm: "72px" },
  fontWeight: 700,
};

const btnGetStartedSx = {
  padding: "12px 40px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "24px",
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
};

const btnWatchVideoSx = {
  flexDirection: "row",
  gap: "8px",
  px: "16px",
  py: "8px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "24px",
  border: "1px solid #5C98F6",
};
