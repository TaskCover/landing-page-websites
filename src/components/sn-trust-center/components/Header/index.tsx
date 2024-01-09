import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const Header = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={5}
    >
      <Stack>
        {isMdSmaller ? (
          <TextGradient variant={{ xl: "h1", xs: "h3" }} align="center">
            Your Privacy
          </TextGradient>
        ) : (
          <Text variant={{ xl: "h1", xs: "h3" }}>Your Privacy</Text>
        )}

        <TextGradient variant={{ xl: "h1", xs: "h3" }} textAlign={{md: "left", xs: "center"}}>
          Our Responsibility
        </TextGradient>
        <Text mt={3} textAlign={{ md: "justify", xs: "center" }}>
          The Help Center is your one-stop shop for all your questions and
          support needs. Here you can find answers to frequently asked
          questions, browse through our knowledge base, and connect with our
          community of users.
        </Text>
      </Stack>
      <Stack>
        <Image
          width={isMdSmaller ? 330 : 580}
          height={isMdSmaller ? 310 : 568}
          src="/images/trust-center-header.png"
          alt="trust-center-bg"
        />
      </Stack>
    </Stack>
  );
};
