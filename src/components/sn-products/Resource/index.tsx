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
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={{ md: 500, xs: 700 }}
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
        <Banner />
        <ProductIntroduce data={DATA} />
        <Partner />
        <CreateProduct data={DATA_CREATE} />
      </Container>
      <ProductEvent heading="READY TO OPTIMIZE YOUR AGENCY?" textButton="STAR TO FREE TRIAL" />
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
  },
];

const DATA_CREATE = [
  {
    heading: "",
    imageUrl: "/images/create-resource-1.png",
  },
];
