import { Stack } from "@mui/material";
import { TextGradient, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const HeaderHelpCenter = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack px={7} position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/bg-header-help-center.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "2210/1503",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: { md: "-50px", xs: 0 },
          zIndex: -1,
        }}
      />
      <Stack
        sx={{
          backgroundImage: "url(/images/bg-hepler-center.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "1348/854",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: -1,
        }}
      />
      <TextGradient variant={{ md: "h1", xs: "h3" }} textAlign="center">
        Help Center
      </TextGradient>
      <Text textAlign="center">
        The Help Center is your one-stop shop for all your questions and support
        needs. Here you can find answers to
        <br /> frequently asked questions, browse through our knowledge base,
        and connect with our community of users.
      </Text>
      <Stack mt={11.25} width="100%" alignItems="center">
        <Image
          src="/images/robot-help-center.png"
          alt="robot-center"
          width={isMdSmaller ? 283 : 537}
          height={isMdSmaller ? 275 : 521}
        />
      </Stack>
    </Stack>
  );
};
