import { Grid, Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Image from "next/image";
import { FormDesktop } from "../FormDesktop";
import useBreakpoint from "hooks/useBreakpoint";
import { FormMobile } from "../FormMobile";

export const BuildingTrust = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      mt={12.5}
      mb={{ md: 0, xs: 10 }}
      sx={{
        width: "100%",
        m: "0 auto",
        maxWidth: "1200px",
      }}
    >
      <Stack textAlign="center">
        <TextGradient mb={3} variant={{ md: "h3", xs: "h5" }}>
          Building Trust
        </TextGradient>
        <Text
          variant="overline"
          textAlign={{ md: "left", xs: "center" }}
          textTransform="unset"
          lineHeight={1.5}
          sx={{ mb: 5 }}
        >
          These four core principles serve as the cornerstone of our work.
        </Text>
      </Stack>
      <Grid container spacing={5}>
        {DATA.map((data, index) => (
          <Grid item md={6} xs={12} key={index}>
            <Stack width="100%" position="relative">
              <Image
                src={data.imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  marginBottom: "16px",
                }}
                alt="building trust"
              />
              <Text
                variant={{ md: "h5", xs: "body1" }}
                fontWeight={700}
                textTransform="uppercase"
                mb={1.5}
              >
                {data.title}
              </Text>
              <Text variant="body2">{data.content}</Text>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack
        className="resources"
        direction={{ md: "row", xs: "column" }}
        justifyContent="space-between"
        spacing={4.375}
        mt={20}
      >
        <Image
          src={`/images/building-trust-app${
            isMdSmaller ? "-mobile" : ""
          }-1.png`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            marginBottom: "16px",
            flex: 1,
          }}
          alt="building-trust-app"
        />
        <Stack flex={1} justifyContent="space-between">
          <Image
            src={`/images/building-trust-app${
              isMdSmaller ? "-mobile" : ""
            }-2.png`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              marginBottom: isMdSmaller ? "35px" : 0,
            }}
            alt="building-trust-app"
          />
          <Image
            src={`/images/building-trust-app${
              isMdSmaller ? "-mobile" : ""
            }-3.png`}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="building-trust-app"
          />
        </Stack>
      </Stack>
      {isMdSmaller ? <FormMobile /> : <FormDesktop />}
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/building-trust-1.png",
    title: "SECURITY",
    content: "Fostering a safer online environment is our unwavering goal",
  },
  {
    imageUrl: "/images/building-trust-2.png",
    title: "PRIVACY",
    content:
      "We are committed to protecting your personal information and ensuring its confidentiality.",
  },
  {
    imageUrl: "/images/building-trust-3.png",
    title: "COMPLIANCE",
    content:
      "We operate within the framework of all applicable laws and regulations.",
  },
  {
    imageUrl: "/images/building-trust-4.png",
    title: "TRANSPARENCY",
    content:
      "We are always working to find a balance between protecting user privacy and complying with the law.",
  },
];
