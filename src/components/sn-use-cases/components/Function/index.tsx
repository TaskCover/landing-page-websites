import { Grid, Stack } from "@mui/material";
import { TextGradient, Text, ButtonCustom } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const FunctionUseCase = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      sx={{
        background: "#EEF2FF",
        borderRadius: 5,
        py: { md: 5, xs: 1 },
        px: { md: 5, xs: 1 },
      }}
      mt={{ md: 10, xs: 4 }}
    >
      <TextGradient
        mb={5}
        fontWeight={500}
        fontSize={{ md: 40, xs: 24 }}
        textAlign="center"
        percentBlueColor={43.8}
        percentGreenColor={61.38}
      >
        Other functions
      </TextGradient>
      <Grid container spacing={{ md: 5.375, xs: 1 }}>
        {DATA.map((data, index) => (
          <Grid item md={3} xs={6} key={index}>
            <Stack
              sx={{
                boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                background: data.isGradient
                  ? "linear-gradient(90deg, #0575E6, #38E27B)"
                  : "#fff",
                borderRadius: 4,
                px: { md: 5, xs: 1 },
                py: { md: 5, xs: 1 },
                alignItems: "center",
              }}
            >
              <Image
                src={data.imageUrl}
                width={isMdSmaller ? 60 : 120}
                height={isMdSmaller ? 60 : 120}
                alt="function-company"
              />
              <Text
                fontSize={{ md: 20, xs: 16 }}
                my={3}
                sx={{ opacity: data.isGradient ? 0 : 1 }}
                fontWeight={500}
              >
                {data.title ? data.title : "opacity"}
              </Text>
              {data.isGradient ? (
                <ButtonCustom
                  sx={{
                    background: "#fff",
                    color: "#000",
                    fontWeight: 500,
                    "&:hover": { background: "#fff" },
                    px: 2,
                  }}
                >
                  Start free trial
                </ButtonCustom>
              ) : (
                <ButtonCustom
                  className="MuiButton-primary"
                  sx={{
                    px: 2,
                  }}
                >
                  Learn More
                </ButtonCustom>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/function-company.png",
    title: "Company",
  },
  {
    imageUrl: "/images/function-manager.png",
    title: "Manager",
  },
  {
    imageUrl: "/images/function-chat.png",
    title: "Chat",
  },
  {
    imageUrl: "/images/function-time.png",
    title: "Time tracking",
  },
  {
    imageUrl: "/images/function-budget.png",
    title: "Budget",
  },
  {
    imageUrl: "/images/function-sale.png",
    title: "Sale",
  },
  {
    imageUrl: "/images/function-billing.png",
    title: "Billing",
  },
  {
    imageUrl: "/images/function-target.png",
    title: "",
    isGradient: true,
  },
];
