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

const ProductChat = () => {
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
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              Easily generated invoices and tracked
            </TextGradient>
            &#160;billable time to save time.
            <br />
          </Text>
        }
        subText="Monitor team's time within TaskCover"
        imageUrl="/images/biling-product-header.png"
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
        heading="Don’t wait to long to docs with TaskCover"
        textButton="STAR TO FREE TRIAL"
      />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(ProductChat);

const DATA = [
  {
    imageUrl: "/images/biling-product-1.png",
  },
];

const DATA_CREATE = [
  {
    heading: "",
    imageUrl: "/images/create-biling-1.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-biling-2.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-biling-3.png",
  },
];
