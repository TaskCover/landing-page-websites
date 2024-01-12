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

const ProductDocument = () => {
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
              Generate and store documents in various formats
              <br /> based on
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={{ md: 500, xs: 700 }}
              >
                &#160;all your needs and preferences
              </TextGradient>
            </Text>
          }
          subText="Monitor team's time within TaskCover"
          imageUrl="/images/document-product-header.png"
        />
        <Banner />
        <ProductIntroduce data={DATA} />
        <Partner />
        <CreateProduct data={DATA_CREATE} />
      </Container>
      <ProductEvent heading="Don’t wait to long to docs with TaskCover" />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(ProductDocument);

const DATA = [
  {
    imageUrl: "/images/product-document-1.png",
  },
];

const DATA_CREATE = [
  {
    heading: "",
    imageUrl: "/images/create-doc-1.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-doc-2.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-doc-3.png",
  },
];
