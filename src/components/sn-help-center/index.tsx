"use client";

import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderHelpCenter } from "./components/Header";
import { TipsHelpCenter } from "./components/Tips";
import { HelperQuestion } from "./components/Question";
import { HelperForm } from "./components/Form";
import { HelperSendMail } from "./components/SendMail";
import { HelpCenterFeedback } from "./components/HelpCenterForm";
import useBreakpoint from "hooks/useBreakpoint";
import {HEADER_HEIGHT} from 'layouts/Header'

const HelpCenter = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack>
      <Stack position="relative" pt={HEADER_HEIGHT / 8 - 3}>
        <Stack
          sx={{
            backgroundImage: isMdSmaller
              ? "url(/images/bg-header-help-center-mobile.png)"
              : "url(/images/bg-header-help-center.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "70%",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: { md: "-50px", xs: 0 },
            zIndex: -1,
          }}
        />
        <HeaderHelpCenter />
        <Container>
          <TipsHelpCenter />
        </Container>

        <HelperQuestion />
        <Container>
          <HelperForm />
        </Container>

        <HelpCenterFeedback
          heading="Can't find what you're looking for?"
          textButton="Contact support"
        />
        <Container>
          <HelperSendMail />
        </Container>
      </Stack>
    </Stack>
  );
};

export default memo(HelpCenter);
