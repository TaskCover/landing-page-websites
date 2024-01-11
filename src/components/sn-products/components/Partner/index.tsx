import { Stack } from "@mui/material";
import Image from "next/image";
import { Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";

export const Partner = () => {
    const {isMdSmaller} = useBreakpoint();
  return (
    <Stack position="relative" mt={4}>
      <Text fontWeight={500} fontSize={{md: 40, xs: 24}} my={{md: 8, xs: 3}} textAlign="center">
        Partner
      </Text>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={{md: 5, xs: 1}}
        flexWrap="wrap"
      >
        <Stack
          sx={{
            backgroundImage: "url(/images/trust-center-bg.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            aspectRatio: "2210/1503",
            position: "absolute",
            top: 0,
            right: { md: "-50px", xs: 0 },
            zIndex: -1,
          }}
        />
        {DATA.map((data, index) => (
          <Stack key={index} mb={2}>
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
        ))}
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