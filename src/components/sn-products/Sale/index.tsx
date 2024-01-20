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
import useBreakpoint from "hooks/useBreakpoint";

const ProductSale = () => {
  const { isMdSmaller } = useBreakpoint();
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
              Effectively tracked customer journey
            </TextGradient>
            &#160;for{!isMdSmaller && <br />} the best retention practices
            security.
            <br />
          </Text>
        }
        subText="Try out Budgeting within TaskCover"
        imageUrl="/images/sale-product-header.png"
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

export default memo(ProductSale);

const DATA = [
  {
    imageUrl: "/images/sale-product-1.png",
  },
];

const DATA_CREATE = [
  {
    heading: (
      <Text
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        fontWeight={500}
        width="100%"
      >
        Keep track of deal information{" "}
        <TextGradient component="span" fontSize="inherit" fontWeight={500}>
        with TaskCover
        </TextGradient>
      </Text>
    ),
    dataFeatures: [
      {
        features: [
          {
            id: 1,
            text: "Name of deal",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 2,
            text: "Stages of deal",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 3,
            text: "Stages of deal",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 4,
            text: "Check who is in charge of deal",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 5,
            text: "Revenu",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 6,
            text: "ReveTime of dealnu",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 7,
            text: "Rating of deal",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 8,
            text: "Lately time",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
      {
        heading: (
          <Text
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={500}
            width="100%"
          >
            CREATE A DEAL
          </Text>
        ),
        features: [
          {
            id: 9,
            text: "Create a name",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 10,
            text: "Customer’s company",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 11,
            text: "Currency unit",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 12,
            text: "In charge",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 13,
            text: "Employee",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 14,
            text: "Tag",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
      {
        heading: (
          <Text
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={500}
            width="100%"
          >
            EXPORT FILE OF DEAL
          </Text>
        ),
        features: [
          {
            id: 15,
            text: "Choose kind of file",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 16,
            text: "Choose size",
            imageUrl: "/images/create-project.png",
          }
        ],
      },
      {
        heading: (
          <Text
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={500}
            width="100%"
          >
            TRACKING YOUR “SALE&quot;
          </Text>
        ),
        features: [
          {
            id: 17,
            text: "DETAIL OF THE DEAL",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 18,
            text: "INFORMATION OF CUSTOMER",
            imageUrl: "/images/create-project.png",
          }
        ],
      },
    ],
  },
];
