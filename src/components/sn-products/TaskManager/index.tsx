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

const ProductTaskManager = () => {
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
            fontSize={{ md: 64, xs: 24 }}
            textAlign="center"
            fontWeight={{ md: 500, xs: 700 }}
            mt={4}
          >
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              Elevate the organization, monitoring, and performance levels
            </TextGradient>
            &#160;throughout the course of work and project execution
            <Text
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              of project objectives
            </Text>
          </Text>
        }
        subText="Manage your task within TaskCover"
        imageUrl="/images/product-task-manager-header.png"
      />
     <Container>
        <Banner />
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
        </Container>
        <Partner />
        <Container>
          <CreateProduct data={DATA_CREATE} />
        </Container>
      </Stack>
      <ProductEvent
        heading="READY TO BUDGETING YOUR AGENCY?"
        textButton="STAR TO FREE TRIAL"
      />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(ProductTaskManager);

const DATA = [
  {
    imageUrl: "/images/product-task-manager-1.png",
    title: "INCREASE work efficiency and effectiveness",
    content: `Effortlessly track and manage tasks with precision, preventing oversight, minimizing procrastination, and ensuring timely completion.`,
  },
  {
    imageUrl: "/images/product-task-manager-2.png",
    title: "Enhance cooperation and collaboration",
    content: `Seamlessly exchange information, share documents, and collaborate in real-time, fostering strong team bonds and enhancing overall efficiency in teamwork.`,
  },
  {
    imageUrl: "/images/product-task-manager-3.png",
    title: "Time and Cost Efficiency",
    content: `Efficient Time and Cost Savings in Work Management. These apps automate manual tasks, allowing users to concentrate on higher-value work.`,
  },
];

const DATA_CREATE = [
  {
    heading: (
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center">
        See how to create a Project{" "}
        <TextGradient component="span" fontSize="inherit">
          with TaskCover
        </TextGradient>
      </Text>
    ),
    imageUrl: "/images/create-task-manager-1.png",
  },
];
