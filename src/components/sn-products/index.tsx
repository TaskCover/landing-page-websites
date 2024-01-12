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
          backgroundImage: "url(/images/bg-header-product.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
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
              Your
              <TextGradient
                component="span"
                fontSize="inherit"
                fontWeight={{ md: 500, xs: 700 }}
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
              >
                &#160;Way.
              </TextGradient>
            </Text>
          }
          subText="See your Agency within TaskCover"
          imageUrl="/images/company-app.png"
        />
        <ProductInformation />
        <ProductFeature />
      </Container>
      <ProductEvent heading="READY TO BUDGETING YOUR AGENCY?" />
      <Container>
        <SendQuestion />
      </Container>
    </Stack>
  );
};

export default memo(Products);
