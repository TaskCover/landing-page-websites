import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import ImgHead1 from "public/images/about-us/img-head-1.png";
import ImgHead2 from "public/images/about-us/img-head-2.png";
import ImgHead3 from "public/images/about-us/img-head-3.png";
import ImgHead4 from "public/images/about-us/img-head-4.png";

type HeadLayoutProps = {};

const HeadLayout = (props: HeadLayoutProps) => {
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
      <Stack
        sx={[
          sectionContainerSx,
          { p: { xs: "60px 16px", md: "100px 0px " } },
        ]}
      >
        <Text variant="h1" sx={[textHeadSx, {}]}>
          TaskCover: People-Powered
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
          Business Innovation
        </Text>
        <Text
          variant="h4"
          fontWeight={400}
          color="#111827"
          mt="24px"
          fontSize={{ xs: "16px", md: "24px" }}
          sx={{ textAlign: "center" }}
        >
          Navigate through TaskCover's journey,{isMdSmaller && <br />} witnessing firsthand the evolution of{!isMdSmaller && <br />} cutting-{isMdSmaller && <br />}edge business solutions.
        </Text>
        {!isMdSmaller ?
          <Stack gap="8px" mt="100px" display="grid" gridTemplateColumns="1fr 1fr 1fr" >
            <Image
              src={ImgHead1}
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="image"
            />
            <Stack gap="8px" display="grid" gridTemplateRows="1fr 1fr">
              <Image
                src={ImgHead2}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="image"
              />
              <Image
                src={ImgHead3}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="image"
              />
            </Stack>
            <Image
              src={ImgHead4}
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="image"
            />
          </Stack> :
          <Stack gap="8px" mt="24px" display="grid" gridTemplateColumns="1fr 1fr">
            <Stack display="grid" gridTemplateRows="2fr 1fr" gap="8px">
              <Image
                src={ImgHead1}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="image"
              />
              <Image
                src={ImgHead2}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="image"
              />
            </Stack>
            <Stack display="grid" gridTemplateRows="1fr 2fr" gap="8px">
              <Image
                src={ImgHead3}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="image"
              />
              <Image
                src={ImgHead4}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="image"
              />
            </Stack>

          </Stack>}
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
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "80px" },
  fontSize: { xs: "24px", md: "64px" },
  fontWeight: 700,
  textAlign: "center",
};
