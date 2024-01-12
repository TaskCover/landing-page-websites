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
              Deliver real-time communication,
            </TextGradient>
            &#160;ensure timely notifications through the latest data security.
            <br />
          </Text>
        }
        subText="Try to connect your team within TaskCover"
        imageUrl="/images/chat-product-header.png"
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
        heading="Take all communication within TaskCover"
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
    imageUrl: "/images/chat-product-1.png",
  },
];

const DATA_CREATE = [
  {
    heading: "",
    imageUrl: "/images/create-chat-1.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-chat-2.png",
  },
  {
    heading: "",
    imageUrl: "/images/create-chat-3.png",
  },
  {
    heading: (
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center">
        <TextGradient component="span" fontSize="inherit">
          Multitasking{" "}
        </TextGradient>
        while meeting
      </Text>
    ),
    imageUrl: "/images/create-chat-4.png",
  },
];
