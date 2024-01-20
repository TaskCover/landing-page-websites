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
            component="div"
            fontSize={{ md: 47, xs: 23 }}
            textAlign="center"
            fontWeight={{ md: 600, xs: 700 }}
            mt={4}
          >
            Generate and store documents in various formats based on
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 600, xs: 700 }}
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
          <Stack mt={{ md: 15, xs: 5 }}>
            <Partner />
          </Stack>
        </Container>

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
    dataFeatures: [
      {
        heading: (
          <Text
            fontSize={{ md: 29, xs: 24 }}
            textAlign={{ md: "left", xs: "center" }}
            fontWeight={500}
            width="100%"
          >
            See how to
            <TextGradient fontSize="inherit" fontWeight={500}>
              CREATE A DOCS
            </TextGradient>
          </Text>
        ),
        features: [
          {
            id: 1,
            text: "CREATE A SMALL DOCUMENT",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 2,
            text: "CREATE A COPY OF DOCUMENT",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 3,
            text: "DELETE A DOCUMENT",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 4,
            text: "MOVE",
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
            Make
            <TextGradient fontSize="inherit" fontWeight={500}>
              your document different
            </TextGradient>
          </Text>
        ),
        features: [
          {
            id: 5,
            text: "EDIT CONTENT",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 6,
            text: "EDIT FORMAT",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 7,
            text: "BLOCKING",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 8,
            text: "COLOR OF BACKGROUND",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 9,
            text: "COLOR OF TEXT",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 10,
            text: "LINK TO THE BLOCK",
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
            More activities
            <TextGradient fontSize="inherit" fontWeight={500}>
              with your doc
            </TextGradient>
          </Text>
        ),
        features: [
          {
            id: 11,
            text: "CHECK THE HISTORY OF EDITING",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 12,
            text: "SHARE YOUR FILE",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 13,
            text: "SHARE LINK TO YOUR FILE",
            imageUrl: "/images/create-project.png",
          },
          {
            id: 14,
            text: "LOCK THE FILE",
            imageUrl: "/images/create-project.png",
          },
        ],
      },
    ],
  },
];
