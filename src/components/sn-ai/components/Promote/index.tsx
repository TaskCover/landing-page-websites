import { Stack } from "@mui/material";
import { TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";

export const PromoteAI = () => {
  const {isMdSmaller} = useBreakpoint();
  return (
    <Stack width="80%" mx="auto">
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        textAlign="center"
        mt={{md: 12, xs: 4}}
        percentGreenColor={85.38}
        percentBlueColor={18.8}
      >
        Promote your operation by AI-Agent
      </TextGradient>
      <Stack mt={5} width={{md: "57%", xs: "100%"}} mx="auto">
        <Image
          src="/images/promote-robot.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: isMdSmaller ? "110%" : "100%",
            height: "auto",
          }}
          alt="header-ai"
        />
      </Stack>
    </Stack>
  );
};
