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
            fontSize={{ md: 42, xs: 23 }}
            textAlign="center"
            fontWeight={{ md: 500, xs: 700 }}
            mt={4}
          >
            Discover specific tactics and expertise to empower <br />
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
              percentBlueColor={43.8}
              percentGreenColor={74.38}
            >
              &#160;your financial decisions with confidence and accuracy.
            </TextGradient>
          </Text>
        }
        subText="Create a new project within TaskCover"
        imageUrl="/images/project-product-header.png"
      />
      <Container>
        <Banner content="Create a new project within TaskCover" />
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
        heading="READY TO BUDGETING YOUR AGENCY?"
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
    imageUrl: "/images/product-project-1.png",
    title: "Effective Organization",
    content: `Facilitating efficient organization and tracking of project work and tasks, this functionality empowers managers to effortlessly monitor progress and allocate tasks with flexibility`,
  },
  {
    imageUrl: "/images/product-project-2.png",
    title: "Track Progress and Performance",
    content: `Monitoring project progress and assessing work performance, this feature not only empowers project managers to make informed decisions but also motivates the team by providing a clear view of their goals and accomplishments`,
  },
];

const DATA_CREATE = [
  {
    heading: (
      <Text component="div" fontSize={{ md: 40, xs: 24 }} textAlign="center" fontWeight={500}>
        See how to create a Project{" "}
        <TextGradient component="span" fontSize="inherit" fontWeight={500}>
          with TaskCover
        </TextGradient>
      </Text>
    ),
    dataFeatures: [
      {
        features: [
          {
            id: 1,
            text: "Set a name",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 2,
            text: "Who in charge",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 3,
            text: "View detail",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 4,
            text: "Adjust project",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 5,
            text: "Set status",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 6,
            text: "Check the status operation",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 7,
            text: "Check the cost",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 8,
            text: "Check the member",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 9,
            text: "Check the general information",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 10,
            text: "Search, filter project",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
    ],
  },
];
