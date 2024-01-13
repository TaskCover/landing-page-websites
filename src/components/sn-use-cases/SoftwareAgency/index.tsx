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
import { UseCaseCommitResult } from "../components/CommitResult";

const UseCaseSoftwareAgency = () => {
  return (
    <Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: {
              md: "url(/images/trust-center-bg.webp)",
              xs: "url(/images/bg-use-case-mobile.png)",
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
            title="TaskCover | Software Agency"
            headings={
              <Text
                component="div"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={600}
                my={4}
              >
                Optimize process on a{" "}
                <TextGradient
                  component="span"
                  fontSize={{ md: 36, xs: 20 }}
                  fontWeight={600}
                >
                  project by project basis
                </TextGradient>
              </Text>
            }
            content={`Taskcover boosts your efficacy significantly for every software project along with conceptualizing the software operation in simple steps `}
          />
        </Container>
        <PartnerUseCase />
        <Container>
          <BenefitUseCase
            data={DATA_BENEFIT}
            bannerUrl="/images/benefit-software-agency.png"
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
                  Emphasize the benefits{" "}
                </TextGradient>
                for Software Agency
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

export default memo(UseCaseSoftwareAgency);

const DATA_BENEFIT = [
  {
    icon: "/images/benefit-ic-4.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Organize data{" "}
        </TextGradient>
        on a per project basis
      </Text>
    ),
    content: "Create transparent schedules for development phases",
  },
  {
    icon: "/images/benefit-ic-10.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Follow the change{" "}
        </TextGradient>
        The activities of all teams are
      </Text>
    ),
    content:
      "Track and control changes in source code to level up the development team",
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
          Ensure the consistency{" "}
        </TextGradient>
        through the departments
      </Text>
    ),
    content:
      "Work synchronously and implement the requirements correctly to avoid conflicts.",
  },
];

const DATA_ACCELERATE = [
  {
    imageUrl: "/images/accelerate-image.png",
    title: "AI Tasks & Projects",
    heading: undefined,
    content: `Program software components will be automatically segmented into smaller tasks for the team to easily execute it.`,
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Project management",
    heading: undefined,
    content: `Leverage cutting-edge solutions in management to reach technological evolution and process automation.`,
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Budget",
    heading: undefined,
    content: `Ensures the optimal distribution of budget within the framework of software strategic objectives.`,
  },
];
