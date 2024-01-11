import { Stack } from "@mui/material";
import { Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const PlanUseCase = () => {
    const {isMdSmaller} = useBreakpoint();
  return (
    <Stack mt={20} width={{md: "70%", xs: "100%"}} mx="auto">
      <Text fontSize={{ md: 30, xs: 16 }} fontWeight={700} textAlign="center">
        Having problems in planning, executing, andmonitoring campaigns?
      </Text>
      <Text textAlign="center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&lsquo;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>
      <Stack mt={5}>
        <Image
          src={`/images/plan-image${isMdSmaller ? "-mobile" : ""}.png`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="plan-image"
        />
      </Stack>
    </Stack>
  );
};
