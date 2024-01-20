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

const ProductResource = () => {
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
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 600, xs: 700 }}
            >
              Ensure the success of the project or task
            </TextGradient>
            &#160;through organizing and executing.
            <br />
          </Text>
        }
        subText="Try Resource Planning within TaskCover"
        imageUrl="/images/resource-product-header.png"
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
          <Stack mt={{ md: 15, xs: 5 }}>
            <Partner />
          </Stack>
        </Container>

        <Container>
          <CreateProduct data={DATA_CREATE} />
        </Container>
      </Stack>
      <ProductEvent
        heading="READY TO OPTIMIZE YOUR AGENCY?"
        textButton="STAR TO FREE TRIAL"
      />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(ProductResource);

const DATA = [
  {
    imageUrl: "/images/resource-product-1.png",
    imageMobile: "/images/resource-product-mobile-1.png",
  },
];

const DATA_CREATE = [
  {
    dataFeatures: [
      {
        heading: (
          <TextGradient
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={500}
            width="100%"
          >
            List of employee
          </TextGradient>
        ),
        features: [
          {
            id: 1,
            text: "Displays information",
            imageUrl: "/images/create-resource-1.png",
          },
          {
            id: 2,
            text: "Add working time",
            imageUrl: "/images/create-resource-1.png",
          },
          {
            id: 3,
            text: "Add off time",
            imageUrl: "/images/create-resource-1.png",
          },
          {
            id: 4,
            text: "Displays individual time information",
            imageUrl: "/images/create-resource-1.png",
          },
          {
            id: 5,
            text: "Payment to employee accounts",
            imageUrl: "/images/create-resource-1.png",
          },
          {
            id: 6,
            text: "Edit employee positions",
            imageUrl: "/images/create-resource-1.png",
          },
        ],
      },
    ],
  },
];
