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
            fontSize={{ md: 64, xs: 24 }}
            textAlign="center"
            fontWeight={{ md: 500, xs: 700 }}
            mt={4}
          >
            Discover specific tactics and expertise to empower
            <br />
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              &#160;your financial decisions with confidence and accuracy.
            </TextGradient>
          </Text>
        }
        subText="Create a new project within TaskCover"
        imageUrl="/images/project-product-header.png"
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
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center">
        See how to create a Project{" "}
        <TextGradient component="span" fontSize="inherit">
          with TaskCover
        </TextGradient>
      </Text>
    ),
    imageUrl: "/images/create-project.png",
  },
];
