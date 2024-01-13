import { Stack } from "@mui/material";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import Image from "next/image";

export const ProductivityAI = () => {
  return (
    <Stack mt={{md: 25, xs: 0}} width={{md: "70%", xs: "100%"}} mx="auto">
      <Text
        component="div"
        textAlign="center"
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
      >
        Empower your{" "}
        <TextGradient component="span" fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
          workflow and productivity
        </TextGradient>
      </Text>
      <Text textAlign="center">
        Experience the next advance of business solutions with our AI-driven
        approach — transforming challenges into opportunities at every click. AI
        agent optimization for your business success.
      </Text>
      <Image
        src="/images/bg-productivity.png"
        width={176}
        height={4}
        alt="bg-productivity"
        style={{
            margin: "30px auto"
        }}
      />
      <Stack direction="row" justifyContent="center" spacing={{md: 3, xs: 2}}>
      <ButtonCustom className="MuiButton-primary" sx={{px: {md: 5, xs: 2}}}>Explore Pricing</ButtonCustom>
      <ButtonCustom className="MuiButton-primaryOutlined" sx={{
        WebkitTextFillColor: "black",
        px: {md: 5, xs: 2}
      }}>Explore Pricing</ButtonCustom>
      </Stack>
    </Stack>
  );
};
