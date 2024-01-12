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

const ProductSale = () => {
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
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={{ md: 500, xs: 700 }}
              >
                Effectively tracked customer journey
              </TextGradient>
              &#160;for the best retention practices security.
              <br />
            </Text>
          }
          subText="Try out Budgeting within TaskCover"
          imageUrl="/images/sale-product-header.png"
        />
        <Banner />
        <ProductIntroduce data={DATA} />
        <Partner />
        <CreateProduct data={DATA_CREATE} />
      </Container>
      <ProductEvent heading="READY TO OPTIMIZE YOUR AGENCY?" />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(ProductSale);

const DATA = [
  {
    imageUrl: "/images/sale-product-1.png",
  },
];

const DATA_CREATE = [
  {
    heading: (
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center">
        Keep track of deal information{" "}
        <TextGradient component="span" fontSize="inherit">
          with TaskCover
        </TextGradient>
      </Text>
    ),
    imageUrl: "/images/create-sale-1.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-sale-2.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-sale-3.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-sale-4.png",
  },
];
