"use client";

import { Stack } from "@mui/material";
import { memo } from "react";
import { HeaderHelpCenter } from "./components/Header";
import { TipsHelpCenter } from "./components/Tips";
import { HelperQuestion } from "./components/Question";
import { HelperForm } from "./components/Form";
import { HelperSendMail } from "./components/SendMail";

const HelpCenter = () => {
  return (
    <Stack>
      <HeaderHelpCenter />
      <TipsHelpCenter />
      <HelperQuestion />
      <HelperForm />
      <HelperSendMail />
    </Stack>
  );
};

export default memo(HelpCenter);
