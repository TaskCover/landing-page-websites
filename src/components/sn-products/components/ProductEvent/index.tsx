import { Stack } from "@mui/material";
import { Text, Button } from "components/shared";

type ProductEventProps = {
  heading: string;
  textButton: string;
};

export const ProductEvent = (props: ProductEventProps) => {
  const { heading, textButton } = props;
  return (
    <Stack
      mt={{ md: 11, xs: 6 }}
      sx={{
        width: "100%",
        minHeight: 290,
      }}
    >
      <Stack
        sx={{
          backgroundImage: {
            md: "url(/images/budget-event-bg.png)",
            xs: "url(/images/budget-event-mobile-bg.png)",
          },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          minHeight: 290,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          mb={5}
          color="#fff"
          fontSize={{ md: 36, xs: 24 }}
          textAlign="center"
          fontWeight={700}
        >
          {heading}
        </Text>
        <Button
          sx={{
            background: "#fff",
            color: "#000",
            "&:hover": { background: "#fff" },
          }}
        >
          {textButton}
        </Button>
      </Stack>
    </Stack>
  );
};
