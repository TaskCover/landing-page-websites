import { Stack } from "@mui/material";
import { TextGradient, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const ProductInformation = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      justifyContent="space-between"
      mt={{md: 15, xs: 1}}
    >
      <Stack flex={1}>
        <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500} percentGreenColor={103.38}>
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
      <Stack flex={1} position="relative" mt={{md: 0, xs: 5}}>
        {isMdSmaller ? (
          <Image
            src="/images/product-infomation-mobile.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="product-infomation"
          />
        ) : (
          <>
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
            <Stack sx={{ position: "absolute", bottom: {lg: -130, xs: -220}, left: -350, width: "100%" }}>
              <Image
                src="/images/product-infomation-2.png"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: isMdSmaller ? "150%" : "100%",
                  height: "auto",
                }}
                alt="product-infomation"
              />
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
};
