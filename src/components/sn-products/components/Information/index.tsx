import { Stack } from "@mui/material";
import { TextGradient, Text } from "components/shared";
import Image from "next/image";

export const ProductInformation = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack flex={1}>
        <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
          Missing out on information?!
        </TextGradient>
        <Text fontSize={{ md: 40, xs: 24 }} fontWeight={500} mb={2}>
          Don&apos;t Worry!
        </Text>
        <Text variant={{ md: "subtitle1", xs: "body1" }}>
          We assist you in synthesizing and storing necessary and important
          information and more
        </Text>
      </Stack>
      <Stack flex={1} position="relative">
        <Image
          src="/images/product-infomation.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="product-infomation"
        />
        <Stack sx={{position: "absolute", bottom: -100, left: -350}}>
          <Image
            src="/images/product-infomation-2.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "150%",
              height: "auto",
            }}
            alt="product-infomation"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
