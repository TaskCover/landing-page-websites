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

const ProductBilling = () => {
  const { isMdSmaller } = useBreakpoint();

  const DATA_CREATE = [
    {
      dataFeatures: [
        {
          features: [
            {
              id: 0,
              imageUrl: isMdSmaller
                ? "/images/create-biling-mobile-1.png"
                : "/images/create-biling-1.png",
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
              The way to{" "}
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={500}
              >
                ISSUE and MAKE INVOICE
              </TextGradient>
            </Text>
          ),
          features: [
            {
              id: 1,
              text: "1 issue invoice",
              imageUrl: "/images/create-project.png",
            },
            {
              id: 2,
              text: "2 make invoice",
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
              Check{" "}
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={500}
              >
                your BILL!
              </TextGradient>
            </Text>
          ),
          features: [
            {
              id: 3,
              text: "INFORMATION",
              imageUrl: "/images/create-project.png",
            },
            {
              id: 4,
              text: "HOW TO COMMENT",
              imageUrl: "/images/create-project.png",
            },
            {
              id: 5,
              text: "CHECK BILLING INFORMATION",
              imageUrl: "/images/create-project.png",
            },
          ],
        },
      ],
    },
  ];
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
              Easily generated invoices and tracked
              {!isMdSmaller && <br />}
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
          <ProductIntroduce data={DATA} isHeading />
          <Partner />
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

export default memo(ProductBilling);

const DATA = [
  {
    imageUrl: "/images/biling-product-1.png",
    imageMobile: "/images/biling-product-mobile-1.png",
  },
];
