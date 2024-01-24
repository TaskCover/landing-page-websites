import React, { memo } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import { OutMissionList } from "../configs";

type OurMissionLayoutProps = {};

const OurMissionLayout = (props: OurMissionLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Container>
      <Stack width="100%">
        <Stack sx={[sectionContainerSx]}>
          <Stack
            width="100%"
            p={{ xs: "16px 40px", md: "25px 100px 50px" }}
            sx={{
              borderRadius: "16px",
              background:
                "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
            }}
          >
            <Text
              variant="h3"
              fontWeight={500}
              color="#fff"
              fontSize={{ xs: "24px", md: "40px" }}
              lineHeight={{ xs: "32px", md: "56px" }}
              sx={{
                textAlign: "center",
              }}
            >
              Our Mission
            </Text>
            <Stack
              mt={{ xs: "24px", md: "40px" }}
              direction="column"
              display={{ xs: "flex", md: "grid" }}
              gridTemplateColumns="1fr 1fr"
              gridTemplateRows="1fr 1fr"
              gap={{ xs: "24px", md: "16px" }}
            >
              {OutMissionList.map((e, i) => (
                <Stack
                  key={i}
                  p={{ xs: "24px 16px", md: "25px 28px" }}
                  gap="12px"
                  sx={{
                    border: "1px solid #fff",
                    background: "rgba(255, 255, 255, 0.10)",
                    borderRadius: "20px",
                    boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <Text
                    variant="h4"
                    fontWeight={700}
                    color="#fff"
                    fontSize={{ xs: "16px", md: "24px" }}
                    lineHeight={{ xs: "24px", md: "32px" }}
                  >
                    {e.title}
                  </Text>
                  <Text
                    variant="h4"
                    fontWeight={400}
                    color="#fff"
                    fontSize={{ xs: "14px", md: "16px" }}
                    lineHeight={{ xs: "20px", md: "24px" }}
                  >
                    {e.desc}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default memo(OurMissionLayout);

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
