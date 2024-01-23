import { Stack, Container } from "@mui/material";
import { memo } from "react";
import { HeaderProducts } from "./components/Header";
import { ProductInformation } from "./components/Information";
import { ProductFeature } from "./components/ProductFeature";
import { ProductEvent } from "./components/ProductEvent";
import { SendQuestion } from "./components/SendQuestion";
import { Text, TextGradient } from "components/shared";

const Products = () => {
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
          display: {md: "none", xs: "flex"}
        }}
      />
      <HeaderProducts
        headingText={
          <Text
          fontSize={{ md: 55, xs: 24 }}
            textAlign="center"
            fontWeight={{ md: 500, xs: 700 }}
            mt={4}
          >
            Your
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
              percentBlueColor={-15.2}
              percentGreenColor={100.30}
            >
              &#160;Company&apos;s Info,
            </TextGradient>
            <br />
            <Text
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
            >
              Your
            </Text>
            <TextGradient
              component="span"
              fontSize="inherit"
              fontWeight={{ md: 500, xs: 700 }}
              percentBlueColor={-55.2}
              percentGreenColor={110.30}
            >
              &#160;Way.
            </TextGradient>
          </Text>
        }
        subText="See your Agency within TaskCover"
        imageUrl="/images/company-app.png"
      />
      <Container>
        <ProductInformation />
      </Container>
      <ProductFeature />
      <ProductEvent
        heading="READY TO BUDGETING YOUR AGENCY?"
        textButton="STAR TO FREE TRIAL"
      />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(Products);
