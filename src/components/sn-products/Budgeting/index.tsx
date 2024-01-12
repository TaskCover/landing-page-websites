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

const ProductBudgeting = () => {
  return (
    <Stack position="relative">
      <HeaderProducts
        headingText={
          <Text
            fontSize={{ md: 64, xs: 24 }}
            textAlign="center"
            fontWeight={{ md: 500, xs: 700 }}
            mt={4}
          >
            Ensure the
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              &#160;efficient and effective attainment,
            </TextGradient>
            <Text
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              of project objectives
            </Text>
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              &#160;Way.
            </TextGradient>
          </Text>
        }
        subText="Try out Budgeting within TaskCover"
        imageUrl="/images/product-budget-app.png"
      />
      <Container>
        <Banner />
        <ProductIntroduce data={DATA} />
      </Container>
      <Partner />
      <Container>
        <CreateProduct data={DATA_CREATE} />
      </Container>
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

export default memo(ProductBudgeting);

const DATA = [
  {
    imageUrl: "/images/product-budget-1.png",
    title: "Concerned about control over your finances? Not any more!",
    content: `Establishing a budget plan enables you to monitor and manage your finances more effectively, stay out of significant financial stress.`,
  },
  {
    imageUrl: "/images/product-budget-2.png",
    title: "Reduce unnecessary expense and Increase Investment Capacity",
    content: `Not only aids in saving money but also opens doors for investing in long-term aspirations.`,
  },
  {
    imageUrl: "/images/product-budget-3.png",
    title: "Prevent Debt and Create Financial Security!",
    content: `Budgeting helps prevent uncontrolled debt. At the same time, it also ensures future financial security.`,
  },
];

const DATA_CREATE = [
  {
    heading: (
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center">
        See how to create a budget with TaskCover{" "}
        <TextGradient component="span" fontSize="inherit">
          with TaskCover
        </TextGradient>
      </Text>
    ),
    imageUrl: "/images/create-budget.png",
  },
];
