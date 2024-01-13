import { Stack } from "@mui/material";
import { TextGradient } from "components/shared";
import Image from "next/image";

export const PromoteAI = () => {
  return (
    <Stack width="70%" mx="auto">
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        textAlign="center"
        mt={{md: 7, xs: 4}}
      >
        Promote your operation by AI-Agent
      </TextGradient>
      <Stack mt={5} width="100%">
        <Image
          src="/images/promote-robot.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="header-ai"
        />
      </Stack>
    </Stack>
  );
};
