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
          aspectRatio: "2210/1503",
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
        <Banner />
        <ProductIntroduce data={DATA} />
        <Partner />
        <CreateProduct data={DATA_CREATE} />
      </Container>
      <ProductEvent heading="READY TO BUDGETING YOUR AGENCY?" />
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
      <Text fontSize={{ md: 40, xs: 24 }}>
        See how to create a Project{" "}
        <TextGradient component="span" fontSize="inherit">
          with TaskCover
        </TextGradient>
      </Text>
    ),
    imageUrl: "/images/create-project.png",
  },
];
