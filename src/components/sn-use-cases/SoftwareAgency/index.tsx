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
import useBreakpoint from "hooks/useBreakpoint";
import {HEADER_HEIGHT} from "layouts/Header";

const UseCaseSoftwareAgency = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack>
      <Stack position="relative" pt={HEADER_HEIGHT / 8 - 3}>
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
            title="TaskCover | Software Agency"
            headings={
              <Text
                component="div"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={700}
                my={4}
              >
                Optimize process on a {!isMdSmaller && <br />}
                <TextGradient
                  component="span"
                  fontSize={{ md: 36, xs: 20 }}
                  fontWeight={700}
                  percentGreenColor={128.38}
                >
                  project by project basis
                </TextGradient>
              </Text>
            }
            content={`Taskcover boosts your efficacy significantly for every software project along with conceptualizing the software operation in simple steps `}
          />
        </Container>
        <Stack
          mt={{ md: 20, xs: 10 }}
          sx={{
            backgroundColor: { md: "#fff", xs: "rgba(255, 255, 255, 0.50)" },
          }}
        >
          <Container>
            <PartnerUseCase />
          </Container>
        </Stack>

        <Container>
          <BenefitUseCase
            data={DATA_BENEFIT}
            bannerUrl="/images/benefit-software-agency.png"
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
                  percentBlueColor={16.8}
                  percentGreenColor={150.38}
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
          <UseCaseCommitResult data={DATA_COMMIT_RESULT} />
        </Container>
      </Stack>
      <Container>
        <ResourceUseCase />
        <HelperSendMail />
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
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Budget",
    heading: undefined,
    content: `Ensures the optimal distribution of budget within the framework of software strategic objectives.`,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  },
];

const DATA_COMMIT_RESULT = [
  {
    imageUrl: "/images/result-commit-1.png",
    content: (
      <Text
        component="div"
        fontSize={14}
        fontWeight={500}
        mb={5}
        my={4}
        textAlign="center"
      >
        <TextGradient component="span" fontSize={14} fontWeight={500}>
          Arrange the process{" "}
        </TextGradient>
        of conceptualizing and defining project
      </Text>
    ),
  },
  {
    imageUrl: "/images/result-commit-2.png",
    content: (
      <Text
        component="div"
        fontSize={14}
        fontWeight={500}
        mb={5}
        my={4}
        textAlign="center"
      >
        <TextGradient component="span" fontSize={14} fontWeight={500}>
          Maintain smoothly{" "}
        </TextGradient>
        the applications and frameworks of all steps
      </Text>
    ),
  },
  {
    imageUrl: "/images/result-commit-3.png",
    content: (
      <Text
        component="div"
        fontSize={14}
        fontWeight={500}
        mb={5}
        my={4}
        textAlign="center"
      >
        Present the{" "}
        <TextGradient component="span" fontSize={14} fontWeight={500}>
          customized workflow of software development
        </TextGradient>
      </Text>
    ),
  },
  {
    imageUrl: "/images/result-commit-4.png",
    content: (
      <Text
        component="div"
        fontSize={14}
        fontWeight={500}
        mb={5}
        my={4}
        textAlign="center"
      >
        <TextGradient component="span" fontSize={14} fontWeight={500}>
          Maximizes process efficiency{" "}
        </TextGradient>
        and results in a quality strategies
      </Text>
    ),
  },
];
