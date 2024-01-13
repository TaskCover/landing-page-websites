"use client";

import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderHelpCenter } from "./components/Header";
import { TipsHelpCenter } from "./components/Tips";
import { HelperQuestion } from "./components/Question";
import { HelperForm } from "./components/Form";
import { HelperSendMail } from "./components/SendMail";
import { ProductEvent } from "components/sn-products/components/ProductEvent";

const HelpCenter = () => {
  return (
    <Stack>
      <HeaderHelpCenter />
      <Container>
        <TipsHelpCenter />
      </Container>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-header-help-center.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "110%",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <HelperQuestion />
        <Container>
          <HelperForm />
        </Container>
      </Stack>
      <ProductEvent
        heading="Can't find what you're looking for?"
        textButton="STAR TO FREE TRIAL"
      />
      <Container>
        <HelperSendMail />
      </Container>
    </Stack>
  );
};

export default memo(HelpCenter);
