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

const UseCaseRemoteTeam = () => {
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
          title="TaskCover | Remote Team"
          headings={
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
                Bridge the gaps in collaboration{" "}
              </TextGradient>
              from anywhere
            </Text>
          }
          content={`Taskcover boosts your efficacy significantly for every software project along with conceptualizing the software operation in simple steps`}
        />
      </Container>
      <PartnerUseCase />
      <Container>
        <BenefitUseCase
          data={DATA_BENEFIT}
          bannerUrl="/images/benefit-remote-team.png"
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
                Benefits{" "}
              </TextGradient>
              to Remote teams
            </Text>
          }
        />
        <AccelerateUseCase data={DATA_ACCELERATE} />
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

export default memo(UseCaseRemoteTeam);

const DATA_BENEFIT = [
  {
    icon: "/images/benefit-ic-7.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Leverage{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
         AI agent expert{" "}
        </TextGradient>
        to complete various tasks
      </Text>
    ),
    content: "Create transparent schedules for development phases",
  },
  {
    icon: "/images/benefit-ic-8.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
           Control and optimize project budget{" "}
        </TextGradient>
        to drive success
      </Text>
    ),
    content:
      "Track and control changes in source code to level up the development team",
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
         Streamline{" "}
        </TextGradient>
        operations to  yield time saving and efficiency
      </Text>
    ),
    content: "Work synchronously and implement the requirements correctly to avoid conflicts.",
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
       Enhanced  {" "}
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={500}
        >
          projects and tasks productivity{" "}
        </TextGradient>
         using AI
      </Text>
    ),
    content: `TaskCover AI agent automates tasks, generating workflow templates to streamline processes efficiently.`,
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Chat",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={500}
        my={4}
      >
        Empower project delivery by {" "}
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={500}
        >
          staying connected and minimizing miscommunication gaps
        </TextGradient>
      </Text>
    ),
    content: `Enhance communication transparency, file sharing to streamline processes, to keep members stay on-track.  `,
  },
];