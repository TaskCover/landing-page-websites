import { Stack, Container } from "@mui/material";
import { memo } from "react";
import { HeaderProducts } from "../components/Header";
import { ProductInformation } from "../components/Information";
import { ProductFeature } from "../components/ProductFeature";
import { ProductEvent } from "../components/ProductEvent";
import { SendQuestion } from "../components/SendQuestion";
import { Text, TextGradient } from "components/shared";
import { Banner } from "../components/Banner";
import { Partner } from "../components/Partner";
import { ProductIntroduce } from "../components/ProductIntro";
import { CreateProduct } from "../components/CreateProduct";
import useBreakpoint from "hooks/useBreakpoint";

const ProductProject = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/bg-header-product-mobile.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          display: { md: "none", xs: "flex" },
        }}
      />
      <HeaderProducts
        headingText={
          <Text
            fontSize={{ md: 47, xs: 23 }}
            textAlign="center"
            fontWeight={{ md: 600, xs: 700 }}
            mt={4}
          >
            Optimize your time management for
            {!isMdSmaller && <br />}
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 600, xs: 700 }}
            >
              &#160;insightful and effective results.
            </TextGradient>
          </Text>
        }
        subText="Monitor team's time within TaskCover"
        imageUrl="/images/time-tracking-header.png"
        marginTop={13}
      />
      <Container>
        <Banner content="Monitor team's time within TaskCover" />
      </Container>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-introduce.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            display: { md: "flex", xs: "none" },
          }}
        />
        <Container>
          <ProductIntroduce data={DATA} />
          <Partner />
        </Container>
        <Container>
          <CreateProduct data={DATA_CREATE} />
        </Container>
      </Stack>
      <ProductEvent
        heading="Too fast to grasp 'time tracking' in theory? Real experience of the TaskCover("
        textButton="STAR TO FREE TRIAL"
      />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(ProductProject);

const DATA = [
  {
    imageUrl: "/images/product-time-tracking-1.png",
    title: "No Need for an HR Tool To Manage Time Off",
    content: `Savings on HR applications free up budget for essential investments, boosting growth opportunities and sales potential for agencies.`,
  },
  {
    imageUrl: "/images/product-time-tracking-2.png",
    title:
      "Digitize 100% of shifts, including those that are intricately structured.",
    content: `Digitizing work helps increase labor efficiency, clear schedules and minimize errors in human resource management.`,
  },
];

const DATA_CREATE = [
  {
    heading: (
      <Text  component="div" fontSize={{ md: 40, xs: 24 }} textAlign="center" fontWeight={600}>
        See how to monitor your personal time{" "}
        <TextGradient component="span" fontSize="inherit" fontWeight={600}>
          with TaskCover
        </TextGradient>
      </Text>
    ),
    dataFeatures: [
      {
        features: [
          {
            id: 1,
            text: "Time of Project",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 2,
            text: "Kind of time word/ day off",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 3,
            text: "Started time",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 4,
            text: "Note",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 5,
            text: "Timesheet check",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 6,
            text: "Daily check",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 7,
            text: "Calendar",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
    ],
  },
  {
    heading: (
      <TextGradient
        component="span"
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        fontWeight={600}
        percentBlueColor={29.8}
        percentGreenColor={64.38}
      >
        Check the agency time
      </TextGradient>
    ),
    dataFeatures: [
      {
        features: [
          {
            id: 1,
            imageUrl: "/images/create-time-tracking.png",
          }
        ],
      },
    ],
  },
];
