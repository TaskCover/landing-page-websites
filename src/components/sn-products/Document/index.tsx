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
        marginTop={5}
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
        <Stack mt={{ md: 15, xs: 5 }}>
          <Partner />
        </Stack>
        <Container>
          <CreateProduct data={DATA_CREATE} />
        </Container>
      </Stack>
      <ProductEvent
        heading="Don’t wait to long to docs with TaskCover"
        textButton="STAR TO FREE TRIAL"
      />
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
    imageMobile: "/images/create-doc-mobile-1.png"
  },
  {
    heading: "",
    imageUrl: "/images/create-doc-2.png",
    imageMobile: "/images/create-doc-mobile-2.png"
  },
  {
    heading: "",
    imageUrl: "/images/create-doc-3.png",
    imageMobile: "/images/create-doc-mobile-1.png"
  },
];
