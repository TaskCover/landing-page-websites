import React, { memo, useState } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import { PowerFullAgentTabs } from "../configs";
import VirtualAssistantImg from "public/images/home-page/img-virtual-assistant.png";
import TaskProjectIcon from "public/images/home-page/icon-task-project.svg";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import useBreakpoint from "hooks/useBreakpoint";
type PowerfulAgentLayoutProps = {};

const PowerfulAgentLayout = (props: PowerfulAgentLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();
  const [activeTab, setActiveTab] = useState(PowerFullAgentTabs[0]);

  return (
    <Stack
      position="relative"
      sx={{
        // background: "url(/images/home-page/bg-head-page.png)",
        background: "url(/images/home-page/bg-powerful-agent-layout.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
      }}
      pt={{ md: 4, xs: 1 }}
    >
      <Container>
        <Stack sx={sectionContainerSx}>
          <Text
            variant={{ xs: "h4", md: "h2" }}
            fontSize={{ xs: "24px", md: "40px" }}
            lineHeight={{ xs: "32px", md: "48px" }}
            fontWeight={500}
            color="#fff"
          >
            AI - Powerful Agent
          </Text>
          <Stack mt={{ xs: "16px", md: "24px" }} mb="40px">
            <Image
              src={ImgLinePage}
              width={"176px" as any}
              height={"auto" as any}
              alt="image line"
            />
          </Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            p="8px"
            width="100%"
            sx={{
              overflow: { xs: "auto", md: "hidden" },
              background: "rgba(255, 255, 255, 0.90)",
              borderRadius: "16px",
            }}
          >
            {PowerFullAgentTabs.map((item, index) => (
              <Stack
                key={index}
                justifyContent="center"
                alignItems="center"
                gap="8px"
                width="100%"
                p="16px"
                sx={[
                  activeTab.id == index + 1 ? activeTabPowerfullSx : {},
                  {
                    transition: ".2s",
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(.9)",
                      transition: ".2s",
                    },
                  },
                ]}
                onClick={() => setActiveTab(PowerFullAgentTabs[index])}
              >
                <Image
                  src={item.img}
                  width={isMdSmaller ? 23 : 40}
                  height={isMdSmaller ? 23 : 0}
                  alt="image"
                />
                {!isMdSmaller && (
                  <Text
                    variant="h5"
                    color={item.textColor}
                    sx={item.isTextGradient ? textGradientSx : {}}
                  >
                    {item.label}
                  </Text>
                )}
              </Stack>
            ))}
          </Stack>
          <Stack
            width="100%"
            mt={{ xs: "8px", md: "16px" }}
            alignItems="center"
            p={{ xs: "24px 16px 16px", md: "60px 0px 110px" }}
            sx={{
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.90)",
              borderRadius: "16px",
              border: "1px solid #FFF",
              boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
              backdropFilter: "blur(1.5px)",
            }}
          >
            <Stack
              maxWidth="859px"
              width="100%"
              flexDirection={{ xs: "column", md: "row" }}
              gap={{ xs: "40px", md: "80px" }}
            >
              <Stack gap={{ xs: "16px", md: "24px" }}>
                <Image src={activeTab.img} width={56} height={56} alt="image" />
                <Text
                  variant="h3"
                  fontSize={{ xs: "20px", md: "24px" }}
                  fontWeight={700}
                  lineHeight="32px"
                  color={activeTab.textColor}
                  sx={activeTab.isTextGradient ? textGradientSx : {}}
                >
                  {activeTab.label}
                </Text>
                <Stack gap="8px">
                  {activeTab.desc.map((i) => (
                    <Text variant="h5" fontWeight={400} key={i}>
                      {i}
                    </Text>
                  ))}
                </Stack>
                <Button
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    padding: "10px 16px",
                    background:
                      "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                  }}
                  href={activeTab.href}
                >
                  Explore more
                </Button>
              </Stack>
              <Stack gap="32px" alignItems="center">
                <Image
                  src={VirtualAssistantImg}
                  width={278}
                  height={248}
                  alt="Powerful Agent background"
                />

                <Stack>
                  <Stack direction="row" alignItems="center" gap="8px">
                    <Text variant="h1" sx={textStrokeSx} color="#497AC5">
                      Virtual
                    </Text>
                    <Text variant="h1" sx={textStrokeSx} color="#0E9F66">
                      assistant
                    </Text>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap="8px">
                    <Text variant="h1" sx={textStrokeSx} color="#497AC5">
                      Real
                    </Text>
                    <Text variant="h1" sx={textStrokeSx} color="#0E9F66">
                      productivity
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      {/* <Image
            src={BgPowerfulAgent}
            width={"100%" as any}
            height={"auto" as any}
            alt="Powerful Agent background"
          /> */}
    </Stack>
  );
};

export default memo(PowerfulAgentLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "40px 0px 60px", md: "80px 0px 120px" },
  zIndex: 10,
};

const activeTabPowerfullSx = {
  borderRadius: "12px",
  border: "1px solid #0575E6",
  background: "rgba(255, 255, 255, 0.50)",
  boxShadow: "0px 0px 4px 0px rgba(0, 209, 255, 0.52)",
  backdropFilter: "blur(6px)",
};
const textGradientSx = {
  fontWeight: 500,
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const textStrokeSx = {
  textShadow: "2px 2px 2px #abdfe4",
  textAlign: "center",
  textTransform: "uppercase",
  fontSize: { xs: "16px", md: "24px" },
  lineHeight: "32px",
  letterSpacing: "3.84px",
  // WebkitTextStroke:"2px 0 0 #abdfe4",
  // textStroke:"2px 0 0 #abdfe4",
};
