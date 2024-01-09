import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const TipsHelpCenter = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack alignItems="center" mt={6}
      sx={{
        width: "100%",
        m: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        fontWeight={500}
      >
        Usage tips to begin
        <Text
          component="span"
          fontSize="inherit"
          sx={{
            WebkitTextFillColor: "black",
            display: { md: "inline-block", xs: "block" },
          }}
        >
          with TaskCover
        </Text>
      </TextGradient>
      <Stack width="100%">
        <Image
          src={`/images/help-center-app${isMdSmaller ? "-mobile" : ""}-1.png`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            flex: 1,
          }}
          alt="help-center-app"
        />
        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={{ md: 2, xs: 0 }}
          width="100%"
        >
          <Image
            src={`/images/help-center-app${isMdSmaller ? "-mobile" : ""}-2.png`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              flex: 1,
            }}
            alt="help-center-app"
          />
          <Image
            src={`/images/help-center-app${isMdSmaller ? "-mobile" : ""}-3.png`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              flex: 1,
            }}
            alt="help-center-app"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
