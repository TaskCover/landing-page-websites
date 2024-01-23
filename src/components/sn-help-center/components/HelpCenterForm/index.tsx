import { Stack } from "@mui/material";
import { Text, Button } from "components/shared";
import FormFeedback from "components/sn-products/components/FormFeedback";

type ProductEventProps = {
  heading: string;
  textButton: string;
};

export const HelpCenterFeedback = (props: ProductEventProps) => {
  const { heading, textButton } = props;
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: 290,
      }}
    >
      <Stack
        sx={{
          backgroundImage: {
            md: "url(/images/bg-help-center-feedback.webp)",
            xs: "url(/images/bg-help-center-feedback-mobile.webp)",
          },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          minHeight: 290,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        pt={{ md: 11, xs: 6 }}
        pb={3}
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
        <FormFeedback />
      </Stack>
    </Stack>
  );
};
