import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderUseCase } from "../components/Header";
import { PartnerUseCase } from "../components/Partner";
import { BenefitUseCase } from "../components/Benerfits";
import { AccelerateUseCase } from "../components/Accelarate";
import { ChartUseCase } from "../components/Chart";
import { FunctionUseCase } from "../components/Function";
import { PlanUseCase } from "../components/Plan";
import { ResourceUseCase } from "../components/Resource";
import { HelperSendMail } from "components/sn-help-center/components/SendMail";
import { Text, TextGradient } from "components/shared";

const UseCaseMarketingAgency = () => {
  return (
    <Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: {
              md: "url(/images/bg-use-case-header.png)",
              xs: "url(/images/bg-use-case-header-mobile.png)",
            },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <Container>
          <HeaderUseCase
            title="TaskCover | Marketing Agency"
            headings={
              <Text
                component="div"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={600}
                my={4}
              >
                A game-Changing Platform for{" "}
                <TextGradient
                  component="span"
                  fontSize={{ md: 36, xs: 20 }}
                  fontWeight={600}
                  percentBlueColor={13.8}
                  percentGreenColor={135.38}
                >
                  Marketing Excellence
                </TextGradient>
              </Text>
            }
            content={`TaskCover streamlines and optimizes your marketing workflow with AI.
          An all-in-one tool for brainstorming, planning, and execution from
          idea to delivery. Maximize customer retention with billing and sales. `}
          />
        </Container>
        <PartnerUseCase />
        <Container>
          <BenefitUseCase
            data={DATA_BENEFIT}
            bannerUrl="/images/benefit-image.png"
            heading={
              <Text
                component="div"
                fontSize={{ md: 40, xs: 24 }}
                fontWeight={600}
              >
                <TextGradient
                  component="span"
                  fontSize={{ md: 40, xs: 24 }}
                  fontWeight={600}
                >
                  Benefits to{" "}
                </TextGradient>
                Marketing Agencies
              </Text>
            }
          />
        </Container>
      </Stack>

      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-use-case.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "250px",
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <Container>
          <AccelerateUseCase data={DATA_ACCELERATE} />
          <ChartUseCase />
          <FunctionUseCase />
          <PlanUseCase />
        </Container>
      </Stack>

      <Container>
        <ResourceUseCase />
        <Stack mt={10}>
          <HelperSendMail />
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(UseCaseMarketingAgency);

const DATA_BENEFIT = [
  {
    icon: "/images/benefit-ic-1.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Equipped with the latest{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          AI technology
        </TextGradient>
      </Text>
    ),
    content: "Use Chat-GPT 4.0 to accelerate workflow",
  },
  {
    icon: "/images/benefit-ic-2.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Enhance{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          project finance and customer relation
        </TextGradient>
      </Text>
    ),
    content: "Quickly optimize finance tasks in each project",
  },
  {
    icon: "/images/benefit-ic-3.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Smooth{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          management Top to bottom
        </TextGradient>
      </Text>
    ),
    content: "One platform for all agencies to boost productivity ",
  },
];

const DATA_ACCELERATE = [
  {
    imageUrl: "/images/accelerate-image.png",
    title: "TaskCover AI",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={600}
        my={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={600}
        >
          Create and accelerate campaigns{" "}
        </TextGradient>
        from start to end using AI
      </Text>
    ),
    content: `TaskCover AI agent generates content creation, campaign ideas, blogs,
      case studies, emails, and summarizes record meetings.`,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  },
];
