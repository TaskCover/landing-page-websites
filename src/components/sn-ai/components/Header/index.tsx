import { Stack } from "@mui/material";
import { TextGradient, Text } from "components/shared";
import Image from "next/image";

export const HeaderAI = () => {
  return (
    <Stack position="relative" mt={10}>
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
      <Stack direction="row" alignItems="center" mt={8} spacing={15.125}>
        <Stack flex={1}>
          <Text component="div" fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
            <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
              The revolutionary power
            </TextGradient>
            of artificial intelligence
          </Text>
          <Text fontSize={20}>
            TaskCover AI turns every task into optimization and excellence. With
            cutting-edge AI algorithms stressing accuracy and automation, a new
            standard in work organization with intelligence and creativity
            collaborates.
          </Text>
        </Stack>
        <Stack flex={1}>
          <Image
            src="/images/ai-robot.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="ai-robot"
          />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={4.375} mt={12} justifyContent="center">
        {PARTNER.map((partner, index) => (
          <Stack key={index}>
            <Image
              src={partner}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
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
  "/images/ai-partner-1.png",
  "/images/ai-partner-2.png",
  "/images/ai-partner-3.png",
  "/images/ai-partner-4.png",
  "/images/ai-partner-5.png",
];
