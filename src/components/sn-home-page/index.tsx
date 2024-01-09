"use client";
import React, { memo } from "react";
import { Box, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import WatchVideoIc from "public/images/home-page/icon-watch-video.svg";
import HeadBannerImg from "public/images/home-page/banner.svg";
import BgPowerfulAgent from "public/images/home-page/bg-powerful-agent-layout.png";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import VirtualAssistantImg from "public/images/home-page/img-virtual-assistant.svg";
import {
  ExploreLayoutTab,
  FullOptimizeItems,
  ManageProjectItems,
  PowerFullAgentTabs,
} from "./configs";
import TaskProjectIcon from "public/images/home-page/icon-task-project.svg";
import ArrowRightIcon from "public/images/home-page/arrow-right.svg";
import FullOptimizeImg from "public/images/home-page/img-fully-optimize.svg";
import ManagementProjectImg from "public/images/home-page/bg-manage-project.png";
import ExploreImg from "public/images/home-page/img-explore.png";
import Link from "components/Link";
import ArrowRightLineIc from "public/images/home-page/arrow-right-line.svg";

type HomePageProps = {};

const HomePage = (props: HomePageProps) => {
  return (
    <Stack overflow="hidden">
      <Stack width="100%" sx={{}}>
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
          <Text variant="h4" fontWeight={400} color="#111827" my="24px">
            Tackle all your problems collaboratively and pave the way for
            success.
          </Text>
          <Stack flexDirection="row" gap="24px" mb="24px">
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
      <Stack
        position="relative"
        sx={{
          background: `url(${BgPowerfulAgent})`,
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <Stack sx={sectionContainerSx}>
          <Text variant="h1" fontWeight={500}>
            AI - Powerful Agent
          </Text>
          <Stack mt="24px" mb="40px">
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
              background: "rgba(255, 255, 255, 0.90)",
              borderRadius: "16px",
            }}
          >
            {PowerFullAgentTabs.map((item, index) => (
              <Stack
                justifyContent="center"
                alignItems="center"
                gap="8px"
                width="100%"
                p="16px"
                sx={[item.isActive ? activeTabPowerfullSx : {}, {}]}
              >
                <Image src={item.img} width={40} height={40} alt="image" />
                <Text variant="h5" color={item.textColor}>
                  {item.label}
                </Text>
              </Stack>
            ))}
          </Stack>
          <Stack
            width="100%"
            mt="16px"
            alignItems="center"
            p={{ xs: "66px 16px 110px", sm: "66px 0px 110px" }}
            sx={{
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.90)",
              borderRadius: "16px",
              border: "1px solid #FFF",
              boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
              backdropFilter: "blur(1.5px)",
            }}
          >
            <Stack maxWidth="859px" width="100%" flexDirection="row" gap="80px">
              <Stack gap="24px">
                <Image
                  src={TaskProjectIcon}
                  width={56}
                  height={56}
                  alt="image"
                />
                <Text variant="h3" color="#E76A3D">
                  Task & Project
                </Text>
                <Stack gap="8px">
                  <Text variant="h5" fontWeight={400}>
                    Listing and organizing the sub-tasks and deadlines from a
                    simple provided outline.
                  </Text>{" "}
                  <Text variant="h5" fontWeight={400}>
                    Listing and organizing the sub-tasks and deadlines from a
                    simple provided outline.
                  </Text>
                </Stack>
                <Button
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    padding: "10px 16px",
                    background:
                      "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                  }}
                >
                  Explore more
                </Button>
              </Stack>
              <Stack gap="32px">
                <Image
                  src={VirtualAssistantImg}
                  width={315}
                  height={344}
                  alt="Powerful Agent background"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* <Image
            src={BgPowerfulAgent}
            width={"100%" as any}
            height={"auto" as any}
            alt="Powerful Agent background"
          /> */}
      </Stack>
      <Stack width="100%" sx={{}}>
        <Stack
          sx={sectionContainerSx}
          p={{ sx: "60px 16px 120px", sm: "60px 0px 120px" }}
        >
          <Stack flexDirection="row" gap="8px">
            <Text
              variant="h1"
              fontWeight={500}
              sx={{
                background:
                  "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Fully optimize
            </Text>
            <Text variant="h1" fontWeight={500}>
              your financial process
            </Text>
          </Stack>
          <Text variant="h4" fontWeight={400} color="#374151" mt="16px">
            Drive your agency growth by simplifying all sales, budget and
            billing tasks
          </Text>
          <Stack mt="24px" mb="40px">
            <Image src={ImgLinePage} width={178} height={4} alt="image line" />
          </Stack>
          <Button
            className="MuiButton-primary"
            sx={{ flexDirection: "row", gap: "8px" }}
          >
            Free 14-day trial
            <Image src={ArrowRightIcon} width={20} height={20} alt="image" />
          </Button>
          <Stack
            flexDirection="row"
            gap="24px"
            display="grid"
            mt="100px"
            gridTemplateColumns={"3fr 2fr"}
          >
            <Image src={FullOptimizeImg} alt="image line" />
            <Stack gap="16px">
              {FullOptimizeItems.map((item, index) => (
                <Stack
                  key={index}
                  p="20px"
                  gap="12px"
                  borderRadius="24px"
                  border="1px solid primary.contrastText"
                  boxShadow="0px 4px 40px 0px rgba(43, 89, 255, 0.08)"
                  bgcolor="rgba(255, 255, 255, 0.70)"
                >
                  <Stack flexDirection="row">
                    <Image src={item.icon} width={32} height={32} alt="image" />
                    <Text
                      variant="subtitle1"
                      fontWeight={700}
                      color={item.labelColor}
                    >
                      {item.label}
                    </Text>
                  </Stack>
                  <Text variant="body1" fontWeight={400} color="#4B5563">
                    {item.desc}
                  </Text>
                  <Link href={item.linkUrl}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Text variant="body1" fontWeight={400} color="#5C98F6">
                        Learn more
                      </Text>
                      <Image
                        src={ArrowRightLineIc}
                        width={20}
                        height={20}
                        alt="image"
                      />
                    </Stack>
                  </Link>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack width="100%" sx={{}}>
        <Stack
          sx={sectionContainerSx}
          p={{ sx: "60px 16px 250px", sm: "60px 0px 250px" }}
        >
          <Text variant="h1" fontWeight={500}>
            Manage the project effectively to
          </Text>
          <Stack flexDirection="row" gap="8px">
            <Text variant="h1" fontWeight={500}>
              achieve
            </Text>
            <Text
              variant="h1"
              fontWeight={500}
              sx={{
                background:
                  "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              the bottom line
            </Text>
          </Stack>
          <Text variant="h4" fontWeight={400} color="#374151" mt="16px">
            Help you to reach your goals through efficient project management
          </Text>
          <Stack mt="24px" mb="40px">
            <Image src={ImgLinePage} width={178} height={4} alt="image line" />
          </Stack>
          <Button
            className="MuiButton-primary"
            sx={{ flexDirection: "row", gap: "8px" }}
          >
            Free 14-day trial
            <Image src={ArrowRightIcon} width={20} height={20} alt="image" />
          </Button>
          <Stack flexDirection="row" gap="24px" mt="100px" position="relative">
            <Image src={ManagementProjectImg} width={1300} alt="image" />
            <Stack
              gap="16px"
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr"
              width="100%"
              sx={{
                position: "absolute",
                bottom: "-80px",
                left: 0,
              }}
            >
              {ManageProjectItems.map((item, index) => (
                <Stack
                  key={index}
                  p="20px"
                  gap="12px"
                  borderRadius="24px"
                  border="1px solid primary.contrastText"
                  boxShadow="0px 4px 40px 0px rgba(43, 89, 255, 0.08)"
                  bgcolor="rgba(255, 255, 255, 0.70)"
                  sx={{
                    backdropFilter: "blur(5px)",
                    border: "1px solid #0575E6",
                  }}
                >
                  <Stack flexDirection="row">
                    <Image src={item.icon} width={32} height={32} alt="image" />
                    <Text variant="subtitle1" fontWeight={700} color="#000">
                      {item.label}
                    </Text>
                  </Stack>
                  <Text variant="body1" fontWeight={400} color="#4B5563">
                    {item.desc}
                  </Text>
                  <Link href={item.linkUrl}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Text variant="body1" fontWeight={400} color="#5C98F6">
                        Learn more
                      </Text>
                      <Image
                        src={ArrowRightLineIc}
                        width={20}
                        height={20}
                        alt="image"
                      />
                    </Stack>
                  </Link>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack width="100%" sx={{}}>
        <Stack
          sx={sectionContainerSx}
          p={{ sx: "60px 16px 120px", sm: "60px 0px 120px" }}
        >
          <Stack flexDirection="row" gap="8px">
            <Text variant="h1" fontWeight={500}>
              Explore how we
            </Text>
            <Text
              variant="h1"
              fontWeight={500}
              sx={{
                background:
                  "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cover your Tasks
            </Text>
          </Stack>
          <Stack mt="24px" mb="80px">
            <Image src={ImgLinePage} width={178} height={4} alt="image line" />
          </Stack>
          <Stack width="100%" gap="24px">
            <Stack
              flexDirection="row"
              gap="16px"
              p="8px"
              borderRadius="40px"
              justifyContent="space-between"
              width="100%"
              sx={{
                border: "1px solid #fff",
                background:
                  "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
              }}
            >
              {ExploreLayoutTab.map((item, index) => (
                <Stack
                  key={index}
                  p="12px 20px"
                  borderRadius="30px"
                  justifyContent="center"
                  alignItems="center"
                  sx={[item.active ? activeTabExploreSx : {}]}
                  width="100%"
                >
                  <Text
                    variant="h6"
                    sx={item.active ? { color: "#5C98F6" } : { color: "#fff" }}
                  >
                    {item.label}
                  </Text>
                </Stack>
              ))}
            </Stack>
            <Stack
              display="grid"
              gridTemplateColumns="2fr 3fr"
              justifyContent="center"
              sx={{
                p: "50px 45px",
                border: "2px solid #FFF",
                backgroundColor: "#EFF5FE",
                borderRadius: "40px",
                boxShadow: "0px 0px 6.93px 0px rgba(170, 198, 245, 0.82)",
                gap: "60px",
              }}
            >
              <Stack gap="24px" justifyContent="start" alignItems="start" mt="16px">
                <Text
                  variant="body2"
                  fontWeight={400}
                  sx={{
                    background:
                      "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  MARKETING AGENCY
                </Text>
                <Text variant="h2" fontWeight={500}>
                  Effectively achieve <br />
                  project’s goals
                </Text>
                <Text
                  variant="body2"
                  fontWeight={400}
                  lineHeight="22px"
                  color="#4B5563"
                >
                  Enhance team coordination and workflow.
                  <br />
                  Time and resource optimization through task automation.
                  <br />
                  Ensure your progress’s quality with clients.
                </Text>
                <Button
                  className="MuiButton-primary"
                  sx={{ flexDirection: "row", gap: "8px", width: "120px" }}
                >
                  Explore more
                  <Image
                    src={ArrowRightIcon}
                    width={20}
                    height={20}
                    alt="image"
                  />
                </Button>
              </Stack>
              <Stack>
                <Image
                  src={ExploreImg}
                  width={0}
                  height={0}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="image"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack width="100%" sx={{}}>
        <Stack
          sx={sectionContainerSx}
          p={{ sx: "60px 16px 120px", sm: "60px 0px 120px" }}
        >
          <Text variant="h1" fontWeight={500}>
            TaskCover - A platform to
          </Text>
          <Stack flexDirection="row" gap="8px">
            <Text variant="h1" fontWeight={500}>
              empower
            </Text>
            <Text
              variant="h1"
              fontWeight={500}
              sx={{
                background:
                  "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your agency success
            </Text>
          </Stack>
          <Text variant="h4" fontWeight={400} color="#374151" mt="16px">
            We commit to deliver real results for agencies
          </Text>
          <Stack mt="24px" mb="40px">
            <Image src={ImgLinePage} width={178} height={4} alt="image line" />
          </Stack>
          <Button
            className="MuiButton-primary"
            sx={{ flexDirection: "row", gap: "8px" }}
          >
            Learn More About Us
            <Image src={ArrowRightIcon} width={20} height={20} alt="image" />
          </Button>
          <Stack flexDirection='row' >

          </Stack>
        </Stack>
      </Stack>
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
  zIndex: 10,
};

const textHeadSx = {
  lineHeight: { xs: "60px", sm: "72px" },
  fontSize: { xs: "48px", sm: "72px" },
  fontWeight: 700,
};

const btnGetStartedSx = {
  width: "163px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "40px",
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
};

const btnWatchVideoSx = {
  width: "163px",
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

const activeTabPowerfullSx = {
  borderRadius: "12px",
  border: "1px solid #0575E6",
  background: "rgba(255, 255, 255, 0.50)",
  boxShadow: "0px 0px 4px 0px rgba(0, 209, 255, 0.52)",
  backdropFilter: "blur(6px)",
};

const activeTabExploreSx = {
  background: "#fff",
  boxShadow: "0px 0px 2px 2px rgba(255, 255, 255, 0.60)",
};
