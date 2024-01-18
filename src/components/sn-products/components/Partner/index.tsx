import { Stack } from "@mui/material";
import Image from "next/image";
import { Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";

export const Partner = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack position="relative" mt={4}>
      <Text
        fontWeight={500}
        fontSize={{ md: 40, xs: 24 }}
        my={{ md: 8, xs: 3 }}
        textAlign="center"
      >
        Partner
      </Text>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {DATA.map((data, index) =>
          isMdSmaller ? (
            (index + 3) % 3 === 0 ? (
              <Stack width="100%" key={index} alignItems="center">
                <Stack mb={2} width={{ md: "20%", xs: "40%" }}>
                  <Image
                    src={data}
                    width={isMdSmaller ? 136 : 0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    alt="logo-partner"
                  />
                </Stack>
              </Stack>
            ) : (
              <Stack key={index} mb={2} width={{ md: "20%", xs: "40%" }}>
                <Image
                  src={data}
                  width={isMdSmaller ? 136 : 0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="logo-partner"
                />
              </Stack>
            )
          ) : (
            <Stack key={index} mb={2} width="20%">
              <Image
                src={data}
                width={isMdSmaller ? 136 : 0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="logo-partner"
              />
            </Stack>
          )
        )}
      </Stack>
    </Stack>
  );
};

const DATA = [
  "/images/airbnb.png",
  "/images/hubspot.png",
  "/images/google.png",
  "/images/microsoft.png",
  "/images/walmart.png",
  "/images/fedex.png",
  "/images/avakids.png",
];
