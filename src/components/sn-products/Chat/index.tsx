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
        <Banner content="Elevating Communication with Seamless Chat Integration." />
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
          <Stack mb={{ md: 14, xs: 5 }}>
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
    dataFeatures: [
      {
        heading: (
          <Text
            component="div"
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={600}
            width="100%"
          >
            Innovative communication{" "}
            <TextGradient component="span" fontSize="inherit" fontWeight={600}>
              with different users
            </TextGradient>
          </Text>
        ),
        features: [
          {
            id: 1,
            text: "Create text formats",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 2,
            text: "Unlimited emotional expression",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 3,
            text: "Forward",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 4,
            text: "Searching the text",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 5,
            text: "Information",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
      {
        heading: (
          <Text
            component="div"
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={600}
            width="100%"
          >
            The more crowded, the merrier{" "}
            <TextGradient component="span" fontSize="inherit" fontWeight={600}>
              create a group for your team!
            </TextGradient>
          </Text>
        ),
        features: [
          {
            id: 6,
            text: "Create the group",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 7,
            text: "Add new member",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 8,
            text: "Change the avatar",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 9,
            text: "Choose the leader",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
      {
        heading: (
          <Text
            component="div"
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={600}
            width="100%"
          >
            Too difficult to express by text?{" "}
            <TextGradient component="span" fontSize="inherit" fontWeight={600}>
              Call now
            </TextGradient>
          </Text>
        ),
        features: [
          {
            id: 10,
            text: "Make a video call",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 11,
            text: "Record",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 12,
            text: "Change the background",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 13,
            text: "Reduce noise",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 14,
            text: "Screen sharing",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
    ],
  },
  {
    heading: (
      <Text
        component="div"
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        fontWeight={600}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 40, xs: 24 }}
          textAlign="center"
          fontWeight={600}
        >
          Multitasking{" "}
        </TextGradient>
        while meeting
      </Text>
    ),
    dataFeatures: [
      {
        features: [
          {
            id: 1,
            imageUrl: "/images/create-chat-4.png",
          },
        ],
      },
    ],
  },
];
