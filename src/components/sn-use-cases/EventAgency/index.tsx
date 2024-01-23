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

const UseCaseEventAgency = () => {
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
            title="TaskCover | Event Agency"
            headings={
              <Text
                component="div"
                fontSize={{ md: 36, xs: 20 }}
                fontWeight={700}
                my={4}
              >
                All events will be organized with a{" "}
                <TextGradient
                  fontSize={{ md: 36, xs: 20 }}
                  fontWeight={700}
                  percentGreenColor={98.38}
                >
                  high degree of professional
                </TextGradient>
              </Text>
            }
            content={`TaskCover facilitates the optimization of each stage in the management process from encompassing ideation to plan implementation `}
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
            bannerUrl="/images/benefit-event-agency.png"
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
                  Emphasize the benefits <br />
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
          <PlanUseCase />
        </Container>
      </Stack>

      <Container>
        <ResourceUseCase />
        <HelperSendMail />
      </Container>
    </Stack>
  );
};

export default memo(UseCaseEventAgency);

const DATA_BENEFIT = [
  {
    icon: "/images/benefit-ic-7.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Manage events{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
          percentBlueColor={-55.2}
          percentGreenColor={159.38}
        >
          smoothly and successfully
        </TextGradient>
      </Text>
    ),
    content: "Experience seamless and quality event management",
  },
  {
    icon: "/images/benefit-ic-8.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        The activities of all teams are{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
          percentBlueColor={-55.2}
          percentGreenColor={159.38}
        >
          meticulously
          <TextGradient
            component="span"
            fontSize={{ md: 20, xs: 16 }}
            fontWeight={700}
            percentBlueColor={100}
          >
            {" "}
            supervised
          </TextGradient>
        </TextGradient>
      </Text>
    ),
    content: "Ensuring precision and excellence in event execution",
  },
  {
    icon: "/images/benefit-ic-9.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
          Present{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
          percentBlueColor={-55.2}
          percentGreenColor={159.38}
        >
          well-defined strategies
        </TextGradient>{" "}
        and{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
          percentBlueColor={-55.2}
          percentGreenColor={88.38}
        >
          crafted plans
        </TextGradient>
      </Text>
    ),
    content: "Enhancing the overall efficiency in every aspect",
  },
];

const DATA_ACCELERATE = [
  {
    imageUrl: "/images/accelerate-image.png",
    title: "AI Tasks & Projects",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={700}
        my={4}
      >
        Minimize risks with automated{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={700}
          percentGreenColor={138.38}
        >
          clear allocation resources.
        </TextGradient>
      </Text>
    ),
    content: `Every step in event organization will be fully listed, kept tracked and continuously checked to ensure smooth and quality organization.`,
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Project management",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={700}
        my={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={700}
          percentGreenColor={138.38}
        >
          Having great administration{" "}
        </TextGradient>
        in all the different events
      </Text>
    ),
    content: `Integrate all management keys to open a successful event`,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  },
  {
    imageUrl: "/images/accelerate-image.png",
    title: "Chat",
    heading: (
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={700}
        my={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={700}
          percentGreenColor={138.38}
        >
          Communicate and provide rapid updates on the issue{" "}
        </TextGradient>
        from various teams and locations 
      </Text>
    ),
    content: `Enhance coordination and responsiveness for optimal efficiency and successful outcomes of the events.`,
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
  },
];
