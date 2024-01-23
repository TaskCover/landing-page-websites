import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const Header = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      width="100%"
      direction={{ md: "row", xs: "column" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={3.75}
      sx={{
        width: "100%",
        m: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <Stack>
        {isMdSmaller ? (
          <TextGradient
            fontSize={{ md: 58, xs: 36 }}
            fontWeight={700}
            align="center"
            percentBlueColor={15.8}
            percentGreenColor={107.38}
          >
            Your Privacy
          </TextGradient>
        ) : (
          <Text fontSize={{ md: 58, xs: 36 }} fontWeight={700}>
            Your Privacy
          </Text>
        )}

        <TextGradient
          fontSize={{ md: 58, xs: 36 }}
          fontWeight={700}
          textAlign={{ md: "left", xs: "center" }}
          percentGreenColor={86.38}
        >
          Our Responsibility
        </TextGradient>
        <Text
          mt={3}
          textAlign={{ md: "left", xs: "center" }}
          fontSize={{ md: 20, xs: 16 }}
        >
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
