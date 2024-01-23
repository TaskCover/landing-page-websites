import { Stack } from "@mui/material";
import { TextGradient, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const HeaderAI = () => {
  const {isMdSmaller} = useBreakpoint();
  return (
    <Stack position="relative" pb={{ md: 30, xs: 10 }} pt={12}>
      <Stack>
        <Image
          src="/images/header-ai.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="header-ai"
        />
      </Stack>
      <Stack
        direction={{ md: "row", xs: "column" }}
        alignItems="center"
        mt={{ md: 16, xs: 6 }}
        spacing={{ md: 15.125, xs: 4 }}
      >
        <Stack flex={1}>
          <Text component="div" fontSize={{ md: 40, xs: 24 }} fontWeight={500} mb={2.4}>
            <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500} percentBlueColor={13.8} percentGreenColor={100.38}>
              The revolutionary power
            </TextGradient>
            of artificial intelligence
          </Text>
          <Text fontSize={{md: 20, xs: 16}}>
            TaskCover AI turns every task into optimization and excellence. With
            cutting-edge AI algorithms stressing accuracy and automation, a new
            standard in work organization with intelligence and creativity
            collaborates.
          </Text>
        </Stack>
        <Stack flex={1} width="100%">
          <Image
            src="/images/ai-robot.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: isMdSmaller ? "85%" : "100%",
              height: "auto",
              margin: "0 auto",
            }}
            alt="ai-robot"
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{md: 4.375, xs: 1}}
        mt={12}
        gap={{ md: 0, xs: 2 }}
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          background: "background: rgba(255, 255, 255, 0.50)",
        }}
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
    mobileWidth: 48
  },
  {
    imageUrl: "/images/ai-partner-2.png",
    width: 294,
    mobileWidth: 164
  },
  {
    imageUrl: "/images/ai-partner-3.png",
    width: 146,
    mobileWidth: 81
  },
  {
    imageUrl: "/images/ai-partner-4.png",
    width: 207,
    mobileWidth: 128
  },
  {
    imageUrl: "/images/ai-partner-5.png",
    width: 227,
    mobileWidth: 140
  },

];
