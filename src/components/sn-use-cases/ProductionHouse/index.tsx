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
import { ResultUseCase } from "../components/Result";

const UseCaseProductionHouse = () => {
  return (
    <Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: {md: "url(/images/trust-center-bg.webp)", xs: "url(/images/bg-use-case-mobile.png)"},
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
            title="TaskCover | Production House"
            headings={
              <Text
                component="div"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={600}
                my={4}
              >
                A supportive companion for{" "}
                <TextGradient
                  component="span"
                  fontSize={{ md: 36, xs: 20 }}
                  fontWeight={600}
                >
                  Viral Production
                </TextGradient>
              </Text>
            }
            content={`TaskCover efficiently structures each project and production process, providing a user-friendly interface for tracking and monitoring progress. `}
          />
        </Container>
        <PartnerUseCase />
        <Container>
          <BenefitUseCase
            data={DATA_BENEFIT}
            bannerUrl="/images/benefit-production-home.png"
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
                  Emphasize the benefit{" "}
                </TextGradient>
                for Production House
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
          <FunctionUseCase />
          <ResultUseCase />
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

export default memo(UseCaseProductionHouse);

const DATA_BENEFIT = [
  {
    icon: "/images/benefit-ic-4.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Arrange properly entire{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          production process
        </TextGradient>
      </Text>
    ),
    content: "All the complex stages in production will be organized clearly",
  },
  {
    icon: "/images/benefit-ic-5.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Substantial workforce is assigned through{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          manageable task distribution
        </TextGradient>
      </Text>
    ),
    content:
      "Substantial workforce is assigned through manageable task distribution",
  },
  {
    icon: "/images/benefit-ic-6.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Keep track and update{" "}
        </TextGradient>
        the post production 
      </Text>
    ),
    content: "Product editing steps will be closely monitored and reported",
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
        All stages of production{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={600}
        >
          are managed effectively
        </TextGradient>
      </Text>
    ),
    content: `From pre-production to post-production, all work will be distributed and unified in a streamlined manner. `,
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Document",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={600}
        my={4}
      >
        From ideation and script writing will be{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={600}
        >
          discussed and managed on only one platform
        </TextGradient>
      </Text>
    ),
    content: `Conceptualizing scenarios for clients and storing related documents orderly without using multiple platforms.`,
  },
];
