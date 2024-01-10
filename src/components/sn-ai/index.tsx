import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderAI } from "./components/Header";
import { AboutTaskCoverAI } from "./components/AboutUs";
import { PromoteAI } from "./components/Promote";

const AiPage = () => {
  return (
    <Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-header-ai.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <Container>
          <HeaderAI />
        </Container>
      </Stack>
      <Container>
        <AboutTaskCoverAI />
        <PromoteAI />
      </Container>
    </Stack>
  );
};

export default memo(AiPage);
