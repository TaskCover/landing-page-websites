import { Stack } from "@mui/material";
import { Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const PartnerUseCase = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      py={4}
    >
      <Text fontSize={{ md: 24, xs: 16 }} fontWeight={500} textAlign="center" px={{md: 0, xs: 3}}>
        See how TaskCover empower Marketing Agencies globally
      </Text>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{md: 4.375, xs: 0}}
        mt={5}
        gap={{ md: 0, xs: 5 }}
        justifyContent="center"
        flexWrap="wrap"
      >
        {PARTNER.map((partner, index) => (
          <Stack key={index}>
            <Image
              src={partner.imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: isMdSmaller ? partner.mobileWidth : partner.width,
                height: "auto",
              }}
              alt="partner"
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const PARTNER = [
  {
    imageUrl: "/images/ai-partner-1.png",
    width: 68,
    mobileWidth: 51,
  },
  {
    imageUrl: "/images/ai-partner-4.png",
    width: 207,
    mobileWidth: 172,
  },
  {
    imageUrl: "/images/ai-partner-2.png",
    width: 294,
    mobileWidth: 294,
  },
  {
    imageUrl: "/images/ai-partner-3.png",
    width: 146,
    mobileWidth: 110,
  },
  {
    imageUrl: "/images/ai-partner-5.png",
    width: 227,
    mobileWidth: 146,
  },
];
