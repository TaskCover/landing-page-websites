import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import { TaskCoverFamilys } from "../configs";
import FamilyTeam1 from "public/images/about-us/img-family-1.png";

type FamilysLayoutProps = {};

const FamilysLayout = (props: FamilysLayoutProps) => {
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
        <Stack direction="row" gap="8px" alignItems='center'>
          <Text
            variant="h1"
            sx={[
              textHeadSx,
              textGradientSx,
            ]}
          >
            TaskCover
          </Text>
          <Text variant="h1" sx={[textHeadSx, {}]}>
            family
          </Text>
        </Stack>
        {!isMdSmaller ? <Stack display="grid" gridTemplateColumns="1fr 1fr 1fr" mt={{ xs: "40px", md: "56px" }}>
          {TaskCoverFamilys.map((e, i) => (
            <Stack position="relative" key={i}>
              <Image
                src={e.imgUrl}
                style={{
                  width: "100%",
                  height: "auto",
                }} alt="image"
              />
              <Stack
                position="absolute"
                pb="24px"
                sx={{
                  bottom: 10,
                  left: 0,
                  width: "100%",
                  "&:hover": {

                  }
                }}>
                <Text
                  variant="h3"
                  sx={{
                    fontSize: "24px",
                    color: "#fff",
                    textAlign: "center"
                  }}
                >
                  {e.title}
                </Text>

              </Stack>
              {/* <Stack
                position="absolute"
                width="100%"
                height="100%"
                pb="24px"
                sx={{
                  bottom: 0,
                  left: 0,
                  "&:hover": {
                    cursor: "pointer",
                    zIndex: -1,
                  }
                }}>
                <Text
                  variant="h4"
                  sx={{
                    fontSize: "20px",
                    lightHeight: "32px",
                    color: "#fff",
                    background: "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)",
                  }}
                >
                  {e.desc}
                </Text>
              </Stack> */}
            </Stack>
          ))}
        </Stack>
          :
          <Image
            src={FamilyTeam1}
            style={{
              width: "100%",
              height: "auto",
            }} alt="image"
          />
        }
      </Stack>
    </Stack >
  );
};

export default memo(FamilysLayout);

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

const textHeadSx = {
  lineHeight: { xs: "32px", md: "48px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 500,
  textAlign: "center",
};

const textGradientSx = {
  background:
    "linear-gradient(90deg, #0575E6 5.8%, #38E27B 151.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}