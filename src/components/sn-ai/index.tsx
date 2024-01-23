import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderAI } from "./components/Header";
import { AboutTaskCoverAI } from "./components/AboutUs";
import { PromoteAI } from "./components/Promote";
import { FeatureAI } from "./components/Feature";
import { ProductivityAI } from "./components/Productivity";

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
            left: 0,
            right: 0,
            zIndex: -1,
            backgroundPosition: "bottom",
          }}
        />
        <Container>
          <HeaderAI />
        </Container>
      </Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: {
              md: "url(/images/trust-center-bg.webp)",
              xs: "url(/images/bg-blog-mobile.webp)",
            },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <Container>
          <AboutTaskCoverAI />
        </Container>
      </Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-premote-ai.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "150%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <PromoteAI />
      </Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-feature-ai.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
            display: { md: "flex", xs: "none" },
          }}
        />
        <Container>
          <FeatureAI />
        </Container>
      </Stack>
      <Container>
        <ProductivityAI />
      </Container>
    </Stack>
  );
};

export default memo(AiPage);
