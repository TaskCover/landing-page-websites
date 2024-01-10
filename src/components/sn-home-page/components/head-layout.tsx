import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import WatchVideoIc from "public/images/home-page/icon-watch-video.svg";
import HeadBannerImg from "public/images/home-page/banner.svg";

type HeadLayoutProps = {};

const HeadLayout = (props: HeadLayoutProps) => {
  return (
    <Stack
      width="100%"
      sx={{
        background: "url(/images/home-page/bg-head-page.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Stack
        sx={[
          sectionContainerSx,
          { p: { xs: "60px 16px 0px", md: "60px 0px 0px" } },
        ]}
      >
        <Stack flexDirection="row" gap="16px">
          <Text variant="h1" sx={[textHeadSx, {}]}>
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
          variant="h4"
          fontWeight={400}
          color="#111827"
          my="24px"
          fontSize={{ xs: "16px", md: "20px" }}
          sx={{ textAlign: "center" }}
        >
          Tackle all your problems collaboratively and pave the way for success.
        </Text>
        <Stack flexDirection="row" gap={{ xs: "16px", md: "24px" }} mb="24px">
          <Button sx={btnGetStartedSx}>Get started</Button>
          <Button sx={btnWatchVideoSx}>
            <Image src={WatchVideoIc} width={32} height={32} alt="Image" />
            Watch video
          </Button>
        </Stack>
        <Image
          src={HeadBannerImg}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="banner"
        />
      </Stack>
    </Stack>
  );
};

export default memo(HeadLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  zIndex: 10,
};

const textHeadSx = {
  lineHeight: { xs: "60px", md: "72px" },
  fontSize: { xs: "48px", md: "72px" },
  fontWeight: 700,
};

const btnGetStartedSx = {
  width: { xs: "140px", md: "163px" },
  px: 1,
  height: "40px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "40px",
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
};

const btnWatchVideoSx = {
  width: { xs: "140px", md: "163px" },
  height: "40px",
  flexDirection: "row",
  gap: "8px",
  px: "6px",
  py: "8px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "40px",
  border: "1px solid #5C98F6",
  color: "#5C98F6",
};
