import { Stack } from "@mui/material";
import { Text, Button } from "components/shared";

type ProductEventProps = {
  heading: string
}

export const ProductEvent = (props: ProductEventProps) => {
  const {heading} = props;
  return (
    <Stack
      mt={11}
      sx={{
        width: "100%",
        minHeight: 290,
      }}
    >
      <Stack
        sx={{
          backgroundImage: "url(/images/budget-event-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
          STAR TO FREE TRIAL
        </Button>
      </Stack>
    </Stack>
  );
};
