import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderUseCase } from "../Header";
import { PartnerUseCase } from "../Partner";
import { BenefitUseCase } from "../Benerfits";
import { AccelerateUseCase } from "../Accelarate";
import { ChartUseCase } from "../Chart";
import { FunctionUseCase } from "../Function";
import { PlanUseCase } from "../Plan";
import { ResourceUseCase } from "../Resource";
import { HelperSendMail } from "components/sn-help-center/components/SendMail";
import { Text, TextGradient } from "components/shared";

const UseCaseMarketingAgency = () => {
  return (
    <Stack position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/trust-center-bg.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "2210/1503",
          position: "absolute",
          top: 0,
          right: { md: "-50px", xs: 0 },
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
              fontWeight={500}
              my={4}
            >
              A game-Changing Platform for{" "}
              <TextGradient
                component="span"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={500}
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
              fontWeight={500}
            >
              <TextGradient
                component="span"
                fontSize={{ md: 40, xs: 24 }}
                fontWeight={500}
              >
                Benefits to{" "}
              </TextGradient>
              Marketing Agencies
            </Text>
          }
        />
        <AccelerateUseCase data={DATA_ACCELERATE} />
        <ChartUseCase />
        <FunctionUseCase />
        <PlanUseCase />
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
        fontWeight={500}
        my={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={500}
        >
          Create and accelerate campaigns{" "}
        </TextGradient>
        from start to end using AI
      </Text>
    ),
    content: `TaskCover AI agent generates content creation, campaign ideas, blogs,
      case studies, emails, and summarizes record meetings.`,
  },
];