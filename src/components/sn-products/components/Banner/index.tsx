import { Button, Stack } from "@mui/material";
import { Text } from "components/shared";

type BannerProps = {
  content: string;
}

export const Banner = (props: BannerProps) => {
  const { content } = props;
  return (
    <Stack
      sx={{
        backgroundImage: {
          md: "url(/images/bg-banner-product.png)",
          xs: "url(/images/bg-banner-product-mobile.png)",
        },
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        aspectRatio: { md: "1200/323", xs: "343/520" },
        mt: {md: 8, xs: 6},
        pl: {md: 5, xs: 0},
        pt: {md: 0, xs: 3},
        justifyContent: {md: "center", xs: "flex-start"},
      }}
    >
      <Stack width={{ md: "50%", xs: "100%" }}>
        <Text
          fontSize={{ md: 32, xs: 24 }}
          color="#fff"
          fontWeight={500}
          mb={2}
          textAlign={{ md: "left", xs: "center" }}
        >
          ptOimize Workflows with Precision and Ease
        </Text>
        <Text
          fontSize={{ md: 20, xs: 16 }}
          color="#fff"
          fontWeight={400}
          mb={2}
          textAlign={{ md: "left", xs: "center" }}
        >
          {content}
        </Text>
        <Button
          sx={{
            py: 1.5,
            px: 5,
            backgroundColor: "#fff",
            width: "fit-content",
            color: "#000",
            borderRadius: 6,
            textTransform: "none",
            fontWeight: 600,
            mx: {md: 0, xs: "auto"},
            "&:hover": {
              background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
              color: "#fff"
            },
          }}
        >
          get started!
        </Button>
      </Stack>
    </Stack>
  );
};
