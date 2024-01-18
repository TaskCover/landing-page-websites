import { Container, Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import { HelperSendMail } from "components/sn-help-center/components/SendMail";
import { memo } from "react";
import { AccelerateUseCase } from "../components/Accelarate";
import { BenefitUseCase } from "../components/Benerfits";
import { UseCaseCommitResult } from "../components/CommitResult";
import { FunctionUseCase } from "../components/Function";
import { HeaderUseCase } from "../components/Header";
import { PartnerUseCase } from "../components/Partner";
import { ResourceUseCase } from "../components/Resource";

const UseCaseLawAgency = () => {
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
            title="TaskCover | Law Agency"
            headings={
              <Text
                component="div"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={600}
                my={4}
              >
                Optimize process on a{" "}
                <TextGradient fontSize={{ md: 36, xs: 20 }} fontWeight={600}>
                  project by project basis
                </TextGradient>
              </Text>
            }
            content={`Taskcover boosts your efficacy significantly for every software project along with conceptualizing the software operation in simple steps`}
          />
        </Container>
        <Container>
          <BenefitUseCase
            data={DATA_BENEFIT}
            bannerUrl="/images/benefit-law-agency.png"
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
                  Benefits{" "}
                </TextGradient>
                to Law Agency
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
          <UseCaseCommitResult />
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

export default memo(UseCaseLawAgency);

const DATA_BENEFIT = [
  {
    icon: "/images/benefit-ic-8.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Embedded AI agent{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          to accelerate in legal processes
        </TextGradient>
      </Text>
    ),
    content: " Create transparent schedules for development phases",
  },
  {
    icon: "/images/benefit-ic-9.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Control and facilitate{" "}
        </TextGradient>
        finance to gain competitive edge with ease
      </Text>
    ),
    content:
      "Track and control changes in source code to level up the development team",
  },
  {
    icon: "/images/benefit-ic-7.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Streamline{" "}
        </TextGradient>
        legal operations
      </Text>
    ),
    content:
      "Work synchronously and implement the requirements correctly to avoid conflicts.",
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
          Optimize legal process{" "}
        </TextGradient>
        and tasks with clients
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={600}
          percentGreenColor={140.38}
        >
          {" "}
          using AI
        </TextGradient>
      </Text>
    ),
    content: `TaskCover AI agent automates analyzing legal documents, extract crucial information, and predict case outcomes. Drive distinct case success with AI record meetings .`,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Time Tracking",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={600}
        my={4}
      >
        Take advantage of accurate time keeping for productive utilization on{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={600}
        >
          tasks, projects, and client engagements
        </TextGradient>
      </Text>
    ),
    content: `Capture, monitor, and analyze time spent on projects, ensuring precision in resource allocation and project timelines`,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  },
];
