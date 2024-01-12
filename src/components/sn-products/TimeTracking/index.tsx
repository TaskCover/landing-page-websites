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

const ProductProject = () => {
  return (
    <Stack position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/trust-center-bg.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: { md: "-50px", xs: 0 },
          zIndex: -1,
        }}
      />
      <Container>
        <HeaderProducts
          headingText={
            <Text
              fontSize={{ md: 64, xs: 24 }}
              textAlign="center"
              fontWeight={{ md: 500, xs: 700 }}
              mt={4}
            >
              Optimize your time management for
              <br />
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={{ md: 500, xs: 700 }}
              >
                &#160;insightful and effective results.
              </TextGradient>
            </Text>
          }
          subText="Monitor team's time within TaskCover"
          imageUrl="/images/time-tracking-header.png"
        />
        <Banner />
        <ProductIntroduce data={DATA} />
        <Partner />
        <CreateProduct
          data={DATA_CREATE}
        />
      </Container>
      <ProductEvent heading="Too fast to grasp 'time tracking' in theory? Real experience of the TaskCover(" textButton="STAR TO FREE TRIAL" />
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
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center">
        See how to monitor your personal time{" "}
        <TextGradient component="span" fontSize="inherit">
          with TaskCover
        </TextGradient>
      </Text>
    ),
    imageUrl: "/images/create-time-tracking-1.png",
  },
  {
    heading: (
      <TextGradient fontSize={{ md: 40, xs: 24 }} textAlign="center">
        Check the agency time
      </TextGradient>
    ),
    imageUrl: "/images/create-time-tracking-2.png",
  },
];
