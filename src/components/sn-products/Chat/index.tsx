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
            fontSize={{ md: 47, xs: 24 }}
            textAlign="center"
             fontWeight={{ md: 600, xs: 700 }}
            mt={4}
          >
            <TextGradient
              component="span"
              fontSize="inherit"
               fontWeight={{ md: 600, xs: 700 }}
            >
              Deliver real-time communication,
            </TextGradient>
            &#160;ensure timely notifications through the latest data security.
            <br />
          </Text>
        }
        subText="Try to connect your team within TaskCover"
        imageUrl="/images/chat-product-header.png"
        marginTop={10}
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
          <Stack mb={{md: 14, xs: 5}}>
          <ProductIntroduce data={DATA} />
          </Stack>
          <Partner />
        </Container>
  
        <Container>
          <CreateProduct data={DATA_CREATE} />
        </Container>
      </Stack>
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
    imageMobile: "/images/create-chat-mobile-1.png"
  },
  {
    heading: "",
    imageUrl: "/images/create-chat-2.png",
    imageMobile: "/images/create-chat-mobile-2.png"
  },
  {
    heading: "",
    imageUrl: "/images/create-chat-3.png",
    imageMobile: "/images/create-chat-mobile-3.png"
  },
  {
    heading: (
      <Text fontSize={{ md: 40, xs: 24 }} textAlign="center" fontWeight={600}>
        <TextGradient component="span" fontSize="inherit" fontWeight={600}>
          Multitasking{" "}
        </TextGradient>
        while meeting
      </Text>
    ),
    imageUrl: "/images/create-chat-4.png",
    imageMobile: "/images/create-chat-mobile-4.png"
  },
];
